const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Formats a numeric (or numeric string) amount as rupees, e.g. 18.99 -> "₹18.99".
export const formatPrice = (amount) => inr.format(Number(amount) || 0);
