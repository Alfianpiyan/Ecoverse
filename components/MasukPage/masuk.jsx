"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { supabase } from "@/lib/Supabaseclient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";

/**
 * Ambil role dan nama user dari tabel Supabase
 */
async function fetchUserRoleAndDetail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("jenis_akun, nama_instansi")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) {
    throw new Error("Role pengguna tidak ditemukan di database.");
  }

  return {
    role: data.jenis_akun?.toLowerCase(),
    nama: data.nama_instansi,
  };
}

export default function MasukPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Email dan password wajib diisi!",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Cek apakah user admin manual
      const { data: adminData } = await supabase
        .from("admin")
        .select("*")
        .eq("email", form.email)
        .maybeSingle();

      if (adminData) {
        const isMatch = adminData.password.startsWith("$2")
          ? await bcrypt.compare(form.password, adminData.password)
          : form.password === adminData.password;

        if (!isMatch) throw new Error("Password salah!");

        // Set session pakai NextAuth (manual signIn)
        await signIn("credentials", {
          email: adminData.email,
          role: "admin",
          redirect: false,
        });

        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: `Selamat datang kembali, Admin!`,
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => router.push("/Admin/dashboard"), 1500);
        return;
      }

      // 2️⃣ Login pakai Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError || !data?.user) throw new Error("Email atau password salah!");

      const sessionUser = data.user;
      const userDetail = await fetchUserRoleAndDetail(sessionUser.email);

      // 3️⃣ Simpan session ke NextAuth (tanpa localStorage)
      await signIn("credentials", {
        email: sessionUser.email,
        role: userDetail.role,
        nama: userDetail.nama,
        redirect: false,
      });

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang, ${userDetail.nama}!`,
        confirmButtonColor: "#059669",
        timer: 2000,
        showConfirmButton: false,
      });

      // 4️⃣ Redirect berdasarkan role
      if (userDetail.role === "donatur") {
        router.push("/donatur/home");
      } else if (userDetail.role === "penanam") {
        router.push("/penanam/home");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: err.message || "Terjadi kesalahan. Silakan coba lagi.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        {/* LEFT PANEL */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mb-2 -mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-[#059669]"
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

          <p className="mt-3 text-xl text-center text-[#059669] font-semibold">
            Selamat Datang Kembali!
          </p>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-[#059669] rounded-lg focus:ring-0 focus:border-[#059669] text-black"
                placeholder="Masukkan email"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>
                <Link
                  href="/lupaPassword"
                  className="text-xs text-gray-500 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-[#059669] rounded-lg pr-10 focus:ring-0 focus:border-[#059669] text-black"
                  placeholder="Masukkan password"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-[#059669]"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-sm bg-emerald-700 text-white hover:bg-emerald-600 font-semibold rounded-full transition duration-300 shadow-md"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link
              href="/user/register"
              className="text-xs text-gray-500 hover:underline"
            >
              Belum punya akun?
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>

        {/* RIGHT PANEL */}
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
              Kita butuh kamu lagi. Bumi gak bisa nunggu.
            </p>
            <Link
              href="/Daftar"
              className="inline-block mt-4 px-6 py-2 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-700 hover:text-white transition duration-300"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
