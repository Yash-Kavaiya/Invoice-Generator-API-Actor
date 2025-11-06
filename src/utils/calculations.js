/**
 * Invoice calculation utilities
 */

/**
 * Calculate line item total
 * @param {number} quantity - Item quantity
 * @param {number} unitPrice - Price per unit
 * @returns {number} Line total
 */
function calculateLineTotal(quantity, unitPrice) {
    return Number((quantity * unitPrice).toFixed(2));
}

/**
 * Calculate invoice subtotal (sum of all line items)
 * @param {Array} items - Array of invoice items
 * @returns {number} Subtotal
 */
function calculateSubtotal(items) {
    return items.reduce((sum, item) => {
        const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);
        return sum + lineTotal;
    }, 0);
}

/**
 * Calculate discount amount
 * @param {number} subtotal - Invoice subtotal
 * @param {number} discountRate - Discount percentage
 * @returns {number} Discount amount
 */
function calculateDiscount(subtotal, discountRate = 0) {
    return Number((subtotal * (discountRate / 100)).toFixed(2));
}

/**
 * Calculate tax amount
 * @param {number} subtotal - Invoice subtotal
 * @param {number} discount - Discount amount
 * @param {number} taxRate - Tax percentage
 * @returns {number} Tax amount
 */
function calculateTax(subtotal, discount, taxRate = 0) {
    const taxableAmount = subtotal - discount;
    return Number((taxableAmount * (taxRate / 100)).toFixed(2));
}

/**
 * Calculate invoice total
 * @param {number} subtotal - Invoice subtotal
 * @param {number} discount - Discount amount
 * @param {number} tax - Tax amount
 * @returns {number} Total amount
 */
function calculateTotal(subtotal, discount, tax) {
    return Number((subtotal - discount + tax).toFixed(2));
}

/**
 * Calculate all invoice amounts
 * @param {Array} items - Invoice items
 * @param {number} taxRate - Tax rate percentage
 * @param {number} discountRate - Discount rate percentage
 * @returns {Object} Calculated amounts
 */
function calculateInvoiceAmounts(items, taxRate = 0, discountRate = 0) {
    // Calculate line totals for each item
    const itemsWithTotals = items.map(item => ({
        ...item,
        lineTotal: calculateLineTotal(item.quantity, item.unitPrice)
    }));

    // Calculate amounts
    const subtotal = calculateSubtotal(items);
    const discount = calculateDiscount(subtotal, discountRate);
    const tax = calculateTax(subtotal, discount, taxRate);
    const total = calculateTotal(subtotal, discount, tax);

    return {
        items: itemsWithTotals,
        subtotal,
        discount,
        discountRate,
        tax,
        taxRate,
        total
    };
}

module.exports = {
    calculateLineTotal,
    calculateSubtotal,
    calculateDiscount,
    calculateTax,
    calculateTotal,
    calculateInvoiceAmounts
};
