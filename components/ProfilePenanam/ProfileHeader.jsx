"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/Supabaseclient";
import { useSession } from "next-auth/react";

export default function ProfileHeader() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    nama_pic: "",
    nama_instans: "",
    email: "",
    no_telepon: "",
    badges: [],
  });

  // Fetch profil user
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data: userData, error } = await supabase
          .from("users")
          .select("id, nama_pic, nama_instans, jenis_akun, no_telepon, email")
          .eq("email", session.user.email)
          .single();

        if (error) throw error;

        const { data: langganan } = await supabase
          .from("transaksi")
          .select("status")
          .eq("user_id", userData.id)
          .eq("status", "aktif")
          .maybeSingle();

        const badges = [];
        if (userData.jenis_akun === "donatur") badges.push("Donatur");
        if (userData.jenis_akun === "penerima_donatur") badges.push("Penerima Donatur");
        if (langganan) badges.push("Langganan");

        setProfile({
          nama_pic: userData.nama_pic,
          nama_instans: userData.nama_instans || "Belum terdaftar",
          email: userData.email,
          no_telepon: userData.no_telepon || "Belum diisi",
          badges,
        });
      } catch (err) {
        console.error("Gagal memuat profil:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Simpan ke DB
  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          nama_pic: profile.nama_pic,
          nama_instans: profile.nama_instans,
          no_telepon: profile.no_telepon,
        })
        .eq("email", profile.email);

      if (error) throw error;

      alert("Profil berhasil diperbarui 🌿");
      setIsEditing(false);
    } catch (err) {
      alert("Gagal menyimpan profil: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Memuat profil...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-green-50 relative"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-green-900 font-extrabold text-3xl tracking-tight">
          Profil Anda
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition-all mt-4 md:mt-0"
        >
          Edit Profil
        </button>
      </div>

      {/* FOTO & DETAIL */}
      <div className="flex flex-col md:flex-row items-start gap-8 border-t border-green-100 pt-6">
        {/* FOTO */}
        <div className="relative group mx-auto md:mx-0 shrink-0">
          <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl shadow-inner border-4 border-white transition-all duration-300 group-hover:ring-4 ring-green-200">
            {profile.nama_pic ? profile.nama_pic.charAt(0).toUpperCase() : "U"}
          </div>
          <button className="absolute bottom-0 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            Ubah Foto
          </button>
        </div>

        {/* DETAIL */}
        <div className="flex-1 w-full space-y-6">
          <div className="pb-4 border-b border-green-50">
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.badges.map((badge, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    badge === "Langganan"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="font-extrabold text-gray-900 text-2xl">
              {profile.nama_pic}
            </p>
            <p className="text-base text-gray-500 font-light mt-0.5">
              {profile.nama_instans}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Description placeholder */}
            <div className="bg-white border border-green-100 p-5 rounded-xl shadow-sm">
              <h3 className="font-bold text-green-700 text-lg">Deskripsi</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Belum ada deskripsi. Tambahkan nanti untuk menjelaskan komunitas
                atau tujuan Anda.
              </p>
            </div>

            {/* Contact info */}
            <div className="bg-white border border-green-100 p-5 rounded-xl shadow-sm">
              <h3 className="font-bold text-green-700 text-lg">
                Informasi Kontak
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Email:</span> {profile.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Nomor Telepon:</span>{" "}
                {profile.no_telepon}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDIT */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white w-[90%] max-w-lg rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-green-900 font-bold text-xl mb-6">
                Edit Profil
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="nama_pic"
                  value={profile.nama_pic}
                  onChange={handleChange}
                  placeholder="Nama PIC"
                  className="w-full border border-green-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  name="nama_instans"
                  value={profile.nama_instans}
                  onChange={handleChange}
                  placeholder="Nama Komunitas / Instansi"
                  className="w-full border border-green-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  name="no_telepon"
                  value={profile.no_telepon}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  className="w-full border border-green-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
