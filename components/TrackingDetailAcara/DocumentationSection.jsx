"use client";
import { motion } from "framer-motion";

export default function DocumentationSection({ data, setLightbox }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-green-100 shadow"
    >
      <h3 className="text-lg font-semibold text-green-900 mb-4">
        Dokumentasi Acara
      </h3>
      {data.dokumentasi.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada dokumentasi.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.dokumentasi.map((src, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => setLightbox({ open: true, index: i })}
              className="rounded-xl overflow-hidden"
            >
              <img src={src} alt="" className="w-full h-40 object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
