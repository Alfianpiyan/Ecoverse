"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let { data: komunitas } = await supabase
          .from("Komunitas")
          .select("*")
          .eq("id", user.id)
          .single();

        if (komunitas) {
          setUserData(komunitas);
          setAccountType("Komunitas");
          setLoading(false);
          return;
        }

        let { data: sekolah } = await supabase
          .from("Sekolah")
          .select("*")
          .eq("email", user.email)
          .single();

        if (sekolah) {
          setUserData(sekolah);
          setAccountType("Sekolah");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("aboutMe");
    if (saved) setAboutMe(saved);
  }, []);

  const handleSaveAboutMe = () => {
    localStorage.setItem("aboutMe", aboutMe);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Data profil tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
        {/* 🔹 Header Profil */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Foto */}
          <div className="w-28 h-28 rounded-full bg-gray-200 flex-shrink-0"></div>

          {/* Detail */}
          <div className="flex-1 text-center md:text-left">
            {/* Role dengan border */}
            <p className="inline-block border border-green-500 text-green-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {accountType}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {accountType === "Komunitas"
                ? userData.nama_komunitas
                : userData.nama_sekolah}
            </h2>

            <p className="text-gray-500 mt-1">
              {userData.pic || "PIC tidak tersedia"}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {userData.nama_komunitas || "Tidak ada komunitas"}
            </p>
          </div>
        </div>

        {/* 🔹 Info Akun */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-500 text-sm mb-1">Email</label>
            <input
              readOnly
              value={userData.email || userData.email_komunitas || ""}
              className="w-full bg-gray-100 rounded-lg px-3 py-2 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm mb-1">Password</label>
            <input
              type="password"
              value="********"
              readOnly
              className="w-full bg-gray-100 rounded-lg px-3 py-2 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm mb-1">No Telepon</label>
            <input
              readOnly
              value={userData.no_telepon || userData.no_telepon_komunitas || ""}
              className="w-full bg-gray-100 rounded-lg px-3 py-2 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm mb-1">Jenis Kelamin</label>
            <input
              readOnly
              value={userData.jenis_kelamin || "Tidak diketahui"}
              className="w-full bg-gray-100 rounded-lg px-3 py-2 text-gray-700"
            />
          </div>
        </div>

        {/* 🔹 About Me */}
        <div className="mt-10 text-center">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSaveAboutMe}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
            )}
          </div>

          {!isEditing ? (
            <div className="w-full bg-gray-100 rounded-lg p-3 text-gray-700 min-h-[120px] text-left">
              {aboutMe || "Belum ada deskripsi."}
            </div>
          ) : (
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Tulis sesuatu tentang dirimu..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            />
          )}
        </div>

        {/* 🔹 Logout */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-green-600 text-white px-8 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
