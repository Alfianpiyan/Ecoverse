"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/Supabaseclient";
import Swal from "sweetalert2";

export default function PembayaranLangganan() {
  const [metode, setMetode] = useState("");
  const [planData, setPlanData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data paket dari localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) {
      try {
        setPlanData(JSON.parse(storedPlan));
      } catch (error) {
        console.error("Gagal parse data plan:", error);
      }
    }
  }, []);

  // 🔹 Ambil data user dari Supabase
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const email = sessionData?.session?.user?.email;
        if (!email) return;

        const { data: user, error } = await supabase
          .from("users")
          .select("nama_pic, email, no_telepon")
          .eq("email", email)
          .single();

        if (error) throw error;
        setUserData(user);
      } catch (err) {
        console.error("Gagal ambil data user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Kalau belum ada plan data
  if (!planData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat detail langganan...
      </div>
    );
  }

  const TRANSACTION_DATA = {
    title: planData.title,
    description: planData.desc,
    imagePlaceholder: `(Logo ${planData.title})`,
    details: [
      { label: "Paket", value: planData.title },
      { label: "Harga", value: planData.price },
      { label: "Periode", value: planData.per },
    ],
    total: planData.price,
  };

  // 🔹 Fungsi tombol bayar
  const handlePayment = async () => {
    if (!metode) {
      Swal.fire({
        icon: "error",
        title: "Metode belum dipilih",
        text: "Pilih salah satu metode pembayaran sebelum lanjut ya!",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: `Bayar ${TRANSACTION_DATA.total} untuk paket ${TRANSACTION_DATA.title}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, bayar sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      // 🔸 Simpan ke localStorage
      const transaksiBaru = {
        id: Date.now(),
        plan: TRANSACTION_DATA.title,
        total: TRANSACTION_DATA.total,
        metode,
        tanggal: new Date().toLocaleString("id-ID"),
        user: userData,
      };

      const riwayat = JSON.parse(localStorage.getItem("riwayatLangganan")) || [];
      riwayat.push(transaksiBaru);
      localStorage.setItem("riwayatLangganan", JSON.stringify(riwayat));

      // 🔸 Alert sukses
      Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil!",
        text: `Transaksi kamu untuk paket ${TRANSACTION_DATA.title} sudah disimpan.`,
        confirmButtonColor: "#16a34a",
      });
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-start justify-center py-16 px-10">
      <div className="bg-white w-full grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        {/* === KIRI === */}
        <div className="flex flex-col gap-6">
          {/* Detail Paket */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-3 text-emerald-800 flex items-center gap-2">
              💎 Detail Paket
            </h2>
            <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-emerald-700 font-semibold">
              {TRANSACTION_DATA.imagePlaceholder}
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              {TRANSACTION_DATA.description}
            </p>
          </div>

          {/* Data Anda */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4 text-emerald-800 flex items-center gap-2">
              👤 Data Anda
            </h2>
            {loading ? (
              <p className="text-gray-500">Memuat data pengguna...</p>
            ) : userData ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">nama_pic</p>
                  <p className="font-medium text-gray-800">{userData.nama_pic}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">No. HP</p>
                  <p className="font-medium text-gray-800">
                    {userData.no_telepon || "-"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Data pengguna tidak ditemukan.</p>
            )}
          </div>
        </div>

        {/* === KANAN === */}
        <div className="flex flex-col gap-6">
          {/* Detail Langganan */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">
              Detail Langganan
            </h3>
            <div className="space-y-2 text-gray-700 pb-3 border-b border-gray-100">
              {TRANSACTION_DATA.details.map((item, index) => (
                <p key={index}>
                  <span className="font-medium text-emerald-800">{item.label}:</span>{" "}
                  {item.value}
                </p>
              ))}
            </div>

            <div className="pt-3 flex justify-between items-center">
              <span className="font-medium text-emerald-800">Total Pembayaran:</span>
              <span className="text-emerald-700 font-bold text-xl">
                {TRANSACTION_DATA.total}
              </span>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Pilih Metode Pembayaran
            </h3>

            <div className="space-y-3">
              {[
                { id: "bca", name: "BCA Mobile", logo: "/bca.png" },
                { id: "dana", name: "Dana", logo: "/dana.png" },
                { id: "bri", name: "BRI Mobile", logo: "/bri.png" },
                { id: "linkaja", name: "Link Aja", logo: "/linkaja.png" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                    metode === item.id
                      ? "border-emerald-600 bg-emerald-50 shadow-md scale-[1.02]"
                      : "border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                  }`}
                  onClick={() => setMetode(item.id)}
                >
                  <input
                    type="radio"
                    checked={metode === item.id}
                    onChange={() => setMetode(item.id)}
                    className="accent-emerald-700"
                  />
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span className="text-gray-800 font-medium">
                      {item.name}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-8 bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-emerald-700 shadow-lg transition-all active:scale-95"
            >
              Bayar {TRANSACTION_DATA.total}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
