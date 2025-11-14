"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Edit2,
  Save,
  X,
  Camera,
  Shield,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/Supabaseclient";

export default function ProfileAndaPremium() {
  const [editMode, setEditMode] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🎨 Colors centralized
  const COLORS = {
    primary: "#1B4332",
    accent: "#40916C",
    lightBg: "#F6FFF8",
    cardBg: "white",
  };

  // User Data
  const [data, setData] = useState({
    id: "",
    nama_pic: "",
    nama_instansi: "",
    email: "",
    no_telepon: "",
    jenis_kelamin: "",
    jenis_akun: "",
    deskripsi_organisasi: "",
  });

  const [tempData, setTempData] = useState(data);

  const inputStyle =
    "w-full bg-white border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg px-4 py-2 text-gray-700 transition duration-200 shadow-inner";

  // 🔥 Ambil session
  useEffect(() => {
    async function getSession() {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);

      if (sessionData.session?.user?.email) {
        fetchUser(sessionData.session.user.email);
      }

      setLoading(false);
    }
    getSession();
  }, []);

  // 🔥 Ambil user dari DB
  async function fetchUser(email) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return console.log(error);

    const fixed = {
      ...user,
      deskripsi_organisasi:
        user.deskripsi_organisasi ||
        "Belum ada deskripsi organisasi ditambahkan.",
    };

    setData(fixed);
    setTempData(fixed);
  }

  // 🔥 Simpan
  async function handleSave() {
    const { error } = await supabase
      .from("users")
      .update(tempData)
      .eq("id", data.id);

    if (error) return console.log("Gagal update:", error);

    setData(tempData);
    setEditMode(false);
  }

  const handleCancel = () => {
    setTempData(data);
    setEditMode(false);
  };

  if (loading) return <div className="p-10">Loading profile...</div>;
  if (!session) return <div className="p-10">Silakan login dulu</div>;

  return (
    <div
      className={`min-h-screen ${COLORS.lightBg} flex flex-col items-center py-12 px-4`}
    >
      {/* HEADER */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`bg-[${COLORS.accent}] text-white font-bold text-xl px-10 py-3 rounded-xl shadow-lg mb-12`}
      >
        🌿 Profile Anda
      </motion.div>

      {/* CARD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-[${COLORS.cardBg}] rounded-xl shadow-2xl border-t-4 border-[${COLORS.accent}] w-full max-w-4xl p-8 flex flex-col gap-6`}
      >
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-6">
          {/* FOTO */}
          <div className="relative">
            <div className="w-32 h-32 bg-gray-200 rounded-full shadow-lg flex items-center justify-center">
              <User className="w-16 h-16 text-gray-500" />
            </div>
            <button
              className={`absolute bottom-0 right-1 bg-white border p-2 rounded-full text-[${COLORS.accent}]`}
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* INFO */}
          <div className="flex-1 w-full">
            {/* BADGE */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 bg-[#D8F3DC] text-[${COLORS.primary}] text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                <Shield className="w-4 h-4 text-green-700" />
                {data.jenis_akun || "Tanpa Akun"}
              </div>

              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className={`text-[${COLORS.accent}] font-semibold px-3 py-1 rounded-full hover:bg-[#D8F3DC]`}
                >
                  <Edit2 className="w-4 h-4 inline" /> Edit Profil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className={`bg-[${COLORS.accent}] text-white px-4 py-2 rounded-full`}
                  >
                    <Save className="w-4 h-4 inline" /> Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 px-4 py-2 rounded-full"
                  >
                    <X className="w-4 h-4 inline" /> Batal
                  </button>
                </div>
              )}
            </div>

            {/* NAMA & INSTANSI */}
            {!editMode ? (
              <>
                <h2 className={`text-2xl font-bold text-[${COLORS.primary}] mt-3`}>
                  {data.nama_pic}
                </h2>
                <p className="text-gray-700 italic">{data.nama_instansi}</p>
              </>
            ) : (
              <>
                <input
                  value={tempData.nama_pic}
                  onChange={(e) =>
                    setTempData({ ...tempData, nama_pic: e.target.value })
                  }
                  className={inputStyle}
                />

                <input
                  value={tempData.nama_instansi}
                  onChange={(e) =>
                    setTempData({
                      ...tempData,
                      nama_instansi: e.target.value,
                    })
                  }
                  className={inputStyle}
                />

                <select
                  value={tempData.jenis_akun}
                  onChange={(e) =>
                    setTempData({ ...tempData, jenis_akun: e.target.value })
                  }
                  className={inputStyle}
                >
                  <option value="">Pilih Jenis Akun</option>
                  <option value="PIC Organisasi">PIC Organisasi</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* DETAIL SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

          {/* INFORMASI KONTAK */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border">
            <h3 className="text-lg font-bold text-green-700 mb-4">
              Informasi Kontak
            </h3>

            {/* Email */}
            <div className="flex items-center gap-3 mb-4">
              <Mail className={`w-5 h-5 text-[${COLORS.accent}]`} />
              {!editMode ? (
                <span>{data.email}</span>
              ) : (
                <input
                  value={tempData.email}
                  onChange={(e) =>
                    setTempData({ ...tempData, email: e.target.value })
                  }
                  className={inputStyle}
                />
              )}
            </div>

            {/* Telepon */}
            <div className="flex items-center gap-3">
              <Phone className={`w-5 h-5 text-[${COLORS.accent}]`} />
              {!editMode ? (
                <span>{data.no_telepon}</span>
              ) : (
                <input
                  value={tempData.no_telepon}
                  onChange={(e) =>
                    setTempData({
                      ...tempData,
                      no_telepon: e.target.value,
                    })
                  }
                  className={inputStyle}
                />
              )}
            </div>
          </div>

          {/* DESKRIPSI ORGANISASI */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border">
            <h3 className="text-lg font-bold text-green-700 mb-4">
              Deskripsi Organisasi
            </h3>

            {!editMode ? (
              <p className="text-gray-700 leading-relaxed">
                {data.deskripsi_organisasi}
              </p>
            ) : (
              <textarea
                value={tempData.deskripsi_organisasi}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    deskripsi_organisasi: e.target.value,
                  })
                }
                rows={6}
                className={inputStyle + " resize-none"}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
