"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="w-full overflow-x-hidden py-20 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* === IMAGE SIDE === */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[350px] h-[370px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/AcaraHijau2.png"
              alt="Reforesta - Alam Hijau"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* === TEXT SIDE === */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#047857]">
            Tentang Reforesta
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            <span className="font-semibold text-[#047857]">Reforesta</span> adalah komunitas yang berfokus pada pelestarian
            lingkungan dan penghijauan kembali area yang terdegradasi.
            Kami percaya bahwa setiap pohon yang ditanam hari ini adalah
            investasi berharga untuk masa depan bumi.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Melalui kegiatan penanaman pohon, edukasi lingkungan, dan kolaborasi
            dengan masyarakat lokal, kami berkomitmen menciptakan dunia yang
            lebih hijau, seimbang, dan berkelanjutan. Mari bergabung bersama kami
            untuk menjaga bumi tetap lestari.
          </p>

          <div className="mt-4">
            <a
              href="#acara-section"
              className="inline-block px-6 py-3 bg-[#047857] text-white font-semibold rounded-full hover:bg-[#036b4f] transition-all duration-300 shadow-md"
            >
              Lihat Kegiatan Kami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
