'use client'

import { motion } from 'framer-motion'

export default function DukungOleh() {
  const partners = [
    { id: 1, name: 'Kurikulum Merdeka', logo: '/Dkurikulummerdeka.jpg' },
    { id: 2, name: 'Kementerian BUMN', logo: '/Dbumn.jpg' },
    { id: 3, name: 'Kementerian Kesehatan', logo: '/Dkesehatan.jpg' },
    { id: 4, name: 'Kementerian Pendidikan', logo: '/Dpendidikan.jpg' },
    { id: 5, name: 'BPJS Kesehatan', logo: '/Dbpjs.jpg' },
    { id: 6, name: 'WHO', logo: '/Dwho.jpg' },
  ]

  // Duplikasi partner 3 kali untuk memastikan animasi marquee yang mulus
  const marqueePartners = [...partners, ...partners, ...partners]

  // Durasi animasi yang lebih lambat agar lebih elegan
  const animationDuration = partners.length * 4.5; // 6 partners * 4.5 detik = 27 detik

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden"> {/* Ubah background ke putih dan padding lebih besar */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm tracking-widest uppercase font-semibold text-green-600 mb-2">
          Mitra Kami
        </h2>
        <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
          Didukung Oleh
        </p>
      </div>

      <div className="relative w-full">
        
        {/* Gradient overlay kiri & kanan untuk transisi halus */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{ x: ['0%', `-${100 / 3}%`] }} // Target -100% / jumlah duplikasi
            transition={{
              repeat: Infinity,
              duration: animationDuration,
              ease: 'linear',
            }}
          >
            {marqueePartners.map((partner, idx) => (
              <div
                key={idx}
                // Menentukan lebar setiap item agar total lebar 300%
                className="flex flex-none justify-center items-center w-[33.3333%] md:w-[16.6666%] lg:w-[11.1111%] min-w-[150px] p-4 group"
              >
                {/* Logo Item: Lebih minimalis, fokus pada logo, tanpa latar belakang putih tebal */}
                <div className="flex items-center justify-center p-2 opacity-50 transition-opacity duration-500 hover:opacity-100 hover:scale-[1.05]">
                  <img
                    // Gunakan grayscale agar lebih elegan, kemudian munculkan warna saat hover
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale group-hover:filter-none transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Tambahkan garis pemisah di bawah animasi agar lebih rapi */}
        <div className="absolute bottom-0 left-0 w-full h-px" />
      </div>
    </section>
  )
}