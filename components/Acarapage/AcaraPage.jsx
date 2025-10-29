"use client";

import Image from "next/image";
import Link from "next/link";

export default function AcaraPage() {
  const today = new Date();

  const formatDate = (date) =>
    date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const events = [
    {
      title: "Penanaman Pohon di Gunung Salak",
      status: "Sedang Berlangsung",
      time: "07.00–10.00 WIB",
      location: "Gunung Salak, Bogor",
      image: "/acara1.jpg",
      date: today,
    },
    {
      title: "Penghijauan Hutan Kota Bogor",
      status: "Belum Dimulai",
      time: "08.00–11.00 WIB",
      location: "Hutan Kota Bogor",
      image: "/acara2.jpg",
      date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Penanaman Bibit di Kebun Raya",
      status: "Belum Dimulai",
      time: "09.00–12.00 WIB",
      location: "Kebun Raya Bogor",
      image: "/acara3.jpg",
      date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Gerakan Hijau Cibinong Bersama Relawan Muda",
      status: "Sedang Berlangsung",
      time: "07.00–09.30 WIB",
      location: "Lapangan Cibinong",
      image: "/acara4.jpg",
      date: today,
    },
    {
      title: "Aksi Tanam Pohon SMA Taruna Bhakti",
      status: "Belum Dimulai",
      time: "08.00–10.00 WIB",
      location: "Depok",
      image: "/acara5.jpg",
      date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Peduli Alam Gunung Gede Pangrango",
      status: "Sedang Berlangsung",
      time: "06.30–09.30 WIB",
      location: "Gunung Gede Pangrango",
      image: "/acara6.jpg",
      date: today,
    },
  ];

  return (
    <section className="min-h-screen bg-white py-20 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-[#064E3B] text-center mb-10">
        Daftar Acara Penanaman Pohon
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#F0FDF4] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {/* Gambar */}
            <div className="relative w-full h-48">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Konten */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-[#064E3B] mb-2 leading-snug">
                  {event.title}
                </h2>

                <p
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    event.status === "Sedang Berlangsung"
                      ? "bg-[#059669] text-white"
                      : "bg-yellow-400 text-[#064E3B]"
                  }`}
                >
                  {event.status}
                </p>

                <p className="text-sm text-gray-700 mb-1">
                  📅 {formatDate(event.date)}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  🕒 {event.time}
                </p>
                <p className="text-sm text-gray-700">📍 {event.location}</p>
              </div>

              {/* Tombol Selengkapnya */}
              <Link
                href={`/user/acara/${index}`}
                className="bg-[#059669] hover:bg-[#047857] text-white text-center font-medium py-2 rounded-full mt-4 transition"
              >
                Selengkapnya
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
