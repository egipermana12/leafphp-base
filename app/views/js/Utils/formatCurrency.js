const currency = (value) => {
    const numericValue = value.replace(/\D/g, ''); // Hanya angka
    const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(numericValue);
    return {numericValue, formattedValue}
}

export default currency
