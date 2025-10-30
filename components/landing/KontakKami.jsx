"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function HubungiKami() {
  const [status, setStatus] = useState("");
  const controls = useAnimation();
  const ref = useRef(null);

  // Animasi muncul saat komponen terlihat di layar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            });
          } else {
            controls.start({
              opacity: 0,
              y: 60,
              transition: { duration: 0.7, ease: "easeOut" },
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/xwprrzer", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 60 }}
      className="relative py-16 bg-white"
    >
      <div className="container mx-auto px-6">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          Hubungi Kami
        </h2>

        <div className="flex flex-col md:flex-row items-start justify-center gap-10">
          {/* Map + Info */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full md:w-[65%] relative rounded-2xl overflow-hidden shadow-md"
          >
            <iframe
              src="https://maps.google.com/maps?width=100%&height=600&hl=id&q=Depok%20Indonesia&ie=UTF8&t=&z=14&iwloc=B&output=embed"
              className="w-full h-[450px]"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

            <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-md w-[90%] md:w-[80%]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800">Alamat</h3>
                  <p className="text-gray-600 text-xs mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a
                    href="mailto:reforestacia@gmail.com"
                    className="text-[#047857] text-xs"
                  >
                    Reforestacia@gmail.com
                  </a>
                  <h3 className="font-semibold text-gray-800 mt-2">No.Telp</h3>
                  <p className="text-gray-600 text-xs">+62 123-4567-8910</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full md:w-[30%]"
          >
            <p className="mb-6 text-gray-700 text-sm">
              Umpan Balik Kalian ibaratkan pohon yang disiram dan terus
              berkembang
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                required
                className="w-full bg-white rounded-lg border border-[#047857] py-2 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-white rounded-lg border border-[#047857] py-2 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
              <textarea
                name="pesan"
                placeholder="Pesan"
                required
                className="w-full bg-white h-40 rounded-lg border border-[#047857] py-3 px-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#047857]"
              ></textarea>
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-[#047857] font-semibold py-2 rounded-full border border-[#047857] hover:bg-[#047857] hover:text-white transition"
              >
                {status === "loading"
                  ? "Mengirim..."
                  : status === "success"
                  ? "Terkirim ✅"
                  : status === "error"
                  ? "Gagal Mengirim ❌"
                  : "Kirim"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
