"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/Supabaseclient";
import Swal from "sweetalert2";

export default function TransaksiBibit() {
  const [bibitData, setBibitData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [metode, setMetode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("selectedBibit");
      if (stored) setBibitData(JSON.parse(stored));
    } catch (error) {
      console.error("Gagal parsing bibit:", error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const email = sessionData?.session?.user?.email;
        if (!email) return setLoading(false);

        const { data: user } = await supabase
          .from("users")
          .select("nama_pic, email, no_telepon")
          .eq("email", email)
          .single();

        setUserData(user || null);
      } catch (err) {
        console.error("Gagal ambil user:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!bibitData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat detail bibit...
      </div>
    );
  }

  const TRANSACTION = {
    title: bibitData.acara_nama,
    lokasi: bibitData.lokasi,
    date: bibitData.tanggal,
    price: bibitData.total_harga,
    detailList: bibitData.detail_bibit || [],
  };

  const handlePayment = async () => {
    if (!metode) {
      return Swal.fire({
        icon: "error",
        title: "Metode belum dipilih",
        text: "Pilih metode pembayaran dulu ya!",
        confirmButtonColor: "#16a34a",
      });
    }

    const confirm = await Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: `Bayar total ${TRANSACTION.price}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Bayar Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const transaksi = {
      id: Date.now(),
      type: "DONASI_BIBIT",
      metode,
      tanggal: new Date().toLocaleString("id-ID"),
      user: userData,
      bibit: bibitData,
      total: TRANSACTION.price,
    };

    const history = JSON.parse(localStorage.getItem("riwayatBibit")) || [];
    localStorage.setItem("riwayatBibit", JSON.stringify([...history, transaksi]));

    Swal.fire({
      icon: "success",
      title: "Pembayaran Berhasil!",
      text: "Transaksi donasi bibit kamu telah disimpan.",
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
        
        <div className="flex flex-col gap-6">
          <Card title="🌱 Detail Donasi Bibit">
            <p className="text-gray-700">
              <b>Acara:</b> {TRANSACTION.title}
            </p>
            <p className="text-gray-700">
              <b>Lokasi:</b> {TRANSACTION.lokasi}
            </p>
            <p className="text-gray-700">
              <b>Tanggal:</b> {TRANSACTION.date}
            </p>

            <div className="mt-4 border-t pt-3">
              <h4 className="font-semibold text-emerald-800 mb-2">Detail Bibit:</h4>
              {TRANSACTION.detailList.map((item, i) => (
                <p key={i} className="text-gray-700">
                  • {item.nama} — Rp{item.harga}
                </p>
              ))}
            </div>
          </Card>

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

        <div className="flex flex-col gap-6">
          <Card title="Total Pembayaran">
            <p className="text-xl font-bold text-emerald-700">Rp {TRANSACTION.price}</p>
          </Card>

          <Card title="Pilih Metode Pembayaran">
            <div className="space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                    metode === m.id
                      ? "border-emerald-600 bg-emerald-50 shadow-md scale-[1.02]"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setMetode(m.id)}
                >
                  <input
                    type="radio"
                    checked={metode === m.id}
                    onChange={() => setMetode(m.id)}
                    className="accent-emerald-700"
                  />
                  <Image src={m.logo} alt={m.name} width={32} height={32} />
                  <span className="font-medium text-gray-800">{m.name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-8 bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-emerald-700"
            >
              Bayar Sekarang
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
}


function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-4 text-emerald-800">{title}</h2>
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
