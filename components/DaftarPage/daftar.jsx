"use client";

import { supabase } from "@/lib/Supabaseclient";
import { hash } from "bcryptjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"; // ← tambahkan icon panah

export default function DaftarPage() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [userRole, setUserRole] = useState("");

  const [form, setForm] = useState({
    nama_instansi: "",
    email: "",
    password: "",
    no_telepon: "",
    pic: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert("Gagal register: " + error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      alert("Gagal mendapatkan data user dari Supabase Auth");
      return;
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        nama_pic: form.pic,
        nama_instansi: form.nama_instansi,
        password: form.password,
        email: form.email,
        jenis_kelamin: gender,
        jenis_akun: userRole,
        no_telepon: form.no_telepon,
      },
    ]);

    if (insertError) {
      alert("Gagal menyimpan data user: " + insertError.message);
      return;
    }

    alert("✅ Register berhasil! Silakan konfirmasi email Anda.");
  };

  const getButtonClass = (type, currentType, base = "bg-[#059669]") =>
    currentType === type
      ? `${base} text-white shadow-md font-semibold focus:ring-[#059669] focus:ring focus:ring-opacity-50`
      : "text-[#059669] border border-[#059669] bg-white hover:bg-green-50 font-medium hover:shadow-sm";

  const backgroundStyle = { background: "#ffffff" };
  const imagePanelStyle = {
    backgroundImage: "url('/gambar-pohon.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const SecondaryInput = () => (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Jenis Kelamin
      </label>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setGender("Laki-Laki")}
          className={`w-1/2 px-4 py-2.5 text-sm rounded-lg transition-all ${getButtonClass(
            "Laki-Laki",
            gender
          )}`}
        >
          Laki-Laki
        </button>
        <button
          type="button"
          onClick={() => setGender("Perempuan")}
          className={`w-1/2 px-4 py-2.5 text-sm rounded-lg transition-all ${getButtonClass(
            "Perempuan",
            gender
          )}`}
        >
          Perempuan
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="flex justify-center items-center min-h-screen py-10 px-4 sm:px-8 font-sans"
      style={backgroundStyle}
    >
      <section className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl relative">
        <div className="flex flex-col lg:flex-row">
          {/* PANEL KIRI */}
          <div
            className="hidden lg:flex flex-col justify-center items-center p-8 lg:w-2/5 text-white text-center relative"
            style={imagePanelStyle}
          >
            <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-[#047857]"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M24 42V26m17.942-15.993c-.776 13.024-9.13 17.236-15.946 17.896C24.896 28.009 24 27.104 24 26v-8.372c0-.233.04-.468.125-.684C27.117 9.199 34.283 8.155 40 8.02c1.105-.027 2.006.884 1.94 1.987M7.998 6.072c9.329.685 14.197 6.091 15.836 9.558c.115.242.166.508.166.776v7.504c0 1.14-.96 2.055-2.094 1.94C7.337 24.384 6.11 14.786 6.009 8C5.993 6.894 6.897 5.99 8 6.072"
                />
              </svg>

              <h1 className="text-2xl font-bold mt-3">Buat Akun Anda</h1>
              <p className="mt-1 text-sm font-light text-gray-200">
                Mari bantu kami menjadikan bumi hijau kembali 🌱
              </p>

              <div className="mt-8">
                <h2 className="text-sm font-medium">
                  Sudah punya <span className="font-bold">akun?</span>
                </h2>
                <Link
                  href="/Masuk"
                  className="inline-block w-50 mt-4 px-6 py-2 bg-white hover:bg-emerald-700 text-emerald-600 hover:text-white font-semibold rounded-full transition duration-500 shadow-md cursor-pointer"
                >
                  Masuk
                </Link>
              </div>
            </div>
          </div>

          {/* FORM KANAN */}
          <div className="flex items-center bg-white justify-center w-full py-8 px-6 lg:px-8 lg:w-3/5 relative">
            {/* 🔙 Tombol back di pojok kiri atas form */}
            <button
              type="button"
              onClick={() => router.push("/Masuk")}
              className="absolute top-4 left-4 text-gray-600 hover:text-[#059669] flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Kembali</span>
            </button>

            <div className="w-full mt-6">
              <div className="flex justify-center mb-2 -mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-[#047857]"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M24 42V26m17.942-15.993c-.776 13.024-9.13 17.236-15.946 17.896C24.896 28.009 24 27.104 24 26v-8.372c0-.233.04-.468.125-.684C27.117 9.199 34.283 8.155 40 8.02c1.105-.027 2.006.884 1.94 1.987M7.998 6.072c9.329.685 14.197 6.091 15.836 9.558c.115.242.166.508.166.776v7.504c0 1.14-.96 2.055-2.094 1.94C7.337 24.384 6.11 14.786 6.009 8C5.993 6.894 6.897 5.99 8 6.072"
                  />
                </svg>
              </div>

              <form
                className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2"
                onSubmit={handleRegister}
              >
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Nama PIC
                  </label>
                  <input
                    type="text"
                    name="pic"
                    value={form.pic}
                    onChange={handleChange}
                    placeholder="Masukkan Nama PIC"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Nama Instansi
                  </label>
                  <input
                    type="text"
                    name="nama_instansi"
                    value={form.nama_instansi}
                    onChange={handleChange}
                    placeholder="Masukkan Nama Instansi"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukkan Email"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan Password"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    name="no_telepon"
                    value={form.no_telepon}
                    onChange={handleChange}
                    placeholder="Masukkan No. Telepon"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                <SecondaryInput />

                <div className="md:col-span-2 mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Jenis Akun
                  </label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setUserRole("Donatur")}
                      className={`w-1/2 px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass(
                        "Donatur",
                        userRole
                      )}`}
                    >
                      Donatur
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserRole("Penanam")}
                      className={`w-1/2 px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass(
                        "Penanam",
                        userRole
                      )}`}
                    >
                      Penanam
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 mt-6">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-6 py-3 text-sm bg-emerald-700 text-white hover:bg-emerald-800 font-semibold rounded-[10px] transition duration-500 shadow-md cursor-pointer"
                  >
                    Daftar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
