// components/HeroSection.jsx (FINAL FIXED)
import React from 'react';
import Link from 'next/link';

// Simpan gambar di: public/Group271.png (tanpa spasi biar aman)
const MAP_IMAGE_URL = '/World.png'; 

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-white">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `url(${MAP_IMAGE_URL})`,          filter: 'blur(8px) brightness(1.4)',
          opacity: 0.35,
          transform: 'scale(1.1)',
        }} 
      />

      {/* Overlay Hijau */}
      <div className="absolute inset-0 bg-emerald-50 opacity-60 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800">
          Tunjukkan <span className="text-emerald-600">Aksimu</span> dalam menanggulangi Masalah <span className="text-emerald-600">Reboisasi</span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
          Ecoverse adalah Platform untuk menghubungkan pengguna ke komunitas agar dapat ikut serta dalam mengatasi masalah reboisasi.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/mulai">
            <p className="border-2 border-emerald-600 hover:bg-emerald-700 text-emerald-600 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-500 shadow-md cursor-pointer">
              Mulai Sekarang
            </p>
          </Link>
          <Link href="/tentang">
            <p className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-700 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-500 shadow-md cursor-pointer">
              Tentang Kami
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
