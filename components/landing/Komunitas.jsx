"use client";

import Image from "next/image";
import { motion } from "framer-motion"; 

export default function Komunitas() {
  const komunitas = [
    {
      nama: "Bumi Terra",
      pengikut: "2.000 Pengikut",
      logo: "/LKbumitera.png",
    },
    {
      nama: "Greenwelfare",
      pengikut: "2.000 Pengikut",
      logo: "/LKGreenwelfare.png",
    },
    {
      nama: "Lindungihutan",
      pengikut: "9.000 Pengikut",
      logo: "/LKlindungihutan.png",
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, 
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.6, 
            ease: "easeOut"
        } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15, 
      },
    },
  };


  return (
    <section
      className="relative overflow-x-hidden py-14 bg-gradient-to-b from-white to-[#F9FAFB] overflow-hidden"
    >
      <div className="absolute inset-0">
        <svg
          className="absolute w-full opacity-40 text-[#D1FAE5]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M0,224L60,218.7C120,213,240,203,360,208C480,213,600,235,720,229.3C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          Kami Bekerja Sama Dengan Komunitas Terkenal
        </motion.h2>

        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
        >
          {komunitas.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants} 
              className="group flex flex-col items-center"
              whileHover={{ scale: 1.08, y: -5 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#10B981]/20 to-[#34D399]/20 shadow-lg">
                <Image
                  src={item.logo}
                  alt={item.nama}
                  width={120}
                  height={120}
                  className="object-contain transition-transform duration-500 "
                />
              </div>

              <div className="mt-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#059669] transition-colors duration-300">
                  {item.nama}
                </h3>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  {item.pengikut}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}