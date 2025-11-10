"use client";
import React from "react";
import { motion } from "framer-motion";

const dummyEvents = [
  {
    id: 1,
    title: "Penanaman Pohon Mangrove",
    date: "19 November 2025",
    location: "Taman Nasional Ujung Kulon",
    description:
      "Penanaman bibit pohon mangrove untuk membantu menjaga ekosistem pesisir pantai.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-exAuNs0YveRped3S1TnPHOmyU0RfyfAHQ&s",
  },
  {
    id: 2,
    title: "Reforestasi Gunung Salak",
    date: "20 November 2025",
    location: "Bogor, Jawa Barat",
    description:
      "Kegiatan penghijauan di area lereng Gunung Salak untuk mencegah longsor dan menjaga sumber air.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCNt4U9F_a54iqoptwoUN5Qau0lCffb3ecw&s",
  },
  {
    id: 3,
    title: "Penanaman Pohon Mahoni",
    date: "22 November 2025",
    location: "Cibubur, Jakarta Timur",
    description:
      "Menanam 1000 pohon mahoni sebagai langkah penghijauan di wilayah perkotaan.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLSDmLdTENDbIWegDPQfoEh_3lXJqa6jGXg&s",
  },
  {
    id: 4,
    title: "Gerakan Hijau Kampus",
    date: "25 November 2025",
    location: "Universitas Taruna Bhakti",
    description:
      "Aksi bersama mahasiswa untuk menanam pohon di sekitar lingkungan kampus.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefegUzUxsx6kqg22Ha5y9O14YVozmuWzIXg&s",
  },
  {
    id: 5,
    title: "Aksi Tanam Serentak",
    date: "28 November 2025",
    location: "Depok, Jawa Barat",
    description:
      "Penanaman 500 bibit pohon buah serentak di area taman kota Depok.",
    image:
      "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/03/04/Asal-usul-nama-dan-arti-Depok-3402897908.jpeg",
  },
  {
    id: 6,
    title: "Reforestasi Kota Bandung",
    date: "30 November 2025",
    location: "Bandung, Jawa Barat",
    description:
      "Menghijaukan kembali kawasan terbuka hijau di sekitar Kota Bandung.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUf4aaZtDLOdov0KnfNgszaXimCGJDESOHIA&s",
  },
];

export default function DaftarAcara() {
  return (
    <div className=" mt-8 min-h-screen flex flex-col items-center bg-gradient-to-br from-[#f0fff4] to-[#e6fffa] pb-24">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center mt-6"
      >
        <div className="bg-[#1B8F5A] w-[90%] md:w-[75%] py-6 rounded-full shadow-lg flex justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Daftar Acara
          </h1>
        </div>
      </motion.div>

      {/* tulisan bawah */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center text-gray-600 mt-4 mb-10 px-6 max-w-2xl"
      >
        Gabung dalam gerakan hijau! Pilih acara yang kamu suka dan tanam pohon bersama.
      </motion.p>

      
      {/* event */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16 w-full max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {dummyEvents.map((event) => (
          <motion.div
            key={event.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(27, 67, 50, 0.15)",
              y: -8,
            }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all border border-[#D8F3DC] overflow-hidden group"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f8fffa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <motion.div
              className="h-44 bg-gradient-to-br from-[#B7E4C7] to-[#95D5B2] rounded-xl mb-4 overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* badge tanggal */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#1B4332] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                {event.date}
              </div>
            </motion.div>

            {/* isi event */}
            <div className="relative z-10">
              <h2 className="font-bold text-[#1B4332] text-xl mb-3 group-hover:text-[#155d40] transition-colors">
                {event.title}
              </h2>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="mr-2">📍</span>
                <span className="font-medium">{event.location}</span>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-16 line-clamp-3">
                {event.description}
              </p>
            </div>

            <div className="absolute bottom-5 right-5">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#155d40",
                  boxShadow: "0 8px 20px rgba(21, 93, 64, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#1B4332] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Lihat Detail
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
      </motion.div>
    </div>
  );
}