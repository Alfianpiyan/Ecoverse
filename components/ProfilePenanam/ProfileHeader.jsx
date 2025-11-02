"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nama: "Nama Pengguna",
    email: "email@contoh.com",
    deskripsi:
      "Belum ada deskripsi yang ditambahkan. Tambahkan deskripsi singkat tentang tujuan penanaman Anda.",
    kontak: "Belum diisi",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profil berhasil diperbarui 🌿");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-green-100/50 border border-green-50 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-green-900 font-extrabold text-3xl tracking-tight">
          Akun Pengguna
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition-all mt-4 md:mt-0"
        >
          Edit Profil
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 border-t border-green-100 pt-6">
        {/* foto */}
        <div className="relative group mx-auto md:mx-0 shrink-0">
          <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center text-green-700 font-bold text-xl shadow-inner border-4 border-white transition-all duration-300 group-hover:ring-4 ring-green-200">
            <span className="text-2xl">NP</span>
          </div>
          <button className="absolute bottom-0 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-md">
            Ubah Foto
          </button>
        </div>

        {/* detail */}
        <div className="flex-1 w-full space-y-6">
          <div className="pb-4 border-b border-green-50">
            <p className="font-extrabold text-gray-900 text-2xl">
              {profile.nama}
            </p>
            <p className="text-base text-gray-500 font-light mt-0.5">
              {profile.email}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-green-100 p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-green-700 text-lg">Deskripsi</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {profile.deskripsi}
              </p>
            </div>

            <div className="bg-white border border-green-100 p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-green-700 text-lg">
                Informasi Kontak
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Nomor Telepon:</span>{" "}
                {profile.kontak}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* edit  */}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={profile.nama}
                    onChange={handleChange}
                    className="w-full border border-green-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full border border-green-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="kontak"
                    value={profile.kontak}
                    onChange={handleChange}
                    className="w-full border border-green-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    rows="3"
                    value={profile.deskripsi}
                    onChange={handleChange}
                    className="w-full border border-green-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
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
