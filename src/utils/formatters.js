/**
 * Format number for USD currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Currency formatter for USD amounts
 * Formats numbers with commas and two decimal places
 */
export const currencyFormatter = {
  format: (value) => {
    if (!value || isNaN(value)) return '';
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },
  clean: (value) => {
    // Remove all non-numeric characters except decimal point
    return value.replace(/[^0-9.]/g, '');
  }
};