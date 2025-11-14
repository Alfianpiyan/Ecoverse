"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle2, Sprout, Clock4, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackingBibit() {
  const router = useRouter();
  const [filter, setFilter] = useState("semua");

  const [data, setData] = useState([]);

useEffect(() => {
  try {
    const riwayat = JSON.parse(localStorage.getItem("riwayatBibit")) || [];

    // Filter hanya transaksi donasi bibit
    const kegiatan = riwayat
      .filter((item) => item.type === "DONASI_BIBIT")
      .map((item) => ({
        id: item.id,
        title: item.bibit.acara_nama,
        date: item.bibit.tanggal,
        location: item.bibit.lokasi,
        image: item.bibit?.detail_bibit?.[0]?.image || "/default.jpg", 
        status: "menunggu", 
        documentation: [],  
      }));

    setData(kegiatan);
  } catch (e) {
    console.error("Gagal ambil riwayat:", e);
  }
}, []);


  const filteredData =
    filter === "semua" ? data : data.filter((item) => item.status === filter);

  const steps = [
    { key: "semua", label: "Semua", icon: <List size={18} /> },
    { key: "menunggu", label: "Menunggu Acara", icon: <Clock4 size={18} /> },
    { key: "ditanam", label: "Sedang Ditanam", icon: <Sprout size={18} /> },
    { key: "selesai", label: "Sudah Ditanam", icon: <CheckCircle2 size={18} /> },
  ];

  const renderStatusIcon = (step) => {
    const active = filter === step.key;
    return (
      <div
        onClick={() => setFilter(step.key)}
        className={`flex flex-col items-center cursor-pointer transition-all ${
          active ? "text-green-700" : "text-gray-400 hover:text-green-500"
        }`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-md transition-all ${
            active
              ? "bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg"
              : "bg-white border border-gray-300"
          }`}
        >
          {step.icon}
        </motion.div>
        <span
          className={`text-xs font-semibold ${
            active ? "text-green-700" : "text-gray-500"
          }`}
        >
          {step.label}
        </span>
      </div>
    );
  };

  return (
    <div className="mt-8 min-h-screen bg-white pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            🌱 Kegiatan Anda
          </h2>
          <p className="text-gray-600 text-sm">
            Lihat perkembangan kegiatan penanaman pohon Anda
          </p>
        </div>

        <div className="flex justify-between items-center max-w-3xl mx-auto relative mb-10">
          <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 z-0"></div>
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex-1 flex justify-center">
              {renderStatusIcon(step)}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl shadow-md p-5 flex flex-col md:flex-row items-start justify-between transition-all"
                >
                  <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-green-900 text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      📅 {item.date}
                      <br />📍 {item.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      Penanaman bibit untuk mendukung kelestarian lingkungan 🌿
                    </p>
                  </div>

                  <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-28 h-28 rounded-xl overflow-hidden shadow-md mb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                    <button
                      onClick={() =>
                        router.push(`/donatur/detailStatusAcara/${item.id}`)
                      }
                      className="bg-gradient-to-r from-green-700 to-green-900 text-white text-sm px-5 py-2 rounded-lg hover:opacity-90 transition-all shadow-sm"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                Tidak ada kegiatan dengan status ini 🌾
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
