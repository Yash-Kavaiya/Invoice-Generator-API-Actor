# Invoice Generator API Actor

Automate your invoicing process with this professional Invoice Generator API Actor. Generate customized invoices in PDF, HTML, and JSON formats with automatic calculations, multi-currency support, and beautiful templates.

## Features

### 🎨 Customizable Invoice Templates
- **Modern**: Clean, contemporary design with blue accents
- **Classic**: Traditional serif font with formal border styling
- **Minimal**: Ultra-clean, minimalist design
- **Professional**: Corporate gradient header with structured layout

### 💰 Automatic Calculations
- Line item totals
- Subtotals
- Discount calculations
- Tax calculations
- Grand total

### 🌍 Multi-Currency Support
Support for 9 major currencies:
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- INR (Indian Rupee)

### 📄 Multiple Output Formats
- **PDF**: Professional print-ready invoices
- **HTML**: Web-ready invoices with beautiful styling
- **JSON**: Structured data for system integration

### ⚙️ Additional Features
- Automatic invoice numbering
- Due date calculation
- Custom fields support
- Company logo integration
- Payment terms and banking information
- Purchase order tracking
- Tax ID/VAT number support

## Input Schema

### Required Fields

#### Company Information (`companyInfo`)
```json
{
  "name": "Your Company Name"
}
```

#### Client Information (`clientInfo`)
```json
{
  "name": "Client Company Name"
}
```

#### Invoice Items (`items`)
```json
[
  {
    "description": "Web Development Services",
    "quantity": 40,
    "unitPrice": 150,
    "unit": "hours"
  }
]
```

### Optional Fields

#### Invoice Details (`invoiceDetails`)
```json
{
  "invoiceNumber": "INV-2025-001",
  "invoiceDate": "2025-11-06",
  "dueDate": "2025-12-06",
  "dueDays": 30,
  "currency": "USD",
  "taxRate": 10,
  "discountRate": 5,
  "notes": "Payment due within 30 days. Thank you for your business!",
  "purchaseOrder": "PO-2025-456"
}
```

#### Payment Terms (`paymentTerms`)
```json
{
  "bankName": "Chase Bank",
  "accountNumber": "****1234",
  "routingNumber": "CHASUS33",
  "paymentMethods": ["Bank Transfer", "Credit Card", "PayPal"]
}
```

#### Custom Fields (`customFields`)
```json
[
  {
    "label": "Project Name",
    "value": "Website Redesign"
  },
  {
    "label": "Project Manager",
    "value": "John Doe"
  }
]
```

#### Output Settings
```json
{
  "outputFormats": ["PDF", "HTML", "JSON"],
  "template": "modern"
}
```

## Complete Example Input

```json
{
  "companyInfo": {
    "name": "Acme Corporation",
    "address": "123 Business St, Suite 100",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94105",
    "country": "USA",
    "email": "billing@acme.com",
    "phone": "+1 (555) 123-4567",
    "website": "www.acme.com",
    "taxId": "TAX-123456789"
  },
  "clientInfo": {
    "name": "Tech Startup Inc",
    "address": "456 Client Ave",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "email": "accounts@techstartup.com",
    "phone": "+1 (555) 987-6543"
  },
  "invoiceDetails": {
    "invoiceNumber": "INV-2025-001",
    "invoiceDate": "2025-11-06",
    "dueDays": 30,
    "currency": "USD",
    "taxRate": 10,
    "discountRate": 0,
    "notes": "Payment due within 30 days. Late payments may incur additional fees. Thank you for your business!",
    "purchaseOrder": "PO-2025-789"
  },
  "items": [
    {
      "description": "Website Design & Development",
      "quantity": 80,
      "unitPrice": 150,
      "unit": "hours"
    },
    {
      "description": "Responsive Mobile Optimization",
      "quantity": 20,
      "unitPrice": 125,
      "unit": "hours"
    },
    {
      "description": "SEO Optimization",
      "quantity": 10,
      "unitPrice": 100,
      "unit": "hours"
    },
    {
      "description": "Content Management System Setup",
      "quantity": 1,
      "unitPrice": 500,
      "unit": "service"
    }
  ],
  "paymentTerms": {
    "bankName": "Chase Bank",
    "accountNumber": "****1234",
    "routingNumber": "CHASUS33",
    "paymentMethods": ["Bank Transfer", "Credit Card", "PayPal"]
  },
  "customFields": [
    {
      "label": "Project Name",
      "value": "Complete Website Redesign"
    },
    {
      "label": "Project Manager",
      "value": "Sarah Johnson"
    }
  ],
  "outputFormats": ["PDF", "HTML", "JSON"],
  "template": "modern"
}
```

This example will generate an invoice for $15,000 in services plus 10% tax ($1,500) for a total of $16,500.

## Quick Start Examples

### 1. Simple Invoice
```json
{
  "companyInfo": {
    "name": "My Business"
  },
  "clientInfo": {
    "name": "John Doe"
  },
  "items": [
    {
      "description": "Consulting Services",
      "quantity": 10,
      "unitPrice": 100
    }
  ]
}
```

### 2. Invoice with Tax
```json
{
  "companyInfo": {
    "name": "My Business",
    "email": "hello@mybusiness.com"
  },
  "clientInfo": {
    "name": "ABC Company",
    "email": "accounts@abc.com"
  },
  "invoiceDetails": {
    "currency": "EUR",
    "taxRate": 20,
    "dueDays": 14
  },
  "items": [
    {
      "description": "Monthly Retainer",
      "quantity": 1,
      "unitPrice": 5000
    }
  ],
  "outputFormats": ["PDF"]
}
```

