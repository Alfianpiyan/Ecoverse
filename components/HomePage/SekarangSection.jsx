"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SekarangSection() {
  return (
    <section className="relative min-h-screen -mt-25 mb-16 flex items-center justify-center bg-white overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 md:px-12 gap-12">
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
              href="/donatur/daftar-acara"
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

          <div className="relative w-[450px] h-[450px] md:w-[550px] md:h-[550px]">
            <Image
              src="/Tanaman1.png"
              alt="Ilustrasi penghijauan"
              fill
              className="object-contain drop-shadow-[0_10px_25px_rgba(4,120,87,0.3)] transition-transform duration-700 ease-out hover:scale-105"
              priority
            />
          </div>

          <div className="absolute -bottom-10 -right-8 w-28 h-28 bg-[#047857]/10 rounded-full blur-2xl" />
          <div className="absolute -top-8 -left-10 w-20 h-20 bg-[#047857]/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
