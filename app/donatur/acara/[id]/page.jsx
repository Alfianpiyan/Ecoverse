"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Leaf,
  TreeDeciduous,
  Heart,
  Target,
} from "lucide-react";
import { supabase } from "@/lib/Supabaseclient";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function AcaraDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [galeri, setGaleri] = useState([]);
  const [bibitDetailList, setBibitDetailList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Ambil data utama acara, galeri, dan bibit
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        // 🔸 Ambil data acara
        const { data: acara, error: acaraErr } = await supabase
          .from("acara_penanaman")
          .select(
            "id, judul_acara, deskripsi, lokasi, tanggal, waktu, gambar, penanggung_jawab, status, jenis_bibit, jumlah_bibit"
          )
          .eq("id", id)
          .single();

        if (acaraErr) throw acaraErr;

        setEvent(acara);

        // 🔸 Ambil galeri acara
        const { data: galeriData } = await supabase
          .from("galeri_acara")
          .select("id, foto_url, caption, created_at")
          .eq("id_acara", id)
          .order("created_at", { ascending: false });

        setGaleri(galeriData || []);

        // 🔸 Ambil detail bibit (jika ada)
        if (acara?.jenis_bibit?.length) {
          let bibitIDs = acara.jenis_bibit;

          // pastikan array of id
          if (typeof bibitIDs === "string") {
            try {
              bibitIDs = JSON.parse(bibitIDs);
            } catch {
              bibitIDs = bibitIDs.split(",").map((v) => v.trim());
            }
          }

          const { data: bibitData, error: bibitErr } = await supabase
            .from("pohon")
            .select("id, nama, harga, gambar")
            .in("id", bibitIDs);

          if (!bibitErr) setBibitDetailList(bibitData || []);
        }
      } catch (err) {
        console.error("❌ Gagal mengambil data acara:", err);
        setErrorMsg("Terjadi kesalahan saat mengambil data acara.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔹 Loading / Error states
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat data acara...
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 bg-gray-50 p-6">
        <p className="text-lg mb-3">{errorMsg || "Acara tidak ditemukan 😢"}</p>
        <button
          onClick={() => router.push("/donatur/acara")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Kembali
        </button>
      </div>
    );

  // 🔹 Destructuring data
  const {
    id: id_acara,
    judul_acara,
    deskripsi,
    lokasi,
    tanggal,
    waktu,
    gambar,
    penanggung_jawab,
    status,
    jenis_bibit,
    jumlah_bibit,
  } = event;

  // 🔹 Format penanggung jawab
  let pjList = [];
  if (typeof penanggung_jawab === "string") {
    try {
      pjList = JSON.parse(penanggung_jawab);
    } catch {
      pjList = penanggung_jawab.split(",").map((n) => ({ name: n.trim() }));
    }
  } else if (Array.isArray(penanggung_jawab)) {
    pjList = penanggung_jawab;
  }

  // 🔹 Format status color
  const statusColor =
    status?.toLowerCase() === "akan datang"
      ? "bg-yellow-500"
      : status?.toLowerCase() === "selesai"
      ? "bg-blue-600"
      : "bg-green-600";

  const galeriList =
    galeri?.length > 0
      ? galeri.map((g) => g.foto_url)
      : [gambar || "/default.jpg"];

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* 🔙 Tombol kembali */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 text-green-700 font-medium hover:text-green-900"
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        {/* 🔹 Header Acara */}
        <div className="bg-white p-8 rounded-3xl border shadow-md mb-10">
          <h1 className="text-4xl font-extrabold text-[#064E3B] mb-2">
            {judul_acara}
          </h1>
          <span
            className={`inline-block ${statusColor} text-white px-4 py-1 rounded-full text-sm font-semibold`}
          >
            {status}
          </span>

          <div className="flex flex-wrap gap-6 mt-4 text-gray-700 border-t border-b py-4">
            <span className="flex items-center gap-2">
              <MapPin className="text-green-600" size={18} /> {lokasi}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="text-green-600" size={18} /> {waktu}
            </span>
            <span className="flex items-center gap-2">
              <TreeDeciduous className="text-green-600" size={18} />{" "}
              {formatDate(tanggal)}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 🔹 Kolom kiri (konten utama) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gambar utama */}
            <div className="overflow-hidden rounded-2xl border">
              <img
                src={gambar || "/default.jpg"}
                alt={judul_acara}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Ringkasan */}
            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <h2 className="text-2xl font-bold text-[#065F46] mb-3">
                Ringkasan Kegiatan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {deskripsi || "Belum ada deskripsi untuk acara ini."}
              </p>
            </div>

            {/* Target Bibit */}
            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <h2 className="text-2xl font-bold text-[#065F46] mb-4 flex items-center gap-2">
                <Target size={22} className="text-green-600" /> Detail Target Bibit
              </h2>

              <div className="p-5 bg-green-50 border border-green-300 rounded-xl mb-4">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Leaf className="text-green-700" size={18} /> Jumlah Target
                </p>
                <p className="text-3xl font-bold text-[#064E3B] mt-1">
                  {jumlah_bibit
                    ? `${Number(jumlah_bibit).toLocaleString()} Pohon`
                    : "Belum ditentukan"}
                </p>
              </div>

              {/* List Bibit */}
              {bibitDetailList.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {bibitDetailList.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border border-green-200 rounded-xl shadow-sm p-3 flex flex-col items-center"
                    >
                      <img
                        src={b.gambar || "/default-bibit.jpg"}
                        alt={b.nama}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <p className="font-semibold text-green-800">{b.nama}</p>
                      <p className="text-sm text-gray-600">
                        Rp {b.harga?.toLocaleString() || "-"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Belum ada data bibit tersedia.
                </p>
              )}
            </div>

            {/* Penanggung Jawab */}
<div className="bg-white p-8 rounded-2xl border shadow-sm">
  <h2 className="text-2xl font-bold text-[#065F46] mb-4 flex items-center gap-2">
    <Users size={22} className="text-green-600" /> Penanggung Jawab
  </h2>

  {(() => {
    let list = [];

    // 1. Jika data string dipisah koma: "Budi, Siti"
    if (typeof penanggung_jawab === "string") {
      try {
        // Coba parse dulu (kalau ternyata JSON)
        const parsed = JSON.parse(penanggung_jawab);
        if (Array.isArray(parsed)) list = parsed;
      } catch {
        // Kalau bukan JSON → split by comma
        list = penanggung_jawab.split(",").map((v) => v.trim());
      }
    }

    // 2. Jika array (langsung)
    else if (Array.isArray(penanggung_jawab)) {
      list = penanggung_jawab;
    }

    return list.length ? (
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-green-50 border border-green-300 rounded-xl"
          >
            {/* Jika item adalah string → tampilkan langsung */}
            {typeof item === "string" ? (
              <p className="font-bold text-[#064E3B]">{item}</p>
            ) : (
              <>
                <p className="font-bold text-[#064E3B]">
                  {item.name || "Tanpa Nama"}
                </p>
                <p className="text-sm text-gray-600">
                  {item.role || ""}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">Belum ada penanggung jawab.</p>
    );
  })()}
</div>


            {/* Galeri */}
            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <h2 className="text-2xl font-bold text-[#065F46] mb-4">
                Galeri Penanaman
              </h2>
              {galeriList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galeriList.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Galeri ${i}`}
                      className="rounded-lg object-cover h-32 w-full hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Belum ada dokumentasi.</p>
              )}
            </div>
          </div>

          {/* 🔹 Kolom kanan (Donasi + Info Cepat) */}
          <div className="space-y-6">
            <div className="bg-green-100 p-8 rounded-2xl border border-green-300 text-center shadow-md">
              <Heart
                size={48}
                fill="#064E3B"
                stroke="none"
                className="mx-auto mb-3"
              />
              <h3 className="text-2xl font-extrabold text-[#064E3B] mb-2">
                Dukung Aksi Hijau!
              </h3>
              <p className="text-gray-600 mb-5">
                Donasi Anda akan menjadi bibit nyata untuk kelestarian
                lingkungan di {lokasi}.
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/donatur/pilihbibit?id_acara=${id_acara}&judul=${encodeURIComponent(
                      judul_acara
                    )}&lokasi=${encodeURIComponent(
                      lokasi
                    )}&tanggal=${encodeURIComponent(
                      tanggal
                    )}&gambar=${encodeURIComponent(
                      gambar || ""
                    )}&deskripsi=${encodeURIComponent(deskripsi || "")}`
                  )
                }
                className="w-full bg-[#15803D] hover:bg-[#065F46] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
              >
                <Leaf size={20} fill="white" /> Donasi Sekarang
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h4 className="text-lg font-bold border-b pb-2 mb-4">
                Informasi Cepat
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span>ID Acara:</span> <b>#{id_acara}</b>
                </li>
                <li className="flex justify-between">
                  <span>Tanggal:</span> <b>{formatDate(tanggal)}</b>
                </li>
                <li className="flex justify-between">
                  <span>Waktu:</span> <b>{waktu}</b>
                </li>
                <li className="flex justify-between">
                  <span>Lokasi:</span> <b>{lokasi}</b>
                </li>
                <li className="flex justify-between">
                  <span>Status:</span>{" "}
                  <span
                    className={`${statusColor} text-white text-xs px-2 py-0.5 rounded-full`}
                  >
                    {status}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
