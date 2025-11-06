/**
 * Invoice Generator API Actor
 *
 * This Apify Actor generates professional invoices in multiple formats (PDF, HTML, JSON)
 * with automatic calculations, customizable templates, and multi-currency support.
 */

const Apify = require('apify');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

// Import utilities
const { calculateInvoiceAmounts } = require('./utils/calculations');
const { formatCurrency } = require('./utils/currency');
const { generateInvoiceNumber, formatDate, calculateDueDate, isValidDate } = require('./utils/invoiceNumber');
const { validateInput } = require('./utils/validation');

// Register Handlebars helpers
Handlebars.registerHelper('formatCurrency', function(amount, currency) {
    return formatCurrency(amount, currency);
});

Handlebars.registerHelper('join', function(array, separator) {
    return array ? array.join(separator) : '';
});

/**
 * Main Actor function
 */
Apify.main(async () => {
    // Get input from Apify platform
    const input = await Apify.getInput();

    console.log('Invoice Generator Actor started');
    console.log('Input:', JSON.stringify(input, null, 2));

    try {
        // Validate input
        validateInput(input);

        // Prepare invoice data
        const invoiceData = await prepareInvoiceData(input);

        console.log('Invoice data prepared:', invoiceData.invoiceNumber);

        // Generate outputs in requested formats
        const outputs = await generateOutputs(invoiceData, input.outputFormats || ['PDF', 'JSON']);

        console.log('Generated outputs:', outputs.map(o => o.format).join(', '));

        // Save to dataset
        await Apify.pushData({
            invoiceNumber: invoiceData.invoiceNumber,
            invoiceDate: invoiceData.invoiceDate,
            dueDate: invoiceData.dueDate,
            clientName: invoiceData.clientInfo.name,
            totalAmount: invoiceData.total,
            currency: invoiceData.currency,
            status: 'generated',
            outputs: outputs.map(o => ({ format: o.format, size: o.size })),
            timestamp: new Date().toISOString()
        });

        // Save files to key-value store
        for (const output of outputs) {
            await Apify.setValue(
                `invoice_${invoiceData.invoiceNumber}_${output.format.toLowerCase()}`,
                output.content,
                { contentType: output.contentType }
            );
        }

        console.log('Invoice generated successfully!');
        console.log(`Invoice Number: ${invoiceData.invoiceNumber}`);
        console.log(`Total Amount: ${formatCurrency(invoiceData.total, invoiceData.currency)}`);
        console.log(`Formats: ${outputs.map(o => o.format).join(', ')}`);

    } catch (error) {
        console.error('Error generating invoice:', error.message);
        throw error;
    }
});

/**
 * Prepare invoice data from input
 */
async function prepareInvoiceData(input) {
    const {
        companyInfo,
        clientInfo,
        invoiceDetails = {},
        items,
        paymentTerms,
        customFields
    } = input;

    // Generate or use provided invoice number
    const invoiceNumber = invoiceDetails.invoiceNumber || generateInvoiceNumber('INV');

    // Handle dates
    const invoiceDate = invoiceDetails.invoiceDate || new Date().toISOString().split('T')[0];
    let dueDate;

    if (invoiceDetails.dueDate) {
        dueDate = invoiceDetails.dueDate;
    } else if (invoiceDetails.dueDays) {
        dueDate = calculateDueDate(invoiceDate, invoiceDetails.dueDays).toISOString().split('T')[0];
    } else {
        dueDate = calculateDueDate(invoiceDate, 30).toISOString().split('T')[0];
    }

    // Validate dates
    if (!isValidDate(invoiceDate)) {
        throw new Error('Invalid invoice date format. Use YYYY-MM-DD');
    }
    if (!isValidDate(dueDate)) {
        throw new Error('Invalid due date format. Use YYYY-MM-DD');
    }

    // Add default units to items
    const itemsWithUnits = items.map(item => ({
        ...item,
        unit: item.unit || 'units'
    }));

    // Calculate amounts
    const calculations = calculateInvoiceAmounts(
        itemsWithUnits,
        invoiceDetails.taxRate || 0,
        invoiceDetails.discountRate || 0
    );

    // Prepare complete invoice data
    return {
        companyInfo,
        clientInfo,
        invoiceNumber,
        invoiceDate: formatDate(invoiceDate),
        dueDate: formatDate(dueDate),
        currency: invoiceDetails.currency || 'USD',
        purchaseOrder: invoiceDetails.purchaseOrder,
        notes: invoiceDetails.notes,
        paymentTerms,
        customFields,
        ...calculations,
        template: input.template || 'modern'
    };
}

/**
 * Generate outputs in requested formats
 */
async function generateOutputs(invoiceData, formats) {
    const outputs = [];

    for (const format of formats) {
        switch (format.toUpperCase()) {
            case 'PDF':
                outputs.push(await generatePDF(invoiceData));
                break;
            case 'HTML':
                outputs.push(await generateHTML(invoiceData));
                break;
            case 'JSON':
                outputs.push(generateJSON(invoiceData));
                break;
            default:
                console.warn(`Unknown format: ${format}`);
        }
    }

    return outputs;
}

/**
 * Generate HTML invoice
 */
async function generateHTML(invoiceData) {
    const templatePath = path.join(__dirname, 'templates', `${invoiceData.template}.hbs`);

    // Check if template exists, fallback to modern
    let templateFile;
    if (fs.existsSync(templatePath)) {
        templateFile = fs.readFileSync(templatePath, 'utf8');
    } else {
        console.warn(`Template ${invoiceData.template} not found, using modern template`);
        templateFile = fs.readFileSync(path.join(__dirname, 'templates', 'modern.hbs'), 'utf8');
    }

    const template = Handlebars.compile(templateFile);
    const html = template(invoiceData);

    return {
        format: 'HTML',
        content: Buffer.from(html),
        contentType: 'text/html',
        size: Buffer.byteLength(html)
    };
}

/**
 * Generate PDF invoice
 */
async function generatePDF(invoiceData) {
    // First generate HTML
    const htmlOutput = await generateHTML(invoiceData);
    const html = htmlOutput.content.toString();

    // Launch browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
            }
        });

        return {
            format: 'PDF',
            content: pdf,
            contentType: 'application/pdf',
            size: pdf.length
        };
    } finally {
        await browser.close();
    }
}

/**
 * Generate JSON invoice
 */
function generateJSON(invoiceData) {
    const json = JSON.stringify(invoiceData, null, 2);

    return {
        format: 'JSON',
        content: Buffer.from(json),
        contentType: 'application/json',
        size: Buffer.byteLength(json)
    };
}
