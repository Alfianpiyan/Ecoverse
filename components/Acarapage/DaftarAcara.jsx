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
    <div className="min-h-screen flex flex-col items-center bg-[#ffffff] pb-24">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full bg-white py-6 flex justify-center"
      >
        <h1 className="text-3xl font-semibold text-[#1B4332]">Daftar Acara</h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-center text-gray-500 mb-10 px-4 max-w-2xl"
      >
        Gabung dalam gerakan hijau! Pilih acara yang kamu suka dan tanam pohon
        bersama.
      </motion.p>
      
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
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-[#D8F3DC] rounded-2xl p-4 shadow-md hover:shadow-lg transition"
          >
            <motion.div
              className="h-36 bg-[#B7E4C7] rounded-xl mb-3 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h2 className="font-semibold text-[#1B4332] text-lg mb-1">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600 leading-snug">
              📅 {event.date}
              <br />
              📍 {event.location}
            </p>
            <p className="text-sm text-gray-700 mt-2 mb-16">
              {event.description}
            </p>

            <div className="absolute bottom-4 right-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#155d40" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#1B4332] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
              >
                Lihat Detail
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
