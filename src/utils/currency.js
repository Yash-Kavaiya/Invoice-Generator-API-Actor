/**
 * Currency formatting utilities
 */

// Currency symbols and formatting
const CURRENCY_CONFIG = {
    USD: { symbol: '$', position: 'before', decimals: 2, name: 'US Dollar' },
    EUR: { symbol: '€', position: 'before', decimals: 2, name: 'Euro' },
    GBP: { symbol: '£', position: 'before', decimals: 2, name: 'British Pound' },
    JPY: { symbol: '¥', position: 'before', decimals: 0, name: 'Japanese Yen' },
    CAD: { symbol: 'CA$', position: 'before', decimals: 2, name: 'Canadian Dollar' },
    AUD: { symbol: 'A$', position: 'before', decimals: 2, name: 'Australian Dollar' },
    CHF: { symbol: 'CHF', position: 'before', decimals: 2, name: 'Swiss Franc' },
    CNY: { symbol: '¥', position: 'before', decimals: 2, name: 'Chinese Yuan' },
    INR: { symbol: '₹', position: 'before', decimals: 2, name: 'Indian Rupee' }
};

/**
 * Format amount as currency
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - Currency code (ISO 4217)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currencyCode = 'USD') {
    const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;
    const formattedAmount = amount.toFixed(config.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (config.position === 'before') {
        return `${config.symbol}${formattedAmount}`;
    } else {
        return `${formattedAmount} ${config.symbol}`;
    }
}

/**
 * Get currency symbol
 * @param {string} currencyCode - Currency code
 * @returns {string} Currency symbol
 */
function getCurrencySymbol(currencyCode = 'USD') {
    const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;
    return config.symbol;
}

/**
 * Get currency name
 * @param {string} currencyCode - Currency code
 * @returns {string} Currency name
 */
function getCurrencyName(currencyCode = 'USD') {
    const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;
    return config.name;
}

module.exports = {
    formatCurrency,
    getCurrencySymbol,
    getCurrencyName,
    CURRENCY_CONFIG
};
