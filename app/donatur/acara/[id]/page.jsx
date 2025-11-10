"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Users, Leaf, TreeDeciduous, Heart, Target } from "lucide-react";
import { supabase } from "@/lib/Supabaseclient";

// Helper function untuk format tanggal ke format Indonesia
const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    date.setHours(date.getHours()); // Penyesuaian zona waktu jika diperlukan
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
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        // Ambil semua kolom yang relevan
        const { data: acaraData, error: acaraError } = await supabase
          .from("acara_penanaman")
          .select(
            "judul_acara, deskripsi, lokasi, tanggal, waktu, gambar, penanggung_jawab, status, jenis_bibit, jumlah_bibit"
          )
          .eq("id", id)
          .single();

        if (acaraError) throw acaraError;

        // Ambil data galeri
        const { data: galeriData } = await supabase
          .from("galeri_acara")
          .select("id, foto_url, caption, created_at")
          .eq("id_acara", id)
          .order("created_at", { ascending: false });

        setEvent(acaraData);
        setGaleri(galeriData || []);
      } catch (err) {
        console.error("Gagal mengambil data acara:", err);
        setErrorMsg("Terjadi kesalahan saat mengambil data acara. Mungkin ID acara tidak valid.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Memuat data acara...</p>
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-700 p-8">
        <p className="text-xl font-medium mb-4">
          {errorMsg || "Acara tidak ditemukan 😢"}
        </p>
        <button
          onClick={() => router.push("/donatur/acara")}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="inline mr-2"/> Kembali ke Daftar Acara
        </button>
      </div>
    );

  const {
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

  // --- LOGIKA PENGOLAHAN DATA ---

  // Mengolah penanggung_jawab (dari array string atau JSON string)
  let parsedPJ = [];
  if (Array.isArray(penanggung_jawab)) {
      parsedPJ = penanggung_jawab;
  } else if (typeof penanggung_jawab === "string" && penanggung_jawab.length) {
      try { parsedPJ = JSON.parse(penanggung_jawab); } catch { /* ignore */ }
      if (!Array.isArray(parsedPJ)) {
        parsedPJ = penanggung_jawab.split(",").map(n => n.trim()).filter(Boolean);
      }
  }
  
  // Konversi array nama menjadi format objek untuk tampilan
  const pjList = parsedPJ.map(p => typeof p === 'string' ? { name: p, role: "Penanggung Jawab" } : p);

  // Mengolah jenis bibit
  const bibitList = Array.isArray(jenis_bibit) && jenis_bibit.length
    ? jenis_bibit
    : ["Jenis bibit belum ditentukan"];

  // Mengolah galeri
  const galeriList = galeri.length
    ? galeri.map((g) => g.foto_url)
    : (gambar && typeof gambar === "string" ? [gambar] : ["/default.jpg"]);

  // Status color
  const statusColor =
    (status || "").toLowerCase() === "akan datang"
      ? "bg-yellow-500 text-white"
      : (status || "").toLowerCase() === "selesai"
      ? "bg-blue-600 text-white"
      : "bg-green-600 text-white"; // Default: sedang berlangsung

  // --- TAMPILAN (RETURN) ---
  return (
    <section className="min-h-screen bg-gray-50 py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-700 font-medium mb-8 hover:text-green-900 transition-colors p-2 rounded-lg bg-white shadow-sm border border-gray-200"
        >
          <ArrowLeft size={20} /> Kembali
        </button>
        
        {/* HEADER SECTION */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-lg mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#064E3B] leading-tight mb-4">
                {judul_acara || "Judul Acara"}
            </h1>
            {status && (
                <p
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase ${statusColor} mb-6 tracking-wide`}
                >
                    {status}
                </p>
            )}

            {/* QUICK INFO BAR */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-base text-gray-600 border-t border-b border-gray-100 py-4">
                <div className="flex items-center gap-2 font-medium">
                    <MapPin size={18} className="text-green-600" />
                    <span className="font-semibold text-gray-700">{lokasi || "Lokasi Tidak Tersedia"}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                    <Clock size={18} className="text-green-600" />
                    <span className="font-semibold text-gray-700">{waktu || "-"}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                    <TreeDeciduous size={18} className="text-green-600" />
                    <span className="font-semibold text-gray-700">
                        {formatDate(tanggal) || "-"}
                    </span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ====== DETAIL KEGIATAN (2/3 lebar) ====== */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gambar utama */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md">
              <div className="w-full h-[300px] md:h-[500px] relative">
                <img
                  src={gambar || "/default.jpg"}
                  alt={judul_acara || "Gambar Acara"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-md">
              <h2 className="text-3xl font-bold text-[#065F46] mb-4">
                Ringkasan Kegiatan
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {deskripsi || "Belum ada deskripsi untuk acara ini."}
              </p>
            </div>

            {/* Detail Bibit */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-md">
                <h2 className="text-3xl font-bold text-[#065F46] mb-5 flex items-center gap-3">
                    <Target size={24} className="text-green-600" /> Detail Target Bibit
                </h2>
                <div className="space-y-4">
                    {/* Jumlah Target */}
                    <div className="p-5 bg-green-50/50 border border-green-300 rounded-xl">
                        <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <Leaf size={18} className="text-green-700"/> Jumlah Target Penanaman
                        </p>
                        <p className="font-extrabold text-3xl text-[#064E3B] mt-1">
                            {jumlah_bibit ? `${Number(jumlah_bibit).toLocaleString()} Pohon` : "Target Belum Ditetapkan"}
                        </p>
                    </div>

                    {/* Jenis Bibit */}
                    <div className="p-5 bg-green-50/50 border border-green-300 rounded-xl">
                        <p className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                            <TreeDeciduous size={18} className="text-green-700"/> Jenis Bibit yang Ditargetkan
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {bibitList.map((bibit, i) => (
                                <span 
                                    key={i} 
                                    className="bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full"
                                >
                                    {bibit}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tim / Penanggung Jawab */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-md">
              <h2 className="text-3xl font-bold text-[#065F46] mb-6 flex items-center gap-3">
                <Users size={24} className="text-green-600" /> Penanggung Jawab Acara
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {pjList.length > 0 ? (
                  pjList.map((t, i) => (
                    <div
                      key={i}
                      className="p-5 bg-green-50/50 border border-green-300 rounded-xl"
                    >
                      <p className="font-bold text-lg text-[#064E3B]">{t.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{t.role}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Belum ada penanggung jawab yang tercatat.</p>
                )}
              </div>
            </div>

            {/* Galeri (Foto) */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-md">
              <h2 className="text-3xl font-bold text-[#065F46] mb-6">
                Galeri Penanaman (Hasil/Dokumentasi)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galeriList.length > 1 || (galeriList.length === 1 && galeriList[0] !== "/default.jpg") ? (
                    galeriList.map((imgSrc, i) => (
                        <div
                            key={i}
                            className="w-full aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm"
                        >
                            <img
                                src={imgSrc || "/default.jpg"}
                                alt={`Galeri ${i}`}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">Belum ada foto dokumentasi di galeri.</p>
                )}
              </div>
            </div>
            
          </div>

          {/* ====== SIDEBAR (1/3 lebar) ====== */}
          {/* Menggunakan sticky top-2 untuk perilaku "sticky" yang lebih cepat */}
          <div className="lg:col-span-1 space-y-6 sticky top-2 h-fit pb-8"> 
            
            {/* Donasi Card */}
            <div className="bg-green-100 p-8 rounded-2xl text-gray-800 border border-green-300 shadow-xl">
              <div className="text-center">
                <Heart size={48} fill="#064E3B" stroke="none" className="mx-auto mb-4" />
                <h3 className="text-3xl font-extrabold mb-2 text-[#064E3B]">
                  Dukung Aksi Hijau!
                </h3>
                <p className="text-gray-600 mb-6 text-base font-normal max-w-xs mx-auto">
                  Donasi Anda menjadi bibit nyata untuk kelestarian lingkungan di {lokasi}.
                </p>

                {/* 🟢 Tombol Donasi Sekarang */}
                <button
                  onClick={() => router.push(`/donatur/tanam?id_acara=${id}`)}
                  className="w-full bg-[#15803D] hover:bg-[#065F46] text-white font-bold text-lg px-6 py-3 rounded-xl transition shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Leaf size={20} fill="white" stroke="none" /> Donasi Sekarang
                  </div>
                </button>
              </div>
            </div>

            {/* Info Cepat Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
              <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Informasi Cepat
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">ID Acara:</span>
                    <span className="font-semibold text-gray-800">#{id}</span>
                </li>
                <li className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">Tanggal:</span>
                    <span className="font-semibold text-gray-800">
                        {formatDate(tanggal)}
                    </span>
                </li>
                <li className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">Waktu:</span>
                    <span className="font-semibold text-gray-800">
                        {waktu || "-"}
                    </span>
                </li>
                <li className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">Lokasi:</span>
                    <span className="font-semibold text-gray-800">
                        {lokasi || "-"}
                    </span>
                </li>
                <li className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">Status:</span>
                    <span className={`font-semibold text-xs py-0.5 px-2 rounded-full text-white ${statusColor}`}>
                        {status || "-"}
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