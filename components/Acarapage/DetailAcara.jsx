"use client";

import { MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DetailAcara() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_10px_40px_rgba(4,120,87,0.15)] border border-green-100 p-6 md:p-10">

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 relative rounded-2xl overflow-hidden shadow-lg border border-green-100 h-[280px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.509406517316!2d106.82656587484314!3d-6.19838246071686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e79c26a3a3%3A0xe469df7c8dc2a2ab!2sDepok!5e0!3m2!1sid!2sid!4v1696500000000!5m2!1sid!2sid"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* Label lokasi */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-green-100 shadow-md flex items-start gap-2">
            <MapPin className="w-5 h-5 text-[#047857] mt-[2px]" />
            <div>
              <p className="font-semibold text-sm text-gray-900">Lokasi</p>
              <p className="text-xs text-gray-600">Kostrad, Depok, Jawa Barat</p>
            </div>
          </div>
        </motion.div>

        {/* TRACKING */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 bg-white rounded-2xl border border-green-100 shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Tracking Kegiatan
          </h2>

          {/* Progress Line */}
          <div className="relative flex items-center justify-between px-3 mb-8">
            {/* Garis progres */}
            <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 rounded-full -translate-y-1/2 z-0"></div>
            <motion.div
              className="absolute top-1/2 left-0 h-[4px] bg-gradient-to-r from-[#047857] to-green-400 rounded-full -translate-y-1/2 z-0"
              initial={{ width: "0%" }}
              whileInView={{ width: "65%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            ></motion.div>

            {/* Titik progres */}
            <div className="relative z-10 flex justify-between w-full">
              {/* Pembukaan */}
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 text-[#047857]" />
                <p className="text-xs font-semibold mt-1">Pembukaan</p>
                <p className="text-[10px] text-gray-500">07.00–07.25</p>
              </div>

              {/* Isi Acara */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-6 h-6 rounded-full border-[3px] border-[#047857] bg-green-100"
                ></motion.div>
                <p className="text-xs font-semibold mt-1 text-[#047857]">
                  Isi Acara
                </p>
                <p className="text-[10px] text-gray-500">07.25–09.45</p>
              </div>

              {/* Penutupan */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border-[3px] border-gray-300 bg-white"></div>
                <p className="text-xs font-semibold mt-1">Penutupan</p>
                <p className="text-[10px] text-gray-500">09.45–10.00</p>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 text-sm leading-relaxed">
            Acara penghijauan ini diselenggarakan pada{" "}
            <span className="font-semibold text-[#047857]">
              Minggu, 6 Oktober 2025
            </span>{" "}
            di lahan Kostrad, Cilodong. Kegiatan berlangsung pukul{" "}
            <span className="font-medium text-[#047857]">07.00–10.00 WIB</span>{" "}
            oleh <span className="font-semibold">Komunitas Hijau Bersatu</span>,
            dengan tujuan meningkatkan kesadaran masyarakat tentang pentingnya
            menanam pohon serta menjaga kelestarian lingkungan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
