"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/Supabaseclient";
import AcaraCard from "./ProfileCard";

export default function ProfileAcaraList() {
  const [acaraList, setAcaraList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 🔹 ambil session user (biar gak null pas refresh)
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Gagal ambil session:", error.message);
      setUser(data?.session?.user || null);
    };

    getSession();

    // listener untuk update kalau login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 ambil data acara user
  useEffect(() => {
    const fetchAcara = async () => {
      if (!user) {
        setAcaraList([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("acara_penanaman")
          .select("*")
          .eq("id_user", user.id)
          .order("tanggal", { ascending: false });

        if (error) throw error;
        setAcaraList(data || []);
      } catch (err) {
        console.error("Gagal ambil acara:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcara();
  }, [user]);

  // 🔹 UI
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-green-100/50 border border-green-50"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-green-900 font-extrabold text-3xl tracking-tight">
          Aktivitas Anda
        </h2>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-green-300/50 transition-all text-sm whitespace-nowrap">
          + Buat Acara Baru
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse">Memuat data acara...</p>
      ) : acaraList.length > 0 ? (
        <div className="flex flex-col gap-6">
          {acaraList.map((item, index) => (
            <AcaraCard key={index} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Belum ada acara yang dibuat.</p>
      )}
    </motion.div>
  );
}
