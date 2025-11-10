// src/utils/formatRupiah.js

export const formatRupiah = (number) => {
    // Memastikan input adalah angka
    if (typeof number !== 'number') {
        number = parseInt(number);
    }
    
    // Menggunakan Intl.NumberFormat untuk format Rupiah Indonesia
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Tidak ada desimal
    }).format(number);
};