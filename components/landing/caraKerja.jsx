"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function CaraKerja() {
  const langkah = [
    {
      nama: "Pilih Tanaman",
      icon: "/LPilih.png",
      deskripsi: "Kamu memilih jenis tanaman yang ingin didonasikan sesuai preferensi.",
    },
    {
      nama: "Tunggu Disalurkan",
      icon: "/LSalurkan.png",
      deskripsi: "Bibit tanaman akan disalurkan oleh tim ke lokasi penghijauan.",
    },
    {
      nama: "Ditanam",
      icon: "/LTanam.png",
      deskripsi: "Tanaman ditanam langsung oleh relawan atau komunitas kami.",
    },
    {
      nama: "Dokumentasi",
      icon: "/LDokumentasi.png",
      deskripsi: "Kamu menerima laporan dokumentasi hasil penanaman.",
    },
  ];

  // --- fungsi reusable untuk animasi scroll
  const ScrollAnimate = ({ children, type = "fade-up", delay = 0 }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

    useEffect(() => {
      if (inView) controls.start("visible");
      else controls.start("hidden");
    }, [inView, controls]);

    const variants = {
      "fade-up": { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
      "fade-down": { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
      "slide-left": { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
      "slide-right": { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
      "zoom": { hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } },
      "rotate": { hidden: { opacity: 0, rotate: -10, scale: 0.9 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
    };

    return (
      <motion.div
        ref={ref}
        variants={variants[type]}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <ScrollAnimate type="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20">
            Bagaimana Website Kami Bekerja
          </h2>
        </ScrollAnimate>

        <div className="relative flex flex-col md:flex-row items-center justify-between md:gap-10">
          <div className="hidden md:block absolute top-[95px] left-0 w-full h-[3px] bg-gray-200 rounded-full"></div>

          {langkah.map((item, index) => (
            <ScrollAnimate
              key={index}
              type={index % 2 === 0 ? "slide-up" : "zoom"}
              delay={index * 0.15}
            >
              <div className="relative flex flex-col items-center text-center bg-white shadow-md rounded-2xl p-6 w-full md:w-[220px] hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mb-4 shadow-inner">
                  <Image
                    src={item.icon}
                    alt={item.nama}
                    width={45}
                    height={45}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.nama}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.deskripsi}
                </p>
                {index !== langkah.length - 1 && (
                  <div className="md:hidden w-[2px] h-10 bg-green-400 mt-6"></div>
                )}
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
