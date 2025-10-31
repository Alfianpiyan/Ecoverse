"use client";
import Image from "next/image";
import { useState } from "react";

export default function Pembayaran() {
  const [metode, setMetode] = useState("?");

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-6xl w-full flex flex-col md:flex-row gap-8 p-8">
        {/*ini bagian kiri mas */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              🌿 Detail Acara
            </h2>
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
            <p className="text-gray-700 leading-relaxed">
              Acara penanaman pohon di wilayah Jawa Barat bersama komunitas
              Reforestacia. Bergabunglah untuk menghijaukan bumi!
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              👤 Data Anda
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nama</p>
                <p className="font-medium text-gray-800">Alfian Alfaridzi</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">
                  alfian@example.com
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">No. HP</p>
                <p className="font-medium text-gray-800">0812-3456-7890</p>
              </div>
            </div>
          </div>
        </div>

        {/*bagian kanan y*/}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white border rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Detail
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Lokasi :</span> Jawa Barat
              </p>
              <p>
                <span className="font-medium">Jenis Bibit :</span> Pohon Sangon
              </p>
              <p>
                <span className="font-medium">Jumlah Bibit :</span> 1
              </p>
              <p>
                <span className="font-medium">Total :</span>{" "}
                <span className="text-green-700 font-semibold">Rp 25.000</span>
              </p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
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
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                    metode === item.id
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setMetode(item.id)}
                >
                  <input
                    type="radio"
                    checked={metode === item.id}
                    onChange={() => setMetode(item.id)}
                    className="accent-green-700"
                  />
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={32}
                      height={32}
                    />
                    <span className="text-gray-800 font-medium">
                      {item.name}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <button className="w-full mt-6 bg-emerald-600 text-white font-semibold py-3 rounded-full hover:bg-emerald-800 transition">
              Bayar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
