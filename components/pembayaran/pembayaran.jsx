"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/Supabaseclient";
import Swal from "sweetalert2";

export default function PembayaranLangganan() {
  const [planData, setPlanData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [metode, setMetode] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data paket dari localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("selectedPlan");
      if (storedPlan) setPlanData(JSON.parse(storedPlan));
    } catch (error) {
      console.error("Gagal parsing plan:", error);
    }
  }, []);

  // 🔹 Ambil data user dari Supabase
  useEffect(() => {
    (async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const email = sessionData?.session?.user?.email;
        if (!email) return setLoading(false);

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
    })();
  }, []);

  // 🔹 Jika belum ada plan data
  if (!planData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat detail langganan...
      </div>
    );
  }

  const TRANSACTION = {
    title: planData.title,
    desc: planData.desc,
    per: planData.per,
    price: planData.price,
    details: [
      { label: "Paket", value: planData.title },
      { label: "Harga", value: planData.price },
      { label: "Periode", value: planData.per },
    ],
  };

  // 🔹 Simpan transaksi
  const handlePayment = async () => {
    if (!metode) {
      return Swal.fire({
        icon: "error",
        title: "Metode belum dipilih",
        text: "Pilih salah satu metode pembayaran sebelum lanjut ya!",
        confirmButtonColor: "#16a34a",
      });
    }

    const confirm = await Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: `Bayar ${TRANSACTION.price} untuk paket ${TRANSACTION.title}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, bayar sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const transaksi = {
      id: Date.now(),
      plan: TRANSACTION.title,
      total: TRANSACTION.price,
      metode,
      tanggal: new Date().toLocaleString("id-ID"),
      user: userData,
    };

    const history = JSON.parse(localStorage.getItem("riwayatLangganan")) || [];
    localStorage.setItem("riwayatLangganan", JSON.stringify([...history, transaksi]));

    Swal.fire({
      icon: "success",
      title: "Pembayaran Berhasil!",
      text: `Transaksi kamu untuk paket ${TRANSACTION.title} sudah disimpan.`,
      confirmButtonColor: "#16a34a",
    });
  };

  const PAYMENT_METHODS = [
    { id: "bca", name: "BCA Mobile", logo: "/bca.png" },
    { id: "dana", name: "Dana", logo: "/dana.png" },
    { id: "bri", name: "BRI Mobile", logo: "/bri.png" },
    { id: "linkaja", name: "Link Aja", logo: "/linkaja.png" },
  ];

  return (
    <section className="min-h-screen bg-white flex items-start justify-center py-16 px-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        {/* === KIRI === */}
        <div className="flex flex-col gap-6">
          {/* Detail Paket */}
          <Card title="💎 Detail Paket">
            <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-emerald-700 font-semibold">
              Logo {TRANSACTION.title}
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              {TRANSACTION.desc}
            </p>
          </Card>

          {/* Data Anda */}
          <Card title="👤 Data Anda">
            {loading ? (
              <p className="text-gray-500">Memuat data pengguna...</p>
            ) : userData ? (
              <div className="space-y-3">
                <UserField label="Nama PIC" value={userData.nama_pic} />
                <UserField label="Email" value={userData.email} />
                <UserField label="No. HP" value={userData.no_telepon || "-"} />
              </div>
            ) : (
              <p className="text-gray-500">Data pengguna tidak ditemukan.</p>
            )}
          </Card>
        </div>

        {/* === KANAN === */}
        <div className="flex flex-col gap-6">
          {/* Detail Langganan */}
          <Card title="Detail Langganan">
            <div className="space-y-2 text-gray-700 pb-3 border-b border-gray-100">
              {TRANSACTION.details.map((d, i) => (
                <p key={i}>
                  <span className="font-medium text-emerald-800">{d.label}:</span> {d.value}
                </p>
              ))}
            </div>
            <div className="pt-3 flex justify-between items-center">
              <span className="font-medium text-emerald-800">Total:</span>
              <span className="text-emerald-700 font-bold text-xl">{TRANSACTION.price}</span>
            </div>
          </Card>

          {/* Pilih Metode */}
          <Card title="Pilih Metode Pembayaran">
            <div className="space-y-3">
              {PAYMENT_METHODS.map((item) => (
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
                    <Image src={item.logo} alt={item.name} width={32} height={32} className="rounded-md" />
                    <span className="text-gray-800 font-medium">{item.name}</span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-8 bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-emerald-700 shadow-lg transition-all active:scale-95"
            >
              Bayar {TRANSACTION.price}
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* === COMPONENT MINI === */
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-4 text-emerald-800 flex items-center gap-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function UserField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
