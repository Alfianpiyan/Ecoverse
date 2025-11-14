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
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { supabase } from "@/lib/Supabaseclient";

export default function ProfileAndaPremium() {
  const [editMode, setEditMode] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

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
    "w-full bg-white border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-300 rounded-xl px-4 py-2 text-gray-700 transition duration-200";

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
        user.deskripsi_organisasi || "Belum ada deskripsi organisasi.",
    };

    setData(fixed);
    setTempData(fixed);
  }

  async function handleSave() {
    try {
      // Hanya kirim field yang ada di Supabase
      const updatedData = {
        nama_pic: tempData.nama_pic || "",
        nama_instansi: tempData.nama_instansi || "",
        no_telepon: tempData.no_telepon || "",
        jenis_akun: tempData.jenis_akun || "",
      };

      const { data: updatedUser, error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", data.id)
        .select("*")
        .single();

      if (error) throw error;

      setData({
        ...updatedUser,
        deskripsi_organisasi: tempData.deskripsi_organisasi, // tetap lokal
      });

      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Profil berhasil diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error("❌ Gagal update:", error.message || error);
      Swal.fire("Gagal!", "Perubahan tidak tersimpan. Cek console.", "error");
    }
  }

  const handleCancel = () => {
    setTempData(data);
    setEditMode(false);
  };

  if (loading) return <div className="p-10">Loading profile...</div>;
  if (!session) return <div className="p-10">Silakan login dulu</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-14 max-w-4xl mx-auto p-6 md:p-10 rounded-3xl shadow-xl border border-green-50 bg-white"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-green-900 font-extrabold text-3xl">Profil Anda</h2>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition"
          >
            <Edit2 size={18} className="inline mr-2" />
            Edit Profil
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
            >
              <Save size={18} className="inline mr-2" />
              Simpan
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
            >
              <X size={18} className="inline mr-2" />
              Batal
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 border-t border-green-100 pt-6">

        <div className="relative mx-auto md:mx-0">
          <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center border-4 border-white shadow-inner text-3xl font-bold text-green-700">
            {data.nama_pic ? data.nama_pic.charAt(0).toUpperCase() : "U"}
          </div>
          <button className="absolute bottom-0 right-1 p-2 rounded-full bg-white border shadow text-green-600">
            <Camera size={16} />
          </button>
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full">
          <div className="mb-4">
            <span className="inline-flex w-fit px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full shadow-sm items-center gap-1">
              <Shield size={14} /> {data.jenis_akun || "Tanpa Akun"}
            </span>

            {!editMode ? (
              <>
                <h3 className="text-2xl font-bold text-green-900 mt-3">
                  {data.nama_pic}
                </h3>
                <p className="text-gray-500 text-sm">{data.nama_instansi}</p>
              </>
            ) : (
              <div className="space-y-3 mt-4">
                <input
                  value={tempData.nama_pic}
                  onChange={(e) => setTempData({ ...tempData, nama_pic: e.target.value })}
                  className={inputStyle}
                />
                <input
                  value={tempData.nama_instansi}
                  onChange={(e) => setTempData({ ...tempData, nama_instansi: e.target.value })}
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
                  <option value="User">User</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            
            <div className="bg-white border border-green-100 p-5 rounded-xl shadow-sm">
              <h4 className="font-bold text-green-700">Informasi Kontak</h4>

              <div className="mt-3 space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail size={16} /> 
                  <input className={inputStyle + " opacity-50"} value={tempData.email} disabled />
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  {!editMode ? (
                    data.no_telepon
                  ) : (
                    <input
                      className={inputStyle}
                      value={tempData.no_telepon}
                      onChange={(e) =>
                        setTempData({ ...tempData, no_telepon: e.target.value })
                      }
                    />
                  )}
                </p>
              </div>
            </div>

            <div className="bg-white border border-green-100 p-5 rounded-xl shadow-sm">
              <h4 className="font-bold text-green-700">Deskripsi Organisasi</h4>

              {!editMode ? (
                <p className="mt-2 text-gray-600">{data.deskripsi_organisasi}</p>
              ) : (
                <textarea
                  className={inputStyle + " resize-none mt-2"}
                  rows={5}
                  value={tempData.deskripsi_organisasi}
                  onChange={(e) =>
                    setTempData({ ...tempData, deskripsi_organisasi: e.target.value })
                  }
                ></textarea>
              )}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
