"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ThumbsUp, Laptop, Newspaper } from "lucide-react";

export default function BenefitSection() {
  const benefits = [
    {
      icon: <ThumbsUp className="w-8 h-8 text-green-600" />,
      title: "Transparan & Akurat",
      text: "Semua kontribusi kamu tercatat otomatis dan dapat dipantau kapan pun.",
    },
    {
      icon: <Laptop className="w-8 h-8 text-green-600" />,
      title: "Mudah Digunakan",
      text: "Tampilan sederhana, cepat dipahami bahkan untuk pengguna baru.",
    },
    {
      icon: <Newspaper className="w-8 h-8 text-green-600" />,
      title: "Info Penghijauan Terupdate",
      text: "Kegiatan penanaman terbaru selalu diperbarui secara real-time.",
    },
  ];

  // Animasi umum
  const fadeVariant = {
    hiddenDown: { opacity: 0, y: 50 },
    hiddenUp: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  // Hook untuk memantau apakah section terlihat
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hiddenDown"); // Saat discroll keluar, sembunyikan lagi
    }
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white via-green-50 to-white py-24 overflow-hidden"
    >
      {/* Judul Section */}
      <motion.div
        variants={fadeVariant}
        initial="hiddenUp"
        animate={controls}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#065f46]">
          Kenapa Harus <span className="text-[#059669]">Reforestacia?</span>
        </h2>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
          Kami percaya penghijauan bisa dimulai dari langkah kecil.  
          Berikut keuntungan yang kamu dapatkan bersama kami.
        </p>
      </motion.div>

      {/* Konten Benefit */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 md:px-16">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeVariant}
            initial={index % 2 === 0 ? "hiddenDown" : "hiddenUp"}
            animate={controls}
            transition={{
              duration: 0.7,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="group bg-white border border-green-100 hover:border-green-400 shadow-md hover:shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
          >
            {/* Icon */}
            <div className="bg-green-100 group-hover:bg-green-200 transition-colors duration-300 rounded-full p-4 mb-4 shadow-sm">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>

            {/* Text */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Background Decorative Element */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="w-full h-full opacity-20 text-green-300"
          fill="none"
        >
          <path
            d="M0,200 C300,100 900,300 1200,200"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M0,260 C300,160 900,360 1200,260"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}
