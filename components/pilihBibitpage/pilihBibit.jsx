"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function TanamPohonPage() {
  const [acara, setAcara] = useState(null);
  const [bibit, setBibit] = useState([]);
  const [bibitTerpilih, setBibitTerpilih] = useState(null);
  const [jumlah, setJumlah] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const acaraDummy = {
          id: 1,
          nama: "Penanaman Pohon Mahoni",
          lokasi: "Desa Hijau Lestari, Bandung",
          tanggal: "10 November 2025",
          terkumpul: 100,
          target: 250,
        };

        const bibitDummy = [
          {
            id: 1,
            nama: "Pohon Mahoni",
            harga: 15000,
            gambar: "/pohon-mahoni.jpg",
          },
          {
            id: 2,
            nama: "Pohon Trembesi",
            harga: 12000,
            gambar: "/pohon-trembesi.jpg",
          },
        ];

        setAcara(acaraDummy);
        setBibit(bibitDummy);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    }

    fetchData();
  }, []);

  const tambah = () => setJumlah(jumlah + 1);
  const kurang = () => setJumlah(Math.max(1, jumlah - 1));

  const handleKonfirmasi = () => {
    if (!bibitTerpilih) {
      Swal.fire("Peringatan", "Pilih jenis bibit terlebih dahulu!", "warning");
      return;
    }

    Swal.fire({
      title: "Konfirmasi Pembayaran",
      html: `
        <div style="text-align:left">
          <p><b>Nama Acara:</b> ${acara.nama}</p>
          <p><b>Jenis Bibit:</b> ${bibitTerpilih.nama}</p>
          <p><b>Jumlah Bibit:</b> ${jumlah}</p>
          <p><b>Total:</b> Rp ${(bibitTerpilih.harga * jumlah).toLocaleString(
            "id-ID"
          )}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Konfirmasi & Kontribusi Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#15803d",
    });
  };

  if (!acara) {
    return <p className="text-center py-20 text-gray-500">Memuat data...</p>;
  }

  return (
    <section className="w-full max-w-[1000px] mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        {/*buat gambar */}
        <div className="bg-gray-200 w-full md:w-1/2 h-48 rounded-xl" />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-green-800 mb-3">
            {acara.nama}
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold">Lokasi:</span> {acara.lokasi}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Tanggal Acara:</span> {acara.tanggal}
          </p>
             <p className="text-sm text-gray-600 mt-1">Bibit yang terkumpul</p>
          <div className="w-20 bg-gray-200 h-3">
            <div
              className="bg-green-600 h-3 "
              style={{
                width: `${(acara.terkumpul / acara.target) * 100}%`,
              }}
            ></div>
          </div>
          <p className=" text-[10px] text-gray-600 mt-1">
            {acara.terkumpul}/{acara.target}
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-green-800 mb-8">
          Kontribusi Tanam
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Pilih Jenis Bibit Pohon
            </h3>
            <p className="text-gray-500 mb-6">
              Pilih bibit pohon yang akan di tanam
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bibit.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-2xl overflow-hidden shadow-md border-2 cursor-pointer ${
                    bibitTerpilih?.id === item.id
                      ? "border-green-600"
                      : "border-transparent"
                  }`}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-green-700 text-white text-center py-3">
                    <h4 className="font-semibold">{item.nama}</h4>
                    <p className="text-sm mt-1">
                      Harga Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                    <div className="flex justify-center items-center mt-2 gap-3">
                      <button
                        onClick={() => kurang()}
                        className="p-1 bg-white text-green-700 rounded-full"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span>{jumlah}</span>
                      <button
                        onClick={() => tambah()}
                        className="p-1 bg-white text-green-700 rounded-full"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <button
                      onClick={() => setBibitTerpilih(item)}
                      className="mt-3 bg-white text-green-700 font-semibold text-xs px-4 py-1 rounded-full hover:bg-gray-100"
                    >
                      Pilih Tanaman
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[380px]">
            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Ringkasan Kontribusi
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold w-32 inline-block">
                    Nama Acara
                  </span>
                  : {acara.nama}
                </p>
                <p>
                  <span className="font-semibold w-32 inline-block">
                    Jenis Bibit
                  </span>
                  : {bibitTerpilih?.nama || "-"}
                </p>
                <p>
                  <span className="font-semibold w-32 inline-block">
                    Jumlah Bibit
                  </span>
                  : {bibitTerpilih ? jumlah : 0}
                </p>
                <p className="border-t border-gray-200 pt-2 font-bold">
                  <span className="w-32 inline-block">Total</span> :{" "}
                  {bibitTerpilih
                    ? `Rp ${(bibitTerpilih.harga * jumlah).toLocaleString(
                        "id-ID"
                      )}`
                    : "Rp 0"}
                </p>
              </div>

              <button
                onClick={handleKonfirmasi}
                disabled={!bibitTerpilih}
                className={`w-full mt-4 py-3 rounded-xl font-semibold text-white ${
                  !bibitTerpilih
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Konfirmasi & Kontribusi Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
