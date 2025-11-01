"use client";

import React, { useState } from "react";
import { MapPin, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilInstansi() {
  const [selectedAcara, setSelectedAcara] = useState(null);

  const data = {
    namaInstansi: "Nama Instansi",
    tagline: "Tagline Instansi",
    totalAcara: 12,
    totalPohon: 850,
    totalDonatur: 850,
    tentang:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    acara: [
      { id: 1, nama: "Nama Acara 1", lokasi: "Bandung", tanggal: "15 Desember 2025", status: "Selesai" },
      { id: 2, nama: "Nama Acara 2", lokasi: "Jakarta", tanggal: "20 Januari 2026", status: "Selesai" },
      { id: 3, nama: "Nama Acara 3", lokasi: "Bogor", tanggal: "12 Februari 2026", status: "Selesai" },
    ],
    testimoni: [
      { id: 1, nama: "Jamilah", acara: "Nama Acara 1", isi: "Saya sangat senang ikut program ini. Sangat bermanfaat!" },
      { id: 2, nama: "Dimas", acara: "Nama Acara 2", isi: "Kegiatannya seru banget dan penuh makna." },
      { id: 3, nama: "Rani", acara: "Nama Acara 3", isi: "Rasanya bangga bisa ikut menanam pohon di acara ini!" },
      { id: 4, nama: "Fikri", acara: "Nama Acara 1", isi: "Sangat inspiratif dan membantu lingkungan kita!" },
      { id: 5, nama: "Alya", acara: "Nama Acara 2", isi: "Tempatnya nyaman, panitianya ramah banget!" },
    ],
  };

  return (
    <div className="bg-[#F4FBF6] min-h-screen flex flex-col items-center text-[#1B4332]">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-56 md:h-64 bg-gray-300 flex items-center justify-center text-[#1B4332] font-semibold text-lg"
      >
        foto banner
      </motion.div>

      {/* Card profil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative -mt-16 bg-white rounded-2xl shadow-md w-[90%] max-w-2xl p-6 flex items-center gap-6"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-3xl font-bold">◎</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{data.namaInstansi}</h2>
          <p className="text-sm text-gray-500 mb-3">{data.tagline}</p>
          <p className="text-sm font-medium">
            <span className="font-semibold">{data.totalAcara}</span> Acara |{" "}
            <span className="font-semibold">{data.totalPohon}+</span> Pohon |{" "}
            <span className="font-semibold">{data.totalDonatur}+</span> Instansi lain berdonasi{" "}
          </p>
        </div>
      </motion.div>

      {/* Tentang instansi */}
      <section className="w-[90%] max-w-4xl bg-white rounded-xl shadow-sm mt-12 p-6 border border-[#D8F3DC]">
        <h3 className="text-lg font-bold mb-3">Tentang Instansi Kami</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{data.tentang}</p>
      </section>

      {/* Acara */}
      <section className="w-full mt-12 pb-12">
        <h3 className="text-center text-xl font-bold mb-8">Acara yang Pernah Kami Adakan</h3>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {data.acara.map((a, idx) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white w-72 rounded-xl shadow-md p-4 border border-[#D8F3DC] hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedAcara(a)}
            >
              <div className="w-full h-28 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                foto
              </div>
              <h4 className="font-semibold mb-1">{a.nama}</h4>
              <p className="text-sm text-gray-700 flex items-center mb-1">
                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                {a.lokasi} - {a.tanggal}
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-semibold text-[#1B4332]">{a.status}</span>
              </p>
              <span className="text-sm text-[#1B4332] font-semibold mt-2 inline-block hover:underline">
                Lihat Detail &gt;
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal detail acara */}
      {selectedAcara && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedAcara(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold mb-2">{selectedAcara.nama}</h3>
            <p className="text-sm text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1 text-red-500" />
              {selectedAcara.lokasi}
            </p>
            <p className="text-sm text-gray-700 mb-1">Tanggal: {selectedAcara.tanggal}</p>
            <p className="text-sm mb-4">Status: {selectedAcara.status}</p>
            <p className="text-gray-600 text-sm">
              Ini contoh deskripsi detail acara yang bisa diisi dari database instansi.
            </p>
          </div>
        </div>
      )}

      {/* Testimoni */}
      <section className="w-full bg-green-100 py-12 mt-12 overflow-hidden">
        <h3 className="text-center text-[#1B4332] text-xl font-bold mb-10">
          Kata Mereka yang Pernah Berdonasi
        </h3>

        {/* Container scroll horizontal */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-8 px-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...data.testimoni, ...data.testimoni].map((t, idx) => (
              <div
                key={idx}
                className="bg-white w-72 flex-shrink-0 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                <h4 className="font-semibold text-[#1B4332]">{t.nama}</h4>
                <p className="text-sm text-[#40916C] mb-3">Di Acara: {t.acara}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{t.isi}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
