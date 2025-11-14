"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { supabase } from "../../lib/Supabaseclient";
import Link from "next/link";

export default function TanamPohonPage() {
  const [acara, setAcara] = useState(null);
  const [pohonList, setPohonList] = useState([]);
  const [keranjang, setKeranjang] = useState({});
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const acaraId = searchParams.get("id_acara");

  useEffect(() => {
    if (!acaraId || acaraId === "null") {
      Swal.fire({
        title: "ID Acara Tidak Ditemukan!",
        text: "Pastikan kamu membuka halaman dari acara yang valid.",
        icon: "warning",
      });
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("🔍 ID Acara dari URL:", acaraId);

        let query = supabase.from("acara_penanaman").select(
          "id, judul_acara, lokasi, tanggal, waktu, deskripsi, gambar, jenis_bibit, jumlah_bibit"
        );

        if (acaraId.includes("-")) {
          query = query.eq("id", acaraId); 
        } else if (!isNaN(parseInt(acaraId))) {
          query = query.eq("id", parseInt(acaraId)); 
        } else {
          throw new Error("Format ID acara tidak valid.");
        }

        const { data: acaraDetail, error: acaraError } = await query.single();
        if (acaraError) throw acaraError;
        if (!acaraDetail) throw new Error("Data acara tidak ditemukan.");

        let jenisBibitIds = [];
        if (Array.isArray(acaraDetail.jenis_bibit)) {
          jenisBibitIds = acaraDetail.jenis_bibit;
        } else if (typeof acaraDetail.jenis_bibit === "string" && acaraDetail.jenis_bibit.trim()) {
          try {
            const parsed = JSON.parse(acaraDetail.jenis_bibit);
            if (Array.isArray(parsed)) jenisBibitIds = parsed;
            else jenisBibitIds = acaraDetail.jenis_bibit.split(",").map((x) => x.trim());
          } catch {
            jenisBibitIds = acaraDetail.jenis_bibit.split(",").map((x) => x.trim());
          }
        }

        if (jenisBibitIds.length > 0) {
          const { data: pohonData, error: pohonError } = await supabase
            .from("pohon")
            .select("id, nama")
            .in("nama", jenisBibitIds);

          if (pohonError) throw pohonError;

          jenisBibitIds = pohonData.map((p) => p.id);
        }

        let pohonQuery = supabase.from("pohon").select("id, nama, harga, gambar").order("id");
        if (jenisBibitIds.length > 0) pohonQuery = pohonQuery.in("id", jenisBibitIds);

        const { data: pohonData, error: pohonError2 } = await pohonQuery;
        if (pohonError2) throw pohonError2;

        setAcara(acaraDetail);
        setPohonList(pohonData || []);
      } catch (err) {
        console.error("❌ Error fetchData:", err);
        Swal.fire({
          title: "Terjadi Kesalahan!",
          text: err.message || "Coba muat ulang halaman.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [acaraId]);

  const tambah = (item) => {
    setKeranjang((prev) => ({
      ...prev,
      [item.id]: { ...item, jumlah: (prev[item.id]?.jumlah || 0) + 1 },
    }));
  };

  const kurang = (item) => {
    setKeranjang((prev) => {
      const jumlah = prev[item.id]?.jumlah || 0;
      if (jumlah <= 1) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }
      return { ...prev, [item.id]: { ...item, jumlah: jumlah - 1 } };
    });
  };

  // === Hitung total bibit & harga ===
  const totalBibit = Object.values(keranjang).reduce((a, i) => a + i.jumlah, 0);
  const totalHarga = Object.values(keranjang).reduce((a, i) => a + i.harga * i.jumlah, 0);
  const jenisBibit = Object.values(keranjang)
    .map((i) => `${i.nama} (${i.jumlah}x)`)
    .join(", ") || "-";

  // === Konfirmasi Donasi ===
  const handleKonfirmasi = () => {
    if (Object.keys(keranjang).length === 0) {
      Swal.fire("Peringatan", "Pilih minimal satu bibit terlebih dahulu!", "warning");
      return;
    }

    Swal.fire({
      title: "Konfirmasi Donasi",
      html: `
        <div style="text-align:left">
          <p><b>Acara:</b> ${acara.judul_acara}</p>
          <p><b>Lokasi:</b> ${acara.lokasi}</p>
          <p><b>Jumlah Bibit:</b> ${totalBibit} pohon</p>
          <p><b>Total Donasi:</b> Rp ${totalHarga.toLocaleString("id-ID")}</p>
        </div>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Konfirmasi & Lanjut ke Pembayaran",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedBibit = {
          type: "DONASI_BIBIT",
          acara_id: acara.id,
          acara_nama: acara.judul_acara,
          gambar_acara: acara.gambar,
          lokasi: acara.lokasi,
          total_bibit: totalBibit,
          total_harga: totalHarga,
          total_harga: totalHarga,
          detail_bibit: Object.values(keranjang),
          tanggal: new Date().toLocaleString("id-ID"),
        };

        localStorage.setItem("selectedBibit", JSON.stringify(selectedBibit));

        Swal.fire({
          icon: "success",
          title: "Donasi Disimpan!",
          text: "Data donasi bibit kamu sudah tersimpan dan siap dibayar.",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          router.push(`/donatur/pembayaran?id_acara=${acara.id}`);
        });
      }
    });
  };

  // === Loading State ===
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat data...
      </div>
    );

  // === Jika data acara tidak ada ===
  if (!acara)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Data acara tidak ditemukan.
      </div>
    );

  // === Tampilan utama ===
  return (
    <section className="w-full max-w-[1000px] mx-auto px-4 py-10">
      {/* Detail Acara */}
      <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 h-48 rounded-xl relative overflow-hidden">
          <Image
            src={acara.gambar || "/default.jpg"}
            alt={acara.judul_acara}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-emerald-800 mb-3">{acara.judul_acara}</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Lokasi:</span> {acara.lokasi}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Tanggal:</span>{" "}
            {new Date(acara.tanggal).toLocaleDateString("id-ID")}
          </p>
          <p className="text-gray-700 mb-4">{acara.deskripsi}</p>
        </div>
      </div>

      {/* Pilih Bibit */}
      <div className="mt-16 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-emerald-700 mb-2">Pilih Jenis Bibit Pohon</h3>
          <p className="text-gray-500 mb-6">Pilih bibit yang akan kamu donasikan</p>

          {pohonList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Tidak ada bibit tersedia saat ini.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pohonList.map((item) => {
                const jumlah = keranjang[item.id]?.jumlah || 0;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-3xl overflow-hidden shadow-md border border-emerald-200"
                  >
                    <div className="relative w-full h-40 overflow-hidden rounded-b-[20px]">
                      <Image
                        src={item.gambar || "/default.jpg"}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="bg-emerald-700 text-white text-center py-4 -mt-4">
                      <h4 className="font-semibold">{item.nama}</h4>
                      <p className="text-sm mt-1">
                        Rp {item.harga?.toLocaleString("id-ID")}
                      </p>

                      <div className="flex justify-center items-center mt-3 gap-2">
                        <button
                          onClick={() => kurang(item)}
                          className="bg-emerald-500 px-3 py-1 rounded-full text-xs"
                        >
                          -
                        </button>
                        <span className="text-sm">{jumlah}</span>
                        <button
                          onClick={() => tambah(item)}
                          className="bg-emerald-500 px-3 py-1 rounded-full text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ringkasan Donasi */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Donasi</h3>

            <div className="text-[14px] text-gray-700 space-y-2">
              <p><b>Nama Acara:</b> {acara.judul_acara}</p>
              <p><b>Jenis Bibit:</b> {jenisBibit}</p>
              <p><b>Jumlah Bibit:</b> {totalBibit}</p>
              <hr className="my-2" />
              <p><b>Total:</b> Rp {totalHarga.toLocaleString("id-ID")}</p>
            </div>

            <button
              onClick={handleKonfirmasi}
              disabled={!Object.keys(keranjang).length}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white ${
                !Object.keys(keranjang).length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Konfirmasi & Kontribusi Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
