"use client";

import { FiMail, FiAlertCircle, FiFileText, FiChevronRight, FiLock } from "react-icons/fi";
// Import Link dari Next.js untuk navigasi yang lebih baik
import Link from "next/link"; 

export default function AccountSettings() {
  return (
    // Kontainer utama: Ukuran lebih ramping (max-w-2xl) dengan judul halaman
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10">
      
      {/* Judul Halaman Utama */}
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">
        Pengaturan Akun
      </h1>

      {/* Keamanan Akun Card */}
      <div className="bg-white shadow-xl shadow-gray-100 rounded-xl p-6 border border-gray-100">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiLock className="w-5 h-5 text-green-600" />
            Keamanan & Login
          </h2>
          <p className="text-gray-500 text-sm">
            Jaga keamanan akun Anda. Kelola kata sandi dan metode masuk.
          </p>

          {/* Tombol Ubah Kata Sandi */}
          <button className="w-full md:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium 
                             hover:bg-green-700 transition duration-200 shadow-md shadow-green-300/50">
            Ubah Kata Sandi
          </button>
        </section>
        
        {/* Informasi Login Detail */}
        <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Informasi Login</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4">
                    <FiMail className="w-5 h-5 text-gray-600" />
                    <div className="text-sm">
                        <p className="font-medium text-gray-800">Email & Kata Sandi</p>
                        <p className="text-gray-400 text-xs">Terakhir diperbarui: 12 Sep 2025</p>
                    </div>
                </div>
                {/* Tombol Ubah (diganti menjadi Link agar lebih fungsional) */}
                <Link href="/settings/email-password"
                    className="text-sm font-semibold text-green-600 hover:text-green-700 transition">
                    Ubah
                </Link>
            </div>
        </div>

      </div>

      {/* Bantuan & Tentang Card */}
      <div className="bg-white shadow-xl shadow-gray-100 rounded-xl p-6 border border-gray-100">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            Bantuan & Legal
          </h2>
          <p className="text-gray-500 text-sm">
            Temukan jawaban, pelajari syarat layanan, dan kebijakan kami.
          </p>

          <div className="space-y-2 pt-2">
            
            {/* Opsi Pusat Bantuan */}
            <Link href="/help" className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition cursor-pointer group">
              <div className="flex items-center gap-3">
                <FiAlertCircle className="w-5 h-5 text-gray-500 group-hover:text-green-600" />
                <span className="font-medium text-gray-700">Pusat Bantuan / FAQ</span>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </Link>

            {/* Opsi Syarat & Kebijakan */}
            <Link href="/legal" className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition cursor-pointer group">
              <div className="flex items-center gap-3">
                <FiFileText className="w-5 h-5 text-gray-500 group-hover:text-green-600" />
                <span className="font-medium text-gray-700">Syarat & Kebijakan Privasi</span>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </Link>

          </div>
        </section>
      </div>

      {/* Footer yang lebih minimalis */}
      <footer className="text-gray-400 text-xs text-center pt-8">
        <p>Versi: v1.0.0</p>
        <p className="mt-1">© 2025 Bibit Reforest. Semua hak cipta dilindungi.</p>
      </footer>
    </div>
  );
}