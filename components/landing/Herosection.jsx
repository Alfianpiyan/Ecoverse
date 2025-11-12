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
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const characterVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8
    }
  },
};

const lineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 1.2
    }
  },
};

const highlightVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.5,
    textShadow: "0 0 0px rgba(16, 185, 129, 0)"
  },
  visible: { 
    opacity: 1,
    scale: 1,
    textShadow: [
      "0 0 0px rgba(16, 185, 129, 0)",
      "0 0 15px rgba(16, 185, 129, 0.8)",
      "0 0 25px rgba(16, 185, 129, 0.6)",
      "0 0 15px rgba(16, 185, 129, 0.3)",
      "0 0 5px rgba(16, 185, 129, 0.1)"
    ],
    transition: {
      opacity: { duration: 0.8 },
      scale: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        duration: 1.2
      },
      textShadow: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  },
  hover: {
    scale: 1.05,
    textShadow: "0 0 30px rgba(16, 185, 129, 0.9)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
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

const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const letters = Array.from(text);
  
  return (
    <motion.span
      className={className}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          custom={index}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

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
        
        {/* kepala */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800"
        >
          <div className="mb-4">
            <AnimatedText 
              text="Saatnya Ambil " 
              className="inline-block"
            />
            <motion.span
              variants={highlightVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="text-emerald-600 cursor-default inline-block mx-1"
            >
              Aksi Nyata
            </motion.span>
          </div>
          
          <div>
            <AnimatedText 
              text="untuk Melawan " 
              className="inline-block"
              delay={1}
            />
            <motion.span
              variants={highlightVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="text-emerald-600 cursor-default inline-block mx-1"
            >
              Perubahan Iklim
            </motion.span>
          </div>
        </motion.h1>
        
        {/* sub */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <p className="text-base md:text-lg text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            <strong>Ecoverse</strong> menghubungkan Anda langsung dengan komunitas reboisasi di seluruh dunia. Bergabung, tanam pohon, dan jadilah bagian dari solusi besar untuk masa depan bumi.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
            }} 
            whileTap={{ scale: 0.95 }}
            className="block"
          >
            <Link 
              href="/Daftar" 
              className="border-2 border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer block"
            >
              Mulai Penghijauan
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="block"
          >
            <Link 
              href="/tentang"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer block"
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