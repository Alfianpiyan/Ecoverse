"use client";

import React, { useState } from "react";
import { Mail, Phone, Edit2, Save, X, Camera, Shield, User } from "lucide-react";
import { motion } from "framer-motion"; // Untuk animasi sederhana

export default function ProfileAndaPremium() {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({
    badge: "PIC Organisasi",
    nama: "Nama Lengkap",
    komunitas: "Komunitas Hijau Indonesia",
    email: "komunitas@gmail.com",
    telepon: "+62 81234567890",
    deskripsi:
      "Kami adalah komunitas yang berfokus pada kegiatan pelestarian lingkungan dan penghijauan di berbagai daerah Indonesia. Misi kami adalah menciptakan dampak positif yang berkelanjutan bagi bumi.",
  });

  const [tempData, setTempData] = useState(data);

  // Palet Warna Premium
  const primaryColor = "#1B4332";
  const accentColor = "#40916C"; 
  const lightBgColor = "#F6FFF8"; 
  const cardBgColor = "white"; 

  const handleEdit = () => {
    setTempData(data);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempData(data);
  };

  const handleSave = () => {
    setData(tempData);
    setEditMode(false);
  };

  const inputStyle = "w-full bg-white border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg px-4 py-2 text-gray-700 transition duration-200 shadow-inner";
  const infoTextStyle = "text-gray-600 font-medium";

  return (
    <div className={`min-h-screen ${lightBgColor} flex flex-col items-center py-12 px-4`}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`bg-[${accentColor}] text-emerald-700 font-bold text-xl px-10 py-3 rounded-xl shadow-lg mb-12`}
      >
        🌿 Profile Anda
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.5 }}
        className={`bg-[${cardBgColor}] rounded-xl shadow-2xl border-t-4 border-[${accentColor}] w-full max-w-4xl p-8 flex flex-col gap-6`}
      >
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-6 border-gray-100">
            {/* profile */}
            <div className="relative flex-shrink-0">
                <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-4xl text-gray-500 font-light">
                    <User className="w-16 h-16 text-gray-400" />
                </div>
                <button 
                    className={`absolute bottom-0 right-1 bg-white border-2 border-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 text-[${accentColor}]`}
                    title="Ubah Foto"
                >
                    <Camera className="w-4 h-4" />
                </button>
            </div>

            {/* edit button */}
            <div className="flex-1 flex flex-col gap-3 w-full md:w-auto">
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-2 bg-[#D8F3DC] text-[${primaryColor}] text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                        <Shield className="w-4 h-4 text-green-700"/>
                        {data.badge}
                    </div>
                    {!editMode ? (
                        <motion.button
                            onClick={handleEdit}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-1 text-sm font-semibold text-[${accentColor}] px-3 py-1 rounded-full hover:bg-[#D8F3DC] transition`}
                        >
                            <Edit2 className="w-4 h-4" /> Edit Profil
                        </motion.button>
                    ) : (
                        <div className="flex gap-2">
                            <motion.button
                                onClick={handleSave}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-1 bg-[${accentColor}] text-emerald-700 text-sm px-4 py-2 rounded-full shadow-md hover:bg-[${primaryColor}] transition`}
                            >
                                <Save className="w-4 h-4" /> Simpan
                            </motion.button>
                            <motion.button
                                onClick={handleCancel}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition"
                            >
                                <X className="w-4 h-4" /> Batal
                            </motion.button>
                        </div>
                    )}
                </div>

                {editMode ? (
                    <>
                        <input type="text" value={tempData.nama} onChange={(e) => setTempData({ ...tempData, nama: e.target.value })} 
                               className={`${inputStyle} text-lg font-bold`} placeholder="Nama Lengkap"/>
                        <input type="text" value={tempData.komunitas} onChange={(e) => setTempData({ ...tempData, komunitas: e.target.value })} 
                               className={`${inputStyle} text-base`} placeholder="Nama Komunitas"/>
                    </>
                ) : (
                    <>
                        <h2 className={`text-2xl font-bold text-[${primaryColor}]`}>{data.nama}</h2>
                        <p className={`text-base text-gray-700 italic`}>{data.komunitas}</p>
                    </>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* desk */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-lg p-6 shadow-inner border border-gray-200"
            >
                <h3 className={`font-bold mb-3 text-lg text-[${primaryColor}] border-b pb-2 border-gray-200`}>Deskripsi Organisasi</h3>
                {editMode ? (
                    <textarea
                        rows="5"
                        value={tempData.deskripsi}
                        onChange={(e) => setTempData({ ...tempData, deskripsi: e.target.value })}
                        className={`${inputStyle} h-full`}
                    />
                ) : (
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {data.deskripsi}
                    </p>
                )}
            </motion.div>

            {/* info */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-lg p-6 shadow-inner border border-gray-200"
            >
                <h3 className={`font-bold mb-4 text-lg text-[${primaryColor}] border-b pb-2 border-gray-200`}>Informasi Kontak</h3>
                <div className="flex flex-col gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <Mail className={`w-5 h-5 text-[${accentColor}] flex-shrink-0`} />
                        {editMode ? (
                            <input type="email" value={tempData.email} onChange={(e) => setTempData({ ...tempData, email: e.target.value })} 
                                   className={`${inputStyle} w-full`} placeholder="Email"/>
                        ) : (
                            <span className={infoTextStyle}>{data.email}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className={`w-5 h-5 text-[${accentColor}] flex-shrink-0`} />
                        {editMode ? (
                            <input type="text" value={tempData.telepon} onChange={(e) => setTempData({ ...tempData, telepon: e.target.value })} 
                                   className={`${inputStyle} w-full`} placeholder="Nomor Telepon"/>
                        ) : (
                            <span className={infoTextStyle}>{data.telepon}</span>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}