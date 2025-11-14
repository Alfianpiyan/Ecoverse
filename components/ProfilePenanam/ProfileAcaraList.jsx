"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Info, Clock } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/Supabaseclient";

export default function AcaraCard({ id, userId }) {
  const [acara, setAcara] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !userId) return;

    const fetchAcara = async () => {
      try {
        const { data, error } = await supabase
          .from("acara_penanaman")
          .select("*")
          .eq("id", id)
          .eq("id_user", userId)
          .single();

        if (error) {
          console.warn("Acara tidak ditemukan / bukan milik user");
          setAcara(null);
        } else {
          setAcara(data);
        }
      } catch (err) {
        console.error("Gagal ambil acara:", err.message);
        setAcara(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAcara();
  }, [id, userId]);

  // 🌿 Status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "selesai":
        return "bg-green-100 text-green-700";
      case "berjalan":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  // ⏳ skeleton loading
  if (loading) {
    return (
      <div className="p-5 border rounded-xl animate-pulse text-gray-500">
        Memuat data acara...
      </div>
    );
  }

  // Kalau bukan acara user atau tidak ditemukan → jangan tampilkan apa pun
  if (!acara) return null;

  return (
    <Link href={`/acara/${acara.id}/edit`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-5 rounded-2xl border border-green-100 shadow-md hover:shadow-lg transition cursor-pointer"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-xl text-green-900">
            {acara.judul_acara}
          </h3>

          <span
            className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(
              acara.status
            )}`}
          >
            {acara.status === "selesai"
              ? "Selesai"
              : acara.status === "berjalan"
              ? "Sedang Berjalan"
              : "Akan Datang"}
          </span>
        </div>

        <div className="text-sm space-y-2 text-green-800">
          <p className="flex items-center gap-2">
            <Calendar size={16} /> {acara.tanggal}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} /> {acara.lokasi || "Lokasi belum diatur"}
          </p>

          <p className="flex items-center gap-2">
            <Info size={16} />
            {(acara.deskripsi || "Tidak ada deskripsi").slice(0, 80)}...
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-green-700 font-semibold hover:text-green-900 text-sm">
          <Clock size={15} />
          Edit Acara
        </div>
      </motion.div>
    </Link>
  );
}
