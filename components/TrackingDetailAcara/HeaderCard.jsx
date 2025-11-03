"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeaderCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-green-100"
    >
      <div className="relative">
        <img src={data.image} alt={data.title} className="w-full h-64 object-cover" />
        <div className="absolute left-4 top-4 bg-white/60 backdrop-blur rounded-full px-3 py-1 text-sm text-green-800 font-semibold shadow">
          {data.penyelenggara}
        </div>
      </div>

      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-green-900">{data.title}</h1>
          <p className="text-sm text-gray-600 mt-2">
            📍 {data.lokasi} • 📅 {data.tanggal}
          </p>

          <span
            className={`inline-block mt-3 px-3 py-1 text-sm font-semibold rounded-full ${
              data.status === "selesai"
                ? "bg-green-100 text-green-800"
                : data.status === "ditanam"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {data.status.toUpperCase()}
          </span>
        </div>

        {/* ✅ Link dinamis pakai slug */}
        <Link
          href={`/donatur/profile-instansi/${encodeURIComponent(data.penyelenggara)}`}
          className="text-green-700 text-sm font-medium hover:underline"
        >
          Lihat Profil Instansi →
        </Link>
      </div>
    </motion.div>
  );
}