### 3. Multi-Item Invoice with Discount
```json
{
  "companyInfo": {
    "name": "Software Solutions Ltd"
  },
  "clientInfo": {
    "name": "Enterprise Client"
  },
  "invoiceDetails": {
    "currency": "GBP",
    "taxRate": 20,
    "discountRate": 10,
    "notes": "10% discount for early payment"
  },
  "items": [
    {
      "description": "Software License - Premium",
      "quantity": 5,
      "unitPrice": 299,
      "unit": "licenses"
    },
    {
      "description": "Implementation Services",
      "quantity": 20,
      "unitPrice": 150,
      "unit": "hours"
    },
    {
      "description": "Annual Support",
      "quantity": 1,
      "unitPrice": 1200,
      "unit": "year"
    }
  ],
  "template": "professional"
}
```

## Output

The Actor saves the generated invoices in the following locations:

### Dataset
Each run creates a dataset entry with:
- Invoice number
- Date and due date
- Client name
- Total amount
- Currency
- Generation timestamp
- Output formats generated

### Key-Value Store
Invoice files are saved with keys:
- `invoice_{number}_pdf` - PDF file
- `invoice_{number}_html` - HTML file
- `invoice_{number}_json` - JSON file

## Using the Actor

### On Apify Platform

1. Go to [Apify Store](https://apify.com/store)
2. Search for "Invoice Generator API Actor"
3. Click "Try for free"
4. Fill in the input fields
5. Click "Start"
6. Download your generated invoices from the results

### Via API

```bash
curl -X POST https://api.apify.com/v2/acts/YOUR_ACTOR_ID/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "companyInfo": {
      "name": "My Business"
    },
    "clientInfo": {
      "name": "My Client"
    },
    "items": [
      {
        "description": "Service",
        "quantity": 1,
        "unitPrice": 100
      }
    ]
  }'
```

### Using Apify SDK

```javascript
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: 'YOUR_API_TOKEN',
});

const run = await client.actor('YOUR_ACTOR_ID').call({
    companyInfo: {
        name: 'My Business',
        email: 'hello@mybusiness.com'
    },
    clientInfo: {
        name: 'My Client',
        email: 'client@email.com'
    },
    items: [
        {
            description: 'Consulting Services',
            quantity: 10,
            unitPrice: 100,
            unit: 'hours'
        }
    ],
    invoiceDetails: {
        currency: 'USD',
        taxRate: 10,
        dueDays: 30
    },
    outputFormats: ['PDF', 'JSON'],
    template: 'modern'
});

// Get invoice files
const { items } = await client.keyValueStore(run.defaultKeyValueStoreId).listKeys();
console.log('Generated files:', items);
```

## Template Styles

### Modern (Default)
- Clean, contemporary design
- Blue color scheme
- Best for: Tech companies, modern businesses

### Classic
- Traditional serif fonts
- Formal border styling
- Best for: Law firms, traditional businesses

### Minimal
- Ultra-clean, minimalist
- Maximum white space
- Best for: Creative agencies, freelancers

### Professional
- Corporate gradient header
- Structured grid layout
- Best for: Enterprises, formal billing

## Currency Formatting

The Actor automatically formats currencies based on locale standards:
- **USD**: $1,234.56
- **EUR**: €1,234.56
- **GBP**: £1,234.56
- **JPY**: ¥1,235 (no decimals)
- **And more...**

## Invoice Numbering

If you don't provide an invoice number, the Actor automatically generates one in the format:
- `INV-YYYYMM-XXXX`
- Example: `INV-202511-0042`

You can also provide your own invoice numbering scheme.

## Date Handling

- **Invoice Date**: Defaults to today if not specified
- **Due Date**: Calculated automatically based on `dueDays` (default: 30 days)
- **Date Format**: Input as YYYY-MM-DD, displayed as "Month DD, YYYY"

## Best Practices

1. **Always include complete company information** for professional invoices
2. **Use consistent invoice numbering** across your invoices
3. **Specify clear payment terms** and due dates
4. **Include tax rates** if applicable to your jurisdiction
5. **Add notes** with payment instructions and terms
6. **Choose the right template** for your brand

## Use Cases

### Small Businesses & Freelancers
- Generate invoices for clients on-demand
- Professional appearance without expensive software
- Multi-currency for international clients

### E-commerce Platforms
- Automated invoice generation for orders
- Batch processing via API
- Integration with existing systems

### SaaS Applications
- Embed invoice generation in your app
- White-label invoicing feature
- Subscription billing invoices

### Accounting Software Developers
- Add invoicing to your product
- RESTful API integration
- Customizable templates

## Troubleshooting

### Invoice not generating?
- Check that all required fields are present
- Verify item quantities and prices are numbers
- Ensure dates are in YYYY-MM-DD format

### Currency not formatting correctly?
- Use valid ISO 4217 currency codes
- Supported currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR

### Template not found?
- Valid templates: modern, classic, minimal, professional
- Actor falls back to "modern" if invalid template specified

## Technical Details

- **Built with**: Node.js, Apify SDK, Puppeteer, Handlebars
- **PDF Generation**: Headless Chrome via Puppeteer
- **Template Engine**: Handlebars
- **Calculation Precision**: 2 decimal places
- **Maximum Items**: No limit (tested up to 100 items)

## Support & Feedback

For issues, feature requests, or questions:
- GitHub Issues: [Report an issue](https://github.com/Yash-Kavaiya/Invoice-Generator-API-Actor/issues)
- Apify Support: Contact through Apify platform

## License

Apache-2.0

## Version

1.0.0

---

**Ready to automate your invoicing?** Start using this Actor today and save hours of manual invoice creation!
