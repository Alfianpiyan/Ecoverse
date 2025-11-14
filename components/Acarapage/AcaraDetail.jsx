"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { supabase } from "@/lib/Supabaseclient";
import { ArrowLeftCircle } from "lucide-react";

export default function PilihBibitPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [bibitList, setBibitList] = useState([]);
  const [keranjang, setKeranjang] = useState({});

  const acara = {
    id: searchParams.get("id_acara"),
    judul: searchParams.get("judul"),
    lokasi: searchParams.get("lokasi"),
    tanggal: searchParams.get("tanggal"),
    gambar: searchParams.get("gambar"),
    deskripsi: searchParams.get("deskripsi"),
  };

  useEffect(() => {
    const fetchBibit = async () => {
      const { data, error } = await supabase.from("pohon").select("*");
      if (!error) setBibitList(data);
    };
    fetchBibit();
  }, []);

  const tambahBibit = (id) =>
    setKeranjang((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const kurangBibit = (id) =>
    setKeranjang((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const handleKonfirmasi = () => {
    if (Object.keys(keranjang).length === 0) {
      Swal.fire("Oops!", "Pilih minimal satu bibit sebelum lanjut.", "warning");
      return;
    }
    Swal.fire({
      title: "Lanjut ke Pembayaran?",
      text: "Kamu bisa konfirmasi donasi setelah ini.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjut",
    }).then((res) => {
      if (res.isConfirmed) {
        router.push(`/donatur/pembayaran?id_acara=${acara.id}`);
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header acara */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center"
      >
        <Image
          src={acara.gambar}
          alt={acara.judul}
          width={200}
          height={130}
          className="rounded-xl object-cover mb-4 sm:mb-0 sm:mr-5"
        />
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-1">
            {acara.judul}
          </h2>
          <p className="text-gray-600 text-sm mb-1">{acara.lokasi}</p>
          <p className="text-gray-500 text-sm mb-2">{acara.tanggal}</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {acara.deskripsi}
          </p>
        </div>
      </motion.div>

      {/* Daftar Bibit */}
      <h3 className="text-lg font-semibold text-green-700 mb-3">
        Pilih Bibit
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bibitList.map((b) => (
          <motion.div
            key={b.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between"
          >
            <Image
              src={b.gambar}
              alt={b.nama}
              width={200}
              height={120}
              className="rounded-lg object-cover mb-2"
            />
            <div>
              <h4 className="font-semibold text-green-800">{b.nama}</h4>
              <p className="text-sm text-gray-600">
                Rp {b.harga.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => kurangBibit(b.id)}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                -
              </button>
              <span className="font-medium">{keranjang[b.id] || 0}</span>
              <button
                onClick={() => tambahBibit(b.id)}
                className="px-3 py-1 bg-green-600 text-white rounded-md"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tombol konfirmasi */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeftCircle size={20} /> Kembali
        </button>
        <button
          onClick={handleKonfirmasi}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg shadow"
        >
          Konfirmasi Donasi
        </button>
      </div>
    </div>
  );
}
