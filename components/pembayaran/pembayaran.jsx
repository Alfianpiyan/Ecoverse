"use client";
import Image from "next/image";
import { useState } from "react";

export default function Pembayaran() {
  const [metode, setMetode] = useState("?");

  return (
    <section className="min-h-screen bg-white flex items-start justify-center py-16 px-10">
      <div className="bg-white w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/*ini bagian kiri mas*/}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-3 text-emerald-800 flex items-center gap-2">
              🌿 Detail Acara
            </h2>
            <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-emerald-700 font-semibold">
              (Gambar Acara)
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              Acara penanaman pohon di wilayah <b>Jawa Barat</b> bersama komunitas
              <span className="text-emerald-700 font-semibold"> Reforestacia</span>.  
              Bergabunglah untuk menghijaukan bumi dan menanam harapan baru 🌱.
            </p>
          </div>

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

        {/*bagian kanan y*/}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">
              Detail Donasi
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium text-emerald-800">Lokasi:</span> Jawa Barat
              </p>
              <p>
                <span className="font-medium text-emerald-800">Jenis Bibit:</span> Pohon Sangon
              </p>
              <p>
                <span className="font-medium text-emerald-800">Jumlah Bibit:</span> 1
              </p>
              <p>
                <span className="font-medium text-emerald-800">Total:</span>{" "}
                <span className="text-emerald-700 font-bold text-lg">
                  Rp 25.000
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Metode Pembayaran
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

            <button className="w-full mt-8 bg-green-600 text-white font-semibold py-3 rounded-full hover:from-emerald-700 hover:to-green-600 shadow-lg transition-all active:scale-95">
              Bayar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
