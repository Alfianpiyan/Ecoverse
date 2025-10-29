"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Users, Leaf, Heart } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";

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
        const { data: acaraData, error: acaraError } = await supabase
          .from("acara_penanaman")
          .select("*")
          .eq("id", id)
          .single();

        if (acaraError) throw acaraError;

        const { data: galeriData } = await supabase
          .from("galeri_acara")
          .select("id, foto_url, caption, created_at")
          .eq("id_acara", id)
          .order("created_at", { ascending: false });

        setEvent(acaraData);
        setGaleri(galeriData || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setErrorMsg("Terjadi kesalahan saat mengambil data acara.");
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
          onClick={() => router.push("/user/acara")}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Kembali ke Daftar Acara
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
    manfaat,
    tim,
  } = event;

  let parsedPJ = [];
  if (Array.isArray(penanggung_jawab)) parsedPJ = penanggung_jawab;
  else if (typeof penanggung_jawab === "string" && penanggung_jawab.length) {
    try {
      parsedPJ = JSON.parse(penanggung_jawab);
      if (!Array.isArray(parsedPJ)) parsedPJ = [];
    } catch {
      parsedPJ = [];
    }
  }

  const manfaatList = Array.isArray(manfaat) && manfaat.length
    ? manfaat
    : ["Menambah penghijauan", "Menjaga kelestarian alam"];

  const galeriList = galeri.length
    ? galeri.map((g) => g.foto_url)
    : [(gambar && typeof gambar === "string" ? gambar : "/default.jpg")];

  const timList = Array.isArray(tim) && tim.length
    ? tim
    : parsedPJ.length
    ? parsedPJ
    : [{ name: "Relawan", role: "Peserta Penanaman" }];

  const statusColor =
    (status || "").toLowerCase() === "sedang berlangsung"
      ? "bg-green-600 text-white"
      : "bg-yellow-400 text-gray-900";

  return (
    <section className="min-h-screen bg-gray-50 py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-700 font-medium mb-8 hover:text-green-900 transition-colors p-2 rounded-lg"
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ====== DETAIL KEGIATAN ====== */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gambar utama */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="w-full h-[300px] md:h-[500px] relative">
                <img
                  src={gambar || "/default.jpg"}
                  alt={judul_acara || "Acara"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#064E3B] leading-tight mb-4">
                {judul_acara || "Judul Acara"}
              </h1>

              {status && (
                <p
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${statusColor} mb-6`}
                >
                  {status}
                </p>
              )}

              <div className="flex flex-wrap gap-x-10 gap-y-4 text-base text-gray-600 border-t border-b border-gray-100 py-4">
                {waktu && (
                  <p className="flex items-center gap-2 font-medium">
                    <Clock size={18} className="text-green-600" /> {waktu}
                  </p>
                )}
                {tanggal && (
                  <p className="flex items-center gap-2 font-medium">
                    <Clock size={18} className="text-green-600" />{" "}
                    {String(tanggal)}
                  </p>
                )}
                {lokasi && (
                  <p className="flex items-center gap-2 font-medium">
                    <MapPin size={18} className="text-green-600" /> {lokasi}
                  </p>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed pt-6">
                {deskripsi || "Belum ada deskripsi untuk acara ini."}
              </p>
            </div>

            {/* Manfaat */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h2 className="text-3xl font-bold text-[#065F46] mb-5 flex items-center gap-3">
                <Leaf size={24} className="text-green-600" /> Manfaat Kegiatan
              </h2>
              <ul className="list-none text-gray-700 space-y-3 pl-0">
                {manfaatList.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl mt-1 font-bold">
                      •
                    </span>
                    <span className="text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Galeri */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h2 className="text-3xl font-bold text-[#065F46] mb-6">
                Galeri Penanaman
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galeriList.map((imgSrc, i) => (
                  <div
                    key={i}
                    className="w-full aspect-square rounded-lg overflow-hidden border border-gray-100"
                  >
                    <img
                      src={imgSrc || "/default.jpg"}
                      alt={`Galeri ${i}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tim / Penanggung Jawab */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h2 className="text-3xl font-bold text-[#065F46] mb-6 flex items-center gap-3">
                <Users size={24} className="text-green-600" /> Tim Penanaman
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.isArray(timList) && timList.length > 0 ? (
                  timList.map((t, i) => {
                    const name =
                      t?.name ?? t?.fullName ?? (typeof t === "string" ? t : "Relawan");
                    const role = t?.role ?? t?.jabatan ?? "Peserta Penanaman";
                    return (
                      <div
                        key={i}
                        className="p-5 bg-green-50/50 border border-green-300 rounded-xl"
                      >
                        <p className="font-bold text-lg text-[#064E3B]">
                          {name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{role}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Belum ada penanggung jawab.</p>
                )}
              </div>
            </div>
          </div>

          {/* ====== SIDEBAR ====== */}
          <div className="lg:col-span-1 space-y-6 sticky top-8 h-fit">
            <div className="bg-green-100 p-8 rounded-2xl text-gray-800 border border-green-300">
              <div className="text-center">
                <Leaf size={48} className="mx-auto mb-4 text-[#064E3B]" />
                <h3 className="text-3xl font-extrabold mb-2 text-[#064E3B]">
                  Tanamkan Kebaikan!
                </h3>
                <p className="text-gray-600 mb-6 text-base font-normal max-w-xs mx-auto">
                  Donasi Anda membantu mewujudkan aksi nyata untuk bumi.
                </p>

                {/* 🟢 Tombol Donasi Sekarang */}
                <button
                  onClick={() => router.push(`/user/tanam?id_acara=${id}`)}
                  className="w-full bg-[#15803D] hover:bg-[#065F46] text-white font-bold text-lg px-6 py-3 rounded-xl transition"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Heart size={20} fill="white" stroke="none" /> Donasi Sekarang
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Informasi Cepat
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                ID Acara:{" "}
                <span className="font-semibold text-gray-800">#{id}</span>
              </p>
              <p className="text-sm text-gray-600">
                Tanggal:{" "}
                <span className="font-semibold text-gray-800">
                  {tanggal || "-"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Lokasi:{" "}
                <span className="font-semibold text-gray-800">
                  {lokasi || "-"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
