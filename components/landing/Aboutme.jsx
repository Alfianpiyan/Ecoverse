"use client";

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
      when: "beforeChildren", 
    },
  },
};

const imageVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      duration: 1.0,
    }
  },
};

const textVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      duration: 1.0,
    }
  },
};


export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="w-full overflow-x-hidden py-20 bg-gradient-to-b from-white to-green-50"
    >
      <motion.div 
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} 
      >
        <motion.div 
          className="relative w-full md:w-1/2 flex justify-center"
          variants={imageVariants}
        >
          <motion.div 
            className="relative w-[350px] h-[370px] rounded-3xl overflow-hidden shadow-xl"
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/AcaraHijau2.png"
              alt="Ecoverse - Alam Hijau"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full md:w-1/2 flex flex-col gap-6"
          variants={textVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#047857]">
            Tentang Ecoverse
          </h2>
          
          <p className="text-gray-700 leading-relaxed text-justify">
            <span className="font-semibold text-[#047857]">Ecoverse</span> adalah komunitas yang berfokus pada pelestarian
            lingkungan dan penghijauan kembali area yang terdegradasi.
            Kami percaya bahwa setiap pohon yang ditanam hari ini adalah
            investasi berharga untuk masa depan bumi.
          </p>
          
          <p className="text-gray-700 leading-relaxed text-justify">
            Melalui kegiatan penanaman pohon, edukasi lingkungan, dan kolaborasi
            dengan masyarakat lokal, kami berkomitmen menciptakan dunia yang
            lebih hijau, seimbang, dan berkelanjutan. Mari bergabung bersama kami
            untuk menjaga bumi tetap lestari.
          </p>

          <motion.div 
            className="mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="#acara-section"
              className="inline-block px-6 py-3 bg-[#047857] text-white font-semibold rounded-full hover:bg-[#036b4f] transition-all duration-300 shadow-md"
            >
              Lihat Kegiatan Kami
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}