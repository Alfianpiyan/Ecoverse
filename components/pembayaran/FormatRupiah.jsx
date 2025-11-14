
export const formatRupiah = (number) => {
    if (typeof number !== 'number') {
        number = parseInt(number);
    }
    
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, 
    }).format(number);
};