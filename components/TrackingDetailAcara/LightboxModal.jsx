"use client";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function LightboxModal({ data, lightbox, setLightbox }) {
  const close = () => setLightbox({ open: false, index: 0 });
  const prev = () =>
    setLightbox({
      open: true,
      index:
        (lightbox.index - 1 + data.dokumentasi.length) % data.dokumentasi.length,
    });
  const next = () =>
    setLightbox({
      open: true,
      index: (lightbox.index + 1) % data.dokumentasi.length,
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-xl">
        <button
          onClick={close}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full"
        >
          <X />
        </button>
        <div className="flex justify-between items-center p-3 border-b">
          <button onClick={prev}>
            <ChevronLeft />
          </button>
          <p className="text-sm text-gray-600">
            {lightbox.index + 1}/{data.dokumentasi.length}
          </p>
          <button onClick={next}>
            <ChevronRight />
          </button>
        </div>
        <div className="bg-black flex justify-center items-center h-[75vh]">
          <img
            src={data.dokumentasi[lightbox.index]}
            alt="doc"
            className="max-h-[90%] max-w-[95%] object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}
