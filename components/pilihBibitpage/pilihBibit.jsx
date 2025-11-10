"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import Image from "next/image";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { supabase } from "../../lib/Supabaseclient"; // Sesuaikan path Supabase

export default function TanamPohonPage() {
  const [acara, setAcara] = useState(null);
  const [bibit, setBibit] = useState([]);
  const [keranjang, setKeranjang] = useState({});

  const searchParams = useSearchParams();
  const router = useRouter(); 
  // ✅ PERBAIKAN: Mengambil ID dari URL dengan key 'id_acara'
  const acaraId = searchParams.get("id_acara"); 

  useEffect(() => {
    if (!acaraId) {
            // Jika tidak ada ID, bisa diarahkan kembali atau menampilkan pesan
            console.warn("Tidak ada ID Acara yang ditemukan di URL.");
            // router.push('/donatur/acara'); // Opsi: Redirect kembali
            return;
        }; 

    async function fetchData() {
      // 🔹 Ambil data acara berdasarkan ID
      const { data: acaraData, error: acaraError } = await supabase
        .from("acara_penanaman")
        .select("id, judul_acara, lokasi, tanggal, deskripsi, gambar, komunitas") 
        .eq("id", acaraId)
        .single();

      if (acaraError) {
        console.error("Gagal ambil acara:", acaraError);
        Swal.fire("Error", "Gagal mengambil data acara dari server!", "error");
        return;
      }

      // 🔹 Ambil data bibit pohon
      const { data: bibitData, error: bibitError } = await supabase
        .from("pohon")
        .select("id, nama, harga, gambar");

      if (bibitError) {
        console.error("Gagal ambil bibit:", bibitError);
        Swal.fire("Error", "Gagal mengambil data bibit dari server!", "error");
        return;
      }

      // 💡 Tambahkan data default (target/terkumpul)
      const processedAcara = {
        ...acaraData,
        terkumpul: 50, 
        target: 200, 
        deskripsi: acaraData.deskripsi || "Kontribusi untuk acara penanaman pohon.",
      }

      setAcara(processedAcara);
      setBibit(bibitData);
    }

    fetchData();
  }, [acaraId]);


  const tambah = (item) => {
    setKeranjang((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        jumlah: (prev[item.id]?.jumlah || 0) + 1,
      },
    }));
  };

  const kurang = (item) => {
    setKeranjang((prev) => {
      const jumlahSekarang = prev[item.id]?.jumlah || 0;
      if (jumlahSekarang <= 1) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }
      return {
        ...prev,
        [item.id]: {
          ...item,
          jumlah: jumlahSekarang - 1,
        },
      };
    });
  };

  const totalBibit = Object.values(keranjang).reduce(
    (acc, item) => acc + item.jumlah,
    0
  );
  const totalHarga = Object.values(keranjang).reduce(
    (acc, item) => acc + item.harga * item.jumlah,
    0
  );
  const jenisBibit = Object.values(keranjang)
    .map((item) => `${item.nama} (${item.jumlah}x)`)
    .join(", ") || "-";

  const handleKonfirmasi = () => {
    if (Object.keys(keranjang).length === 0) {
      Swal.fire("Peringatan", "Pilih minimal satu bibit terlebih dahulu!", "warning");
      return;
    }

    // 1. Siapkan data yang akan dikirim ke Pembayaran melalui URL Query
    const totalHargaInt = totalHarga; 
    
    // Format detail: "Nama (Jumlahx) - HargaTotal|Nama (Jumlahx) - HargaTotal|..."
    const bibitDetailString = Object.values(keranjang)
      .map((item) => `${item.nama} (${item.jumlah}x) - ${item.harga * item.jumlah}`) 
      .join("|"); 

    // 2. Buat objek parameter
    const params = new URLSearchParams({
        type: "BIBIT",
        acara: acara.judul_acara,
        lokasi: acara.lokasi,
        total: totalHargaInt,
        bibitDetails: bibitDetailString, 
        komunitas: acara.komunitas || "Komunitas Penghijauan",
        deskripsi: acara.deskripsi,
        id_acara: acara.id, // Tambahkan ID acara 
    }).toString();
    
    // 3. Konfirmasi dari SweetAlert
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      html: `
        <div style="text-align:left">
          <p><b>Nama Acara:</b> ${acara.judul_acara}</p>
          <p><b>Lokasi:</b> ${acara.lokasi}</p>
          <p><b>Total:</b> Rp ${totalHarga.toLocaleString("id-ID")}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Konfirmasi & Kontribusi Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#15803d",
    }).then((result) => {
        if (result.isConfirmed) {
            // 4. Redirect ke halaman Pembayaran
            router.push(`/pembayaran?${params}`);
        }
    });
  };

  if (!acara) return <p className="text-center py-20 text-gray-500">Memuat data...</p>;

  // ... (Testimonial data) ...
  const testimonials = [
    {
      nama: "Jamilah",
      teks: "Program ini sangat bermanfaat untuk lingkungan sekitar. Saya senang bisa berkontribusi.",
    },
    {
      nama: "Andi",
      teks: "Luar biasa! Melihat pohon tumbuh dari hasil donasi saya membuat saya bangga.",
    },
    {
      nama: "Siti",
      teks: "Aksi nyata untuk bumi! Semoga makin banyak yang ikut serta.",
    },
    {
      nama: "Rizky",
      teks: "Donasi mudah, dampak besar. Salut untuk tim penyelenggara!",
    },
  ];

  return (
    <section className="w-full max-w-[1000px] mx-auto px-4 py-10">
      {/* === Info Acara yang diambil dari AcaraDetail === */}
      <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 h-48 rounded-xl relative overflow-hidden">
            {/* ✅ PERBAIKAN: Menggunakan Image component dan properti 'gambar' */}
            <Image
                src={acara.gambar || "/default.jpg"}
                alt={acara.judul_acara}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-emerald-800 mb-3">{acara.judul_acara}</h2> 
          <p className="text-gray-700">
            <span className="font-semibold">Lokasi:</span> {acara.lokasi}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Tanggal Acara:</span> {acara.tanggal}
          </p>
          <p className="text-sm text-gray-600 mt-1">Bibit yang terkumpul</p>
          <div className="w-full bg-gray-200 h-3 overflow-hidden rounded-full max-w-xs">
            <div
              className="bg-emerald-600 h-3"
              style={{ width: `${(acara.terkumpul / acara.target) * 100}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">
            {acara.terkumpul.toLocaleString("id-ID")}/{acara.target.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-emerald-700 mb-2">Pilih Jenis Bibit Pohon</h3>
          <p className="text-gray-500 mb-6">Pilih bibit pohon yang akan ditanam</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bibit.map((item) => {
              const jumlah = keranjang[item.id]?.jumlah || 0;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-3xl overflow-hidden shadow-md border border-emerald-200"
                >
                  <div className="relative w-full h-40 overflow-hidden rounded-b-[20px]">
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="bg-emerald-700 text-white text-center py-4 -mt-4">
                    <h4 className="font-semibold text-[16px]">{item.nama}</h4>
                    <p className="text-sm mt-1">
                      Harga Rp {item.harga.toLocaleString("id-ID")}
                    </p>

                    <div className="flex justify-center items-center mt-3 gap-2">
                      <button
                        onClick={() => kurang(item)}
                        className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                      >
                        -
                      </button>
                      <span className="text-sm">{jumlah}</span>
                      <button
                        onClick={() => tambah(item)}
                        className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        
        <div className="w-full lg:w-[380px]">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Kontribusi</h3>

            <div className="text-[14px] text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Nama Acara</span> : {acara.judul_acara}
              </p>
              <p>
                <span className="font-semibold">Jenis Bibit</span> : {jenisBibit}
              </p>
              <p>
                <span className="font-semibold">Jumlah Bibit</span> : {totalBibit}
              </p>
              <hr className="my-2" />
              <p>
                <span className="font-semibold">Total</span> : Rp{" "}
                {totalHarga.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={handleKonfirmasi}
              disabled={Object.keys(keranjang).length === 0}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white ${
                Object.keys(keranjang).length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Konfirmasi & Kontribusi Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* komen */}
      <div className="relative mt-24 py-20 bg-green-50 overflow-hidden rounded-2xl">
        <h3 className="text-center text-3xl font-semibold text-emerald-800 mb-14">
          Cerita Para Kontributor 🌿
        </h3>

        <motion.div
          className="flex gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={i}
              className="min-w-[280px] bg-white rounded-[2rem] shadow-md p-6 border border-emerald-50"
              style={{
                transform: `rotateY(${(i % 6) * 15 - 45}deg)`,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 0,
                transition: { duration: 0.4 },
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center shadow-inner mb-3">
                  <Image
                    src="/profile-icon.png"
                    alt="profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </div>
                <h4 className="font-semibold text-emerald-700 mb-2">{t.nama}</h4>
                <p className="text-gray-600 italic text-sm leading-relaxed">
                  “{t.teks}”
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}