/**
 * Invoice numbering utilities
 */

const moment = require('moment');

/**
 * Generate invoice number
 * @param {string} prefix - Prefix for invoice number (default: 'INV')
 * @param {Date} date - Invoice date
 * @returns {string} Generated invoice number
 */
function generateInvoiceNumber(prefix = 'INV', date = new Date()) {
    const year = moment(date).format('YYYY');
    const month = moment(date).format('MM');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    return `${prefix}-${year}${month}-${random}`;
}

/**
 * Format date for invoice
 * @param {string|Date} date - Date to format
 * @param {string} format - Date format (default: 'MMMM DD, YYYY')
 * @returns {string} Formatted date
 */
function formatDate(date, format = 'MMMM DD, YYYY') {
    return moment(date).format(format);
}

/**
 * Calculate due date
 * @param {string|Date} invoiceDate - Invoice date
 * @param {number} dueDays - Days until due
 * @returns {Date} Due date
 */
function calculateDueDate(invoiceDate, dueDays = 30) {
    return moment(invoiceDate).add(dueDays, 'days').toDate();
}

/**
 * Validate invoice date
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid
 */
function isValidDate(dateString) {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

module.exports = {
    generateInvoiceNumber,
    formatDate,
    calculateDueDate,
    isValidDate
};
