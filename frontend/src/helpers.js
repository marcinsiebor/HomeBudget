// Function to format a percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent", // Display as percentage
    minimumFractionDigits: 0, // Minimum number of fraction digits
  });
};

// Function to format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency", // Display as currency
    currency: "USD", // Currency type (USD)
  });
};

// Function to format a date to a locale string
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString(); // Convert epoch time to a localized date string