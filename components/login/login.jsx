"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2"; // ✅ Tambahkan SweetAlert2

async function fetchUserRoleAndDetail(email) {
  const { data: komunitasData } = await supabase
    .from("Komunitas")
    .select("jenis_akun, nama_komunitas")
    .eq("email_komunitas", email)
    .limit(1)
    .maybeSingle();

  if (komunitasData) {
    const subRole = komunitasData.jenis_akun?.toLowerCase();
    return {
      role: subRole === "donatur" ? "donatur" : "penanam",
      nama: komunitasData.nama_komunitas || "Komunitas",
    };
  }

  const { data: sekolahData } = await supabase
    .from("Sekolah")
    .select("nama_sekolah")
    .eq("email", email)
    .single();

  if (sekolahData) {
    return {
      role: "sekolah",
      nama: sekolahData.nama_sekolah || "Sekolah",
    };
  }

  throw new Error("Role pengguna tidak ditemukan di database.");
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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
      const { data: adminData } = await supabase
        .from("admin")
        .select("*")
        .eq("email", form.email)
        .maybeSingle();

      if (adminData) {
        let isMatch = false;
        if (adminData.password.startsWith("$2")) {
          isMatch = await bcrypt.compare(form.password, adminData.password);
        } else {
          isMatch = form.password === adminData.password;
        }

        if (!isMatch) throw new Error("Password salah!");

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: adminData.id,
            email: adminData.email,
            role: "admin",
            nama: adminData.nama_admin || "Admin",
          })
        );

        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: "Selamat datang kembali, Admin!",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => router.push("/Admin/dashboard"), 1500);
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("User tidak ditemukan.");

      const sessionUser = data.user;
      const userDetail = await fetchUserRoleAndDetail(sessionUser.email);

      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { id: sessionUser.id, email: sessionUser.email },
        }),
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: sessionUser.id,
          email: sessionUser.email,
          role: userDetail.role,
          nama: userDetail.nama,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang, ${userDetail.nama}!`,
        confirmButtonColor: "#059669",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => router.push("/user/home"), 1500);
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

          {error && (
            <p className="mt-2 text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

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
                className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none"
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
                  className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none pr-10"
                  placeholder="Masukkan password"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-[#059669]"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.437 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.981 12C4.17 10.305 4.966 8.75 6 7.5m4.237 2.053a2 2 0 0 1 2.83 2.83M18.019 12a9.143 9.143 0 0 1-1.002 2.662l-.768-1.535M12 21c-3.132 0-6.185-.708-8.775-2.008M21 12c-.22.684-.537 1.348-.936 1.977m-8.583 3.659a2 2 0 0 1-2.83 2.83m.222-7.51a.75.75 0 0 0 0 1.06l.477.477M12 3a9.143 9.143 0 0 0-8.775 2.008M21 12c-.22.684-.537 1.348-.936 1.977" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-sm font-medium text-white bg-[#059669] rounded-lg hover:bg-[#037f58] transition"
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
          className="relative hidden lg:flex lg:w-1/2 items-center justify-center rounded-tr-lg rounded-br-lg bg-cover bg-center"
          style={{ backgroundImage: "url('/gambar-pohon.png')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-tr-lg rounded-br-lg"></div>
          <div className="relative z-10 text-center text-white p-6">
            <p className="mt-4 font-semibold text-lg">
              Selamat datang kembali, Penjaga Bumi 🌱
            </p>
            <p className="text-sm mt-1">
              Kita butuh kamu lagi. Bumi gak bisa nunggu.
            </p>
            <Link
              href="/user/register"
              className="inline-block mt-4 px-6 py-2 bg-white text-[#059669] font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
