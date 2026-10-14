export const formatCurrency = (amount, currency='NPR') => {
return new Intl.NumberFormat('en-US', {
    currency: currency,
}).format(amount);
};