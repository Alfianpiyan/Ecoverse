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
    <section class="relative h-screen flex items-center justify-center px-6 bg-gradient-to-b from-green-900 via-green-800 to-green-900 overflow-hidden">

  <div class="absolute inset-0 bg-gradient-radial from-green-400/30 via-transparent to-transparent blur-3xl"></div>


  <div class="absolute inset-0">
    <div class="absolute w-2 h-2 bg-green-300/40 rounded-full top-1/4 left-1/3 blur-sm animate-pulse"></div>
    <div class="absolute w-3 h-3 bg-green-200/40 rounded-full top-2/3 left-2/3 blur-md animate-ping"></div>
  </div>

  <div class="relative z-10 text-center max-w-3xl px-4">
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-100 drop-shadow-[0_0_25px_rgba(34,197,94,0.9)]">
      Selamatkan Bumi Bersama Ecoverse
    </h1>

    <p class="mt-4 text-lg md:text-xl text-green-200 drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]">
      Ayo tanam pohon, kurangi jejak karbon, dan bangun masa depan hijau untuk generasi berikutnya.
    </p>

    <button class="mt-8 px-10 py-3 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition">
      Mulai Menanam
    </button>
  </div>
</section>

  );
};

export default HeroSection;