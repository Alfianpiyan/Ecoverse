"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Award, Globe2 } from "lucide-react";

export default function KenapaLangganan() {
  const alasan = [
    {
      icon: <Leaf className="text-[#059669]" size={28} />,
      judul: "Dukung Gerakan Hijau",
      deskripsi:
        "Setiap langganan membantu kegiatan penghijauan dan pelestarian lingkungan di berbagai daerah.",
    },
    {
      icon: <Users className="text-[#059669]" size={28} />,
      judul: "Gabung Komunitas Peduli Alam",
      deskripsi:
        "Bergabung dengan ribuan relawan yang punya semangat sama: menjaga bumi tetap hijau.",
    },
    {
      icon: <Award className="text-[#059669]" size={28} />,
      judul: "Dapat Sertifikat & Penghargaan",
      deskripsi:
        "Nikmati pengakuan resmi sebagai pendukung gerakan hijau — cocok untuk portofolio dan kegiatan sosial.",
    },
    {
      icon: <Globe2 className="text-[#059669]" size={28} />,
      judul: "Kontribusi Nyata untuk Dunia",
      deskripsi:
        "Langgananmu membantu mengurangi emisi karbon, menanam pohon baru, dan menjaga keseimbangan alam.",
    },
  ];

  const handleScroll = () => {
    const section = document.getElementById("langganan-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#F8FCFA] py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Kenapa Harus Berlangganan?
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Langganan bukan cuma soal fitur — tapi tentang kontribusi nyata kamu
          dalam menjaga masa depan bumi kita.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {alasan.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.judul}
            </h3>
            <p className="text-sm text-gray-600">{item.deskripsi}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center mt-12"
      >
        <button
          onClick={handleScroll}
          className="px-8 py-3 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105"
        >
          Mulai Langganan Sekarang
        </button>
      </motion.div>
    </section>
  );
}
