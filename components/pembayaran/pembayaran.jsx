"use client";
import Image from "next/image";
import { useState, useMemo } from "react";

// =================================================================
// DATA DINAMIS (HARUSNYA DARI PROPS/SERVER, DISINI DUMMY SEMENTARA)
// =================================================================

// 💡 Data Dummy untuk Mode Bibit
const dummyDataBibit = {
  type: "BIBIT", // Kunci untuk menentukan jenis transaksi
  title: "Acara Penanaman Pohon Bersama",
  location: "Jawa Barat",
  community: "Reforestacia",
  description: "Acara penanaman pohon di wilayah Jawa Barat bersama komunitas Reforestacia. Bergabunglah untuk menghijaukan bumi dan menanam harapan baru 🌱.",
  imagePlaceholder: "(Gambar Acara)",
  details: [
    { label: "Lokasi", value: "Jawa Barat" },
    { label: "Jenis Bibit", value: "Pohon Sangon" },
    { label: "Jumlah Bibit", value: "1" },
  ],
  total: "Rp 25.000",
};

// 💡 Data Dummy untuk Mode Langganan (Menggunakan data dari komponen LanggananPage Anda)
const dummyDataLangganan = {
  type: "LANGGANAN", // Kunci untuk menentukan jenis transaksi
  title: "Paket Langganan Standard", // Contoh: dari paket 'Standard'
  location: "Durasi Langganan",
  community: "1 Bulan",
  description: "Akses penuh fitur Ecoverse. Ideal untuk penggunaan pribadi dengan dukungan 24/7 dan analitik bulanan.",
  imagePlaceholder: "(Logo Paket Standard)",
  details: [
    { label: "Paket", value: "Standard" },
    { label: "Harga per Bulan", value: "Rp 150.000" },
    { label: "Periode", value: "1 Bulan" },
  ],
  total: "Rp 150.000",
};

// ⚠️ Ganti variabel ini ke salah satu dummyData untuk menguji mode
const TRANSACTION_DATA = dummyDataLangganan; 
// const TRANSACTION_DATA = dummyDataBibit; 

export default function Pembayaran() {
  const [metode, setMetode] = useState("?");
  const isSubscription = TRANSACTION_DATA.type === "LANGGANAN";
  
  // 💡 Label yang dinamis
  const detailTitle = isSubscription ? "Detail Langganan" : "Detail Donasi";

  return (
    <section className="min-h-screen bg-white flex items-start justify-center py-16 px-10">
      <div className="bg-white w-full grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        
        {/* === BAGIAN KIRI: DETAIL TRANSAKSI & DATA USER === */}
        <div className="flex flex-col gap-6">
          
          {/* 1. Detail Acara / Paket */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-3 text-emerald-800 flex items-center gap-2">
              {isSubscription ? "💎 Detail Paket" : "🌿 Detail Acara"}
            </h2>
            <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-emerald-700 font-semibold">
              {TRANSACTION_DATA.imagePlaceholder}
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              {TRANSACTION_DATA.description.split("<b>").map((part, index) => 
                 // Render bold text jika ada (dari dummy data Bibit)
                 index % 2 === 1 ? <b key={index}>{part}</b> : <span key={index}>{part}</span>
              )}
            </p>
          </div>

          {/* 2. Data Anda (Tetap Statis) */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4 text-emerald-800 flex items-center gap-2">
              👤 Data Anda
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nama</p>
                <p className="font-medium text-gray-800">Alfian Alfaridzi</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">alfian@example.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">No. HP</p>
                <p className="font-medium text-gray-800">0812-3456-7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* === BAGIAN KANAN: RINCIAN HARGA & METODE BAYAR === */}
        <div className="flex flex-col gap-6">
          
          {/* 3. Detail Donasi / Langganan (Dinamis) */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">
              {detailTitle}
            </h3>
            <div className="space-y-2 text-gray-700 pb-3 border-b border-gray-100">
              {TRANSACTION_DATA.details.map((item, index) => (
                <p key={index}>
                  <span className="font-medium text-emerald-800">{item.label}:</span>{" "}
                  {item.value}
                </p>
              ))}
            </div>
            
            <div className="pt-3 flex justify-between items-center">
                <span className="font-medium text-emerald-800">Total Pembayaran:</span>
                <span className="text-emerald-700 font-bold text-xl">
                  {TRANSACTION_DATA.total}
                </span>
            </div>
          </div>

          {/* 4. Metode Pembayaran (Tetap Statis) */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Pilih Metode Pembayaran
            </h3>

            <div className="space-y-3">
              {[
                { id: "bca", name: "BCA Mobile", logo: "/bca.png" },
                { id: "dana", name: "Dana", logo: "/dana.png" },
                { id: "bri", name: "BRI Mobile", logo: "/bri.png" },
                { id: "linkaja", name: "Link Aja", logo: "/linkaja.png" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                    metode === item.id
                      ? "border-emerald-600 bg-emerald-50 shadow-md scale-[1.02]"
                      : "border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                  }`}
                  onClick={() => setMetode(item.id)}
                >
                  <input
                    type="radio"
                    checked={metode === item.id}
                    onChange={() => setMetode(item.id)}
                    className="accent-emerald-700"
                  />
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span className="text-gray-800 font-medium">
                      {item.name}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <button className="w-full mt-8 bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-emerald-700 shadow-lg transition-all active:scale-95">
              Bayar {TRANSACTION_DATA.total}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}