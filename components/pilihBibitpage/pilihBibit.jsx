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
  const [keranjang, setKeranjang] = useState({});

  useEffect(() => {
    async function fetchData() {
      const acaraDummy = {
        id: 1,
        nama: "Penanaman Pohon Mahoni",
        lokasi: "Desa Hijau Lestari, Bandung",
        tanggal: "10 November 2025",
        terkumpul: 100,
        target: 250,
      };

      const bibitDummy = [
        { id: 1, nama: "Pohon Mahoni", harga: 15000, gambar: "/gambar-pohon.png" },
        { id: 2, nama: "Pohon Trembesi", harga: 12000, gambar: "/pohon-trembesi.jpg" },
      ];

      setAcara(acaraDummy);
      setBibit(bibitDummy);
    }

    fetchData();
  }, []);

  const tambah = (item) => {
    setKeranjang((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        jumlah: (prev[item.id]?.jumlah || 0) + 1,
      },
    }));
  };

  const kurang = (item) => {
    setKeranjang((prev) => {
      const jumlahSekarang = prev[item.id]?.jumlah || 0;
      if (jumlahSekarang <= 1) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }
      return {
        ...prev,
        [item.id]: {
          ...item,
          jumlah: jumlahSekarang - 1,
        },
      };
    });
  };

  const totalBibit = Object.values(keranjang).reduce(
    (acc, item) => acc + item.jumlah,
    0
  );
  const totalHarga = Object.values(keranjang).reduce(
    (acc, item) => acc + item.harga * item.jumlah,
    0
  );
  const jenisBibit = Object.values(keranjang)
    .map((item) => `${item.nama} (${item.jumlah}x)`)
    .join(", ") || "-";

  const handleKonfirmasi = () => {
    if (Object.keys(keranjang).length === 0) {
      Swal.fire("Peringatan", "Pilih minimal satu bibit terlebih dahulu!", "warning");
      return;
    }

    const detailPesanan = Object.values(keranjang)
      .map(
        (item) =>
          `${item.nama} (${item.jumlah}x) - Rp ${(item.harga * item.jumlah).toLocaleString("id-ID")}`
      )
      .join("<br>");

    Swal.fire({
      title: "Konfirmasi Pembayaran",
      html: `
        <div style="text-align:left">
          <p><b>Nama Acara:</b> ${acara.nama}</p>
          <p><b>Lokasi:</b> ${acara.lokasi}</p>
          <p><b>Pesanan:</b><br>${detailPesanan}</p>
          <p><b>Total:</b> Rp ${totalHarga.toLocaleString("id-ID")}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Konfirmasi & Kontribusi Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#15803d",
    });
  };

  if (!acara) return <p className="text-center py-20 text-gray-500">Memuat data...</p>;

  return (
    <section className="w-full max-w-[1000px] mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-gray-200 w-full md:w-1/2 h-48 rounded-xl" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-emerald-800 mb-3">{acara.nama}</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Lokasi:</span> {acara.lokasi}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Tanggal Acara:</span> {acara.tanggal}
          </p>
          <p className="text-sm text-gray-600 mt-1">Bibit yang terkumpul</p>
          <div className="w-20 bg-gray-200 h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-3"
              style={{ width: `${(acara.terkumpul / acara.target) * 100}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">
            {acara.terkumpul}/{acara.target}
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-emerald-700 mb-2">Pilih Jenis Bibit Pohon</h3>
          <p className="text-gray-500 mb-6">Pilih bibit pohon yang akan ditanam</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bibit.map((item) => {
              const jumlah = keranjang[item.id]?.jumlah || 0;
              return (
              <motion.div
                key={item.id}
                className="rounded-3xl overflow-hidden shadow-md border-2 border-transparent "
              >
                <div className="relative w-full h-40 overflow-hidden rounded-b-[20px]">
                  <Image
                    src={item.gambar}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-emerald-700 text-white text-center py-4 -mt-4">
                  <h4 className="font-semibold text-[16px]">{item.nama}</h4>
                  <p className="text-sm mt-1">Harga RP {item.harga.toLocaleString("id-ID")}</p>
                  
                  <div className="flex justify-center items-center mt-3 gap-2">
                    <button
                      onClick={() => kurang(item)}
                      className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                    >
                      -
                    </button>
                    <span className="text-sm">{jumlah}</span>
                    <button
                      onClick={() => tambah(item)}
                      className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                    >
                      +
                    </button>
                    <button
                      onClick={() => pilihTanaman(item)}
                      className="bg-white text-emerald-700 font-semibold text-xs px-3 py-1 rounded-full  hover:text-white hover:bg-emerald-900 transition duration-500 shadow-md cursor-pointern"
                    >
                      Pilih Tanaman
                    </button>
                  </div>
                </div>
              </motion.div>


              );
            })}
          </div>
        </div>


        <div className="w-full lg:w-[380px]">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Kontribusi</h3>

            <div className="text-[14px] text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Nama Acara</span> : {acara.nama}
              </p>
              <p>
                <span className="font-semibold">Jenis Bibit</span> : {jenisBibit}
              </p>
              <p>
                <span className="font-semibold">Jumlah Bibit</span> : {totalBibit}
              </p>
              <hr className="my-2" />
              <p>
                <span className="font-semibold">Total</span> : Rp{" "}
                {totalHarga.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={handleKonfirmasi}
              disabled={Object.keys(keranjang).length === 0}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white ${
                Object.keys(keranjang).length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Konfirmasi & Kontribusi Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
