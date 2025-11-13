"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/Supabaseclient";

export default function AcaraHijau() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("acara_penanaman")
          .select("id, judul_acara, status, waktu");

        if (error) throw error;

        const formatted = data.map((e) => ({
          id: e.id,
          title: e.judul_acara,
          status: e.status,
          time: e.waktu,
          active: e.status?.toLowerCase() === "sedang berlangsung",
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Gagal ambil data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    // 🌿 Section utama dengan animasi dua arah (scroll ke bawah & ke atas)
    <motion.section
      id="acara-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }} // 🔥 aktif setiap kali muncul di layar
      className="relative py-32 md:py-40 overflow-hidden bg-white"
    >
      {/* Background peta */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false }}
        className="absolute inset-0 flex justify-center items-start pt-10"
      >
        <Image
          src="/DotWorld.png"
          alt="World Map"
          width={1000}
          height={800}
          className="object-contain pointer-events-none select-none"
        />
      </motion.div>

      {/* Gambar orang nanem */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: false }}
        className="absolute -bottom-8 left-0 w-[900px] max-w-[80%]"
      >
        <Image
          src="/orangNanem.png"
          alt="Ilustrasi Menanam"
          width={900}
          height={500}
          className="object-contain pointer-events-none select-none"
        />
      </motion.div>

      {/* Konten utama */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-12"
        >
          Acara Hijau
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500">Memuat acara...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada acara.</p>
        ) : (
          <>
            {/* Grid acara muncul setiap kali di-scroll */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="flex flex-col items-end gap-6 pr-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      href={`/user/acara/${event.id}`}
                      className={`w-64 md:w-72 rounded-2xl px-5 py-4 shadow-md flex justify-between items-center transition-transform hover:shadow-lg ${
                        event.active
                          ? "bg-[#059669] text-white"
                          : "bg-[#B7E4C7] text-[#064E3B]"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm leading-tight">
                          {event.title}
                        </p>
                        <p className="text-xs opacity-90">{event.status}</p>
                      </div>
                      <div className="bg-white text-[#059669] px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap">
                        {event.time || "-"}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tombol selengkapnya */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false }}
              className="flex justify-end mt-10 pr-4"
            >
              <Link
                href="/user/acara"
                className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
              >
                Selengkapnya
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
}
