/**
 * Input validation utilities
 */

/**
 * Validate company information
 * @param {Object} companyInfo - Company information object
 * @throws {Error} If validation fails
 */
function validateCompanyInfo(companyInfo) {
    if (!companyInfo) {
        throw new Error('Company information is required');
    }
    if (!companyInfo.name) {
        throw new Error('Company name is required');
    }
}

/**
 * Validate client information
 * @param {Object} clientInfo - Client information object
 * @throws {Error} If validation fails
 */
function validateClientInfo(clientInfo) {
    if (!clientInfo) {
        throw new Error('Client information is required');
    }
    if (!clientInfo.name) {
        throw new Error('Client name is required');
    }
}

/**
 * Validate invoice items
 * @param {Array} items - Invoice items array
 * @throws {Error} If validation fails
 */
function validateItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error('At least one invoice item is required');
    }

    items.forEach((item, index) => {
        if (!item.description) {
            throw new Error(`Item ${index + 1}: Description is required`);
        }
        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
            throw new Error(`Item ${index + 1}: Quantity must be a positive number`);
        }
        if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
            throw new Error(`Item ${index + 1}: Unit price must be a non-negative number`);
        }
    });
}

/**
 * Validate output formats
 * @param {Array} formats - Output formats array
 * @throws {Error} If validation fails
 */
function validateOutputFormats(formats) {
    const validFormats = ['PDF', 'HTML', 'JSON'];

    if (!Array.isArray(formats) || formats.length === 0) {
        throw new Error('At least one output format is required');
    }

    formats.forEach(format => {
        if (!validFormats.includes(format)) {
            throw new Error(`Invalid output format: ${format}. Valid formats are: ${validFormats.join(', ')}`);
        }
    });
}

/**
 * Validate all input
 * @param {Object} input - Complete input object
 * @throws {Error} If validation fails
 */
function validateInput(input) {
    validateCompanyInfo(input.companyInfo);
    validateClientInfo(input.clientInfo);
    validateItems(input.items);
    if (input.outputFormats) {
        validateOutputFormats(input.outputFormats);
    }
}

module.exports = {
    validateCompanyInfo,
    validateClientInfo,
    validateItems,
    validateOutputFormats,
    validateInput
};
