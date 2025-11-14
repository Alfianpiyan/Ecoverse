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
      deskripsi:
        "Pilih jenis tanaman yang ingin kamu donasikan sesuai preferensi dan lokasi penanaman.",
    },
    {
      nama: "Tunggu Disalurkan",
      icon: "/LSalurkan.png",
      deskripsi:
        "Tim kami akan menyalurkan bibit ke area penghijauan sesuai jadwal kegiatan.",
    },
    {
      nama: "Ditanam",
      icon: "/LTanam.png",
      deskripsi:
        "Bibit ditanam oleh relawan atau komunitas mitra kami dengan perawatan berkelanjutan.",
    },
    {
      nama: "Dokumentasi",
      icon: "/LDokumentasi.png",
      deskripsi:
        "Kamu akan menerima laporan foto & data lokasi penanaman untuk transparansi.",
    },
  ];

  const ScrollAnimate = ({ children, delay = 0 }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

    useEffect(() => {
      if (inView) controls.start("visible");
      else controls.start("hidden");
    }, [inView, controls]);

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="relative py-28 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">

      <div className="absolute top-0 left-0 w-[380px] h-[380px] bg-green-200/30 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-emerald-300/20 blur-[140px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <ScrollAnimate>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-14">
            Bagaimana Website Kami Bekerja
          </h2>
        </ScrollAnimate>

        <div className="relative flex flex-col md:flex-row md:justify-center md:items-center md:space-x-16 space-y-14 md:space-y-0">
          {langkah.map((item, index) => (
            <ScrollAnimate key={index} delay={index * 0.2}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  boxShadow:
                    "0 8px 25px rgba(72,187,120,0.25), 0 0 10px rgba(34,197,94,0.1)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className={`relative bg-white/70 backdrop-blur-xl border border-green-100 rounded-3xl shadow-md
                  p-7 w-full md:w-[230px] flex flex-col items-center text-center transition-all duration-300
                  ${index % 2 === 0 ? "md:translate-y-8" : "md:-translate-y-8"}`}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className="w-18 h-18 flex items-center justify-center bg-gradient-to-tr from-green-200 to-green-400 rounded-full mb-5 shadow-inner"
                >
                  <Image
                    src={item.icon}
                    alt={item.nama}
                    width={45}
                    height={45}
                    className="object-contain"
                  />
                </motion.div>

                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  {item.nama}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.deskripsi}
                </p>

                {index !== langkah.length - 1 && (
                  <>
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-[34px] w-[14px] h-[14px] bg-emerald-600 rounded-full shadow-md z-10"></div>

                    <div className="md:hidden flex flex-col items-center mt-6">
                      <div className="w-[12px] h-[12px] bg-emerald-600 rounded-full mt-2"></div>
                    </div>
                  </>
                )}
              </motion.div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
