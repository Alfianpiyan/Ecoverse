"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { loginAdmin, loginUser, fetchUserRoleAndDetail } from "@/services/page";

export default function MasukPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPassword((p) => !p);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Email dan password wajib diisi!",
        confirmButtonColor: "#059669",
      });
    }

    setLoading(true);

    try {
      // 1) CEK ADMIN
      const isAdmin = await loginAdmin(form.email, form.password);

      if (isAdmin) {
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: "Selamat datang kembali, Admin!",
          timer: 1500,
          showConfirmButton: false,
        });

        return setTimeout(() => router.push("/Admin/dashboard"), 1200);
      }

      // 2) LOGIN USER
      const user = await loginUser(form.email, form.password);
      const detail = await fetchUserRoleAndDetail(user.email);

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang, ${detail.nama}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      const redirectPath =
        detail.role === "donatur"
          ? "/donatur/home"
          : detail.role === "penanam"
          ? "/penanam/Home"
          : "/";

      router.push(redirectPath);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: err.message,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">

        {/* LEFT FORM */}
        <div className="relative w-full px-6 py-8 md:px-8 lg:w-1/2">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 text-gray-600 hover:text-[#059669] flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali</span>
          </button>

          <div className="flex justify-center mb-2 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-[#059669]"
              viewBox="0 0 48 48">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M24 42V26m17.9-15.9c-.7 13-9.1 17.2-15.9 17.9C24.9 28 24 27 24 26v-8.3c0-.3.1-.5.1-.7C27.1 9.2 34.3 8.1 40 8c1.1 0 2 .9 1.9 2M8 6c9.3.7 14.2 6.1 15.8 9.6c.1.2.2.5.2.8v7.5c0 1.1-.9 2-2.1 1.9C7.3 24.4 6.1 14.8 6 8c0-1.1.9-2 2-2z"
              />
            </svg>
          </div>

          <p className="mt-3 text-xl text-center text-[#059669] font-semibold">
            Selamat Datang Kembali!
          </p>

          <form onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="mt-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#059669] rounded-lg focus:border-[#059669] outline-none text-black"
                placeholder="Masukkan email"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-600">Password</label>
                <Link href="/lupaPassword" className="text-xs text-gray-500 hover:underline">
                  Lupa Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#059669] rounded-lg pr-12 focus:border-[#059669] outline-none text-black"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-[#059669]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-600 transition"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b"></span>
            <Link href="/Daftar" className="text-xs text-gray-500 hover:underline">
              Belum punya akun?
            </Link>
            <span className="w-1/5 border-b"></span>
          </div>
        </div>

        {/* RIGHT IMAGE PANEL */}
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative items-center justify-center"
          style={{ backgroundImage: "url('/gambar-pohon.png')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white p-6">
            <p className="font-semibold text-lg">
              Selamat datang kembali, Penjaga Bumi 🌱
            </p>
            <p className="text-sm mt-1">
              Kita butuh kamu lagi. Bumi tidak bisa menunggu.
            </p>
            <Link
              href="/Daftar"
              className="inline-block mt-4 px-6 py-2 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-700 hover:text-white transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
