export const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'NPR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}