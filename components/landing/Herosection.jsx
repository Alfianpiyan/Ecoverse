"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; 

const MAP_IMAGE_URL = '/World.png'; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, 
      staggerChildren: 0.15, 
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        duration: 1.2, 
    }
  },
};

const pulseVariants = {
  initial: { opacity: 1, textShadow: "0 0 0px #10B981" }, 
  pulse: {
    opacity: [1, 0.7, 1], 
    textShadow: [
      "0 0 0px #10B981", 
      "0 0 10px #047857",
      "0 0 0px #10B981"
    ],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity, 
      repeatDelay: 1,
    },
  },
};

const backgroundMoveVariants = {
    move: {
        scale: 1.15,
        x: [0, 5, -5, 0],
        y: [0, 5, -5, 0],
        transition: {
            duration: 150,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
        }
    }
};

const overlayPulseVariants = {
    pulse: {
        opacity: [0.6, 0.55, 0.6], 
        transition: {
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
        }
    }
}


const particleMoveVariants = {
    move: i => ({
        x: [0, Math.sin(i) * 50, 0],
        y: [0, Math.cos(i) * 30, 0],

        scale: [1, 1.3, 1],
        opacity: [0.3, 0.8, 0.3],
        transition: {
            duration: 15 + (i * 2), 
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
        }
    })
}

const Particle = ({ x, y, size, index }) => (
    <motion.div
        className="absolute rounded-full bg-white/80" 
        style={{ 
            left: `${x}%`, 
            top: `${y}%`, 
            width: size, 
            height: size,
            boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.7)` 
        }}
        initial="move"
        animate="move"
        variants={particleMoveVariants}
        custom={index}
    />
);


const HeroSection = () => {
    const particles = [
        { x: 10, y: 15, size: 8, index: 1 },
        { x: 85, y: 70, size: 10, index: 2 },
        { x: 50, y: 40, size: 7, index: 3 },
        { x: 30, y: 80, size: 9, index: 4 },
        { x: 65, y: 25, size: 11, index: 5 },
        { x: 20, y: 60, size: 6, index: 6 },
        { x: 75, y: 45, size: 8, index: 7 },
    ];

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-white">
      
      <motion.div 
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${MAP_IMAGE_URL})`, 
          filter: 'blur(8px) brightness(1.4)',
          opacity: 0.35,
          transform: 'scale(1.15)',
        }}
        initial="move" 
        animate="move"
        variants={backgroundMoveVariants}
      />

      <motion.div 
        className="absolute inset-0 bg-emerald-50 mix-blend-multiply"
        variants={overlayPulseVariants}
        initial="pulse"
        animate="pulse"
      ></motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {particles.map((p, i) => (
            <Particle key={i} {...p} index={i} />
        ))}
      </div>

      <motion.div 
        className="relative z-30 px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800"
          variants={itemVariants}
        >
          Saatnya Ambil{' '}
          <motion.span 
            className="text-emerald-600"
            variants={pulseVariants} 
            initial="initial"
            animate="pulse"
          >
            Aksi Nyata
          </motion.span>{' '}
          untuk Melawan{' '}
          <motion.span 
            className="text-emerald-600"
            variants={pulseVariants} 
            initial="initial"
            animate="pulse"
          >
            Perubahan Iklim
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-lg text-gray-700 mb-10 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          **Ecoverse** menghubungkan Anda langsung dengan komunitas reboisasi di seluruh dunia. Bergabung, tanam pohon, dan jadilah bagian dari solusi besar untuk masa depan bumi.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants} 
        >
          
          <motion.div
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="block" 
          >
            <Link 
                href="/mulai" 
                className="border-2 border-emerald-600 hover:bg-emerald-700 text-emerald-600 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-500 shadow-md cursor-pointer block"
            >
              Mulai Penghijauan
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block"
          >
            <Link 
                href="/tentang"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-700 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-500 shadow-md cursor-pointer block"
            >
              Pelajari Misi Kami
            </Link>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;