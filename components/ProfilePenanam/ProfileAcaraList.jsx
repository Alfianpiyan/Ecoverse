"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Info, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/Supabaseclient";

export default function AcaraCard() {
  const [acaraList, setAcaraList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session?.user) {
        console.log("User belum login");
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const { data: acara } = await supabase
        .from("acara_penanaman")
        .select("*")
        .eq("id_user", userId);

      setAcaraList(acara || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <div className="p-5 border rounded-xl animate-pulse text-gray-500">Memuat data acara...</div>;
  }

  if (acaraList.length === 0) {
    return <p className="text-gray-500">Belum ada acara.</p>;
  }

  return (
    <div className="grid gap-4">
      {acaraList.map((acara) => (
        <Link key={acara.id} href={`/acara/${acara.id}/edit`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl border border-green-100 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-xl text-green-900">{acara.judul_acara}</h3>

              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {acara.status}
              </span>
            </div>

            <div className="text-sm space-y-2 text-green-800">
              <p className="flex items-center gap-2">
                <Calendar size={16} /> {acara.tanggal}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} /> {acara.lokasi}
              </p>

              <p className="flex items-center gap-2">
                <Info size={16} /> {(acara.deskripsi || "").slice(0, 80)}...
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-green-700 font-semibold text-sm">
              <Clock size={15} />
              Edit Acara
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
