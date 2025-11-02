"use client";
import React from "react";
import AcaraCard from "./ProfileCard";
import { motion } from "framer-motion";

export default function ProfileAcaraList() {
  const acaraList = [
    {
      title: "Penanaman Hutan Kota Bogor",
      date: "10 November 2025 – 08:00 WIB s/d Selesai",
      description: "Kegiatan penanaman 100 pohon bersama komunitas Cintai Bumi",
      status: "Menunggu Acara",
    },
    {
      title: "Aksi Hijau di Puncak",
      date: "05 November 2025 – 09:00 WIB s/d 14:00 WIB",
      description: "Reboisasi lahan kritis di kawasan Puncak bersama relawan",
      status: "Sedang Berlangsung",
    },
    {
      title: "Bersihkan Pantai Anyer",
      date: "28 Oktober 2025 – 07:00 WIB s/d Selesai",
      description: "Penanaman pohon bakau sekaligus bersih-bersih pantai",
      status: "Selesai",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-green-100/50 border border-green-50"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-green-900 font-extrabold text-3xl tracking-tight">
          Aktivitas Anda
        </h2>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-green-300/50 transition-all text-sm whitespace-nowrap">
          + Buat Acara Baru
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {acaraList.map((item, index) => (
          <AcaraCard key={index} {...item} />
        ))}
      </div>
    </motion.div>
  );
}