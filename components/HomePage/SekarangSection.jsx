"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SekarangSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Latar gradasi lembut */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white" />

      {/* Blur dinamis hijau */}
      <motion.div
        className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] bg-[#047857]/20 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-15%] w-[500px] h-[500px] bg-[#047857]/10 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 md:px-12 gap-12">
        {/* Kiri - Teks */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left space-y-7"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Hijaukan Bumi,{" "}
            <span className="text-[#047857] bg-gradient-to-r from-[#047857] to-[#065f46] bg-clip-text text-transparent">
              Mulai Sekarang
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Langkah kecilmu hari ini bisa jadi awal bagi perubahan besar esok hari.
            Mari tumbuhkan kehidupan di setiap sudut bumi.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Link
              href="/tanam"
              className="inline-block bg-[#047857] text-white px-10 py-4 rounded-full font-semibold text-lg
              shadow-[0_10px_40px_rgba(4,120,87,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_50px_rgba(4,120,87,0.45)]"
            >
              Tanam Sekarang
            </Link>
          </motion.div>
        </motion.div>

        {/* Kanan - Ilustrasi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 relative flex justify-center"
        >
          {/* Efek lingkaran lembut */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#047857]/10 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Gambar utama */}
          <div className="relative w-[380px] h-[380px] md:w-[480px] md:h-[480px]">
            <Image
              src="/Tanaman1.png"
              alt="Ilustrasi penghijauan"
              fill
              className="object-contain drop-shadow-[0_10px_25px_rgba(4,120,87,0.3)] transition-transform duration-700 ease-out hover:scale-105"
              priority
            />
          </div>

          {/* Depth tambahan */}
          <div className="absolute -bottom-10 -right-8 w-28 h-28 bg-[#047857]/10 rounded-full blur-2xl" />
          <div className="absolute -top-8 -left-10 w-20 h-20 bg-[#047857]/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
