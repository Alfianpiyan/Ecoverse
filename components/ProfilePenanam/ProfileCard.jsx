"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AcaraCard({ title, date, description, status }) {
  const statusColor = {
    "Menunggu Acara": "bg-amber-50 text-amber-700 border-amber-200", // Kuning/Cokelat
    "Sedang Berlangsung": "bg-green-50 text-green-700 border-green-200", // Hijau
    Selesai: "bg-gray-100 text-gray-500 border-gray-200", // Abu-abu
  }[status];

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 10px 15px rgba(16, 185, 129, 0.1)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl text-green-800 truncate">{title}</h3>
        <p className="text-sm text-gray-400 font-light mt-1 mb-2">{date}</p>
        <p className="text-base text-gray-600 line-clamp-2">{description}</p>
      </div>


      <div className="flex flex-col items-start md:items-end gap-3 shrink-0 mt-3 md:mt-0">
        <span
          className={`text-xs px-4 py-1.5 border rounded-full font-bold uppercase tracking-wider ${statusColor}`}
        >
          {status}
        </span>
        <button className="text-green-600 font-bold hover:text-green-800 transition-colors text-sm flex items-center gap-1">
          Lihat Detail
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}