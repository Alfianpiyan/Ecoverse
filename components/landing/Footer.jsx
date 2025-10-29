// components/Footer.jsx
"use client";
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#047857] text-white overflow-hidden">
      {/* background gradien halus */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#065f46] to-[#047857]/90"></div>

      {/* efek blur lembut */}
      <motion.div
        className="absolute -bottom-20 left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Kolom 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold tracking-tight">reforestacia</h2>
          <p className="text-gray-100 mt-3 leading-relaxed">
            Platform kolaboratif untuk mendukung reforestasi dan penanaman pohon
            di wilayah rawan banjir & lahan gundul.  
            Bersama kita tumbuhkan kehidupan.
          </p>
        </motion.div>

        {/* Kolom 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Aksi Cepat</h3>
          <ul className="space-y-3">
            {[
              "Donasi Sekarang",
              "Lihat Laporan Dana",
              "Lokasi Penanaman",
              "Daftar Jadi Relawan",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="inline-block text-gray-100 hover:text-green-200 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-200 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Kolom 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4">Terhubung</h3>
          <p className="text-gray-100 mb-4">reforestacia@gmail.com</p>
          <div className="flex space-x-5 text-2xl">
            {[
              { icon: <FaInstagram />, href: "#" },
              { icon: <FaFacebook />, href: "#" },
              { icon: <FaGithub />, href: "#" },
              { icon: <FaLinkedin />, href: "#" },
            ].map((soc, i) => (
              <motion.a
                key={i}
                href={soc.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-green-200 transition-all duration-300"
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Garis bawah */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 border-t border-green-500/40 py-6 text-center text-sm text-gray-100 tracking-wide"
      >
        © 2025 <span className="font-semibold">Reforestacia</span>. All rights reserved.
      </motion.div>
    </footer>
  );
}
