"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AjakTanam() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-white">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 md:pr-12 text-center md:text-left"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
          Kami membantu anda untuk <br /> ikut serta dalam kegiatan penghijauan
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
          Cara paling sederhana bagi warga negara dan perusahaan untuk menanam
          pohon di seluruh dunia dan mengimbangi emisi CO2 mereka
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-green-600 text-green-600 px-8 py-2 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Tanam
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0"
      >
        <div className="w-[320px] h-[220px] md:w-[420px] md:h-[280px] overflow-hidden">
          <img
            src="https://images.forestdigest.com/upload/2020/20200706161932.jpg"
            alt="Kegiatan penghijauan"
            width={420}
            height={280}
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </motion.div>
    </section>
  );
}
