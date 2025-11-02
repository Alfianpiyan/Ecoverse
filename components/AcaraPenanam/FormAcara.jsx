"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/lib/Supabaseclient";
import { BibitTagInput } from "./BibitTagInput/BibitTagInput";

export default function FormAcara() {
  // 🔹 State utama form
  const [form, setForm] = useState({
    judul_acara: "",
    lokasi: "",
    tanggal: "",
    jenis_bibit: [],
    jumlah_bibit: "",
    deskripsi: "",
    gambar: null,
    penanggung_jawab: [], // array of string
  });

  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("Tidak ada gambar yang dipilih");

  // 🔹 Handler umum
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handler jenis bibit (tag input)
  const handleBibitTagsChange = useCallback((tagsArray) => {
    setForm((prev) => ({
      ...prev,
      jenis_bibit: tagsArray,
    }));
  }, []);

  // 🔹 Handler gambar (upload preview)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, gambar: file }));
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, gambar: null }));
      setFileName("Tidak ada gambar yang dipilih");
      setPreview("");
    }
  };

  // 🔹 Handler penanggung jawab (string → array)
  const handlePenanggungJawabChange = (e) => {
    const { value } = e.target;
    const namaArray = value
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    setForm((prev) => ({
      ...prev,
      penanggung_jawab: namaArray,
    }));
  };

  // 🔹 Submit ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1️⃣ Ambil user aktif
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Gagal ambil data user");

      // 2️⃣ Upload gambar ke bucket Supabase
      let imageUrl = null;
      if (form.gambar) {
        const fileExt = form.gambar.name.split(".").pop();
        const uploadFileName = `${Date.now()}.${fileExt}`;
        const filePath = `acara/${uploadFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gambar_acara")
          .upload(filePath, form.gambar);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("gambar_acara")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData?.publicUrl ?? null;
      }

      // 3️⃣ Siapkan data untuk insert
      const payload = {
        judul_acara: form.judul_acara,
        lokasi: form.lokasi,
        tanggal: form.tanggal,
        jumlah_bibit:
          form.jumlah_bibit !== "" ? parseInt(form.jumlah_bibit, 10) : null,
        jenis_bibit: form.jenis_bibit, // JSON / text[]
        deskripsi: form.deskripsi,
        gambar: imageUrl,
        status: "akan datang",
        id_user: user.id,
        penanggung_jawab: form.penanggung_jawab,
        created_at: new Date(),
      };

      // 4️⃣ Insert ke tabel
      const { error: insertError } = await supabase
        .from("acara_penanaman")
        .insert([payload]);

      if (insertError) throw insertError;

      alert("✅ Acara berhasil disimpan ke Supabase!");

      // 5️⃣ Reset form
      setForm({
        judul_acara: "",
        lokasi: "",
        tanggal: "",
        jenis_bibit: [],
        jumlah_bibit: "",
        deskripsi: "",
        gambar: null,
        penanggung_jawab: [],
      });
      setPreview("");
      setFileName("Tidak ada gambar yang dipilih");
    } catch (error) {
      console.error("Gagal menyimpan acara:", error.message);
      alert("❌ Gagal menyimpan acara: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 JSX
  return (
    <div className="h-screen bg-[#F0FDF4] py-8 flex items-center justify-center px-4 overflow-y-auto">
      <div className="w-[1100px] mx-auto">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl space-y-5">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-[#064E3B]">
              Buat Acara Penanaman Baru
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Isi informasi untuk menambahkan acara penanaman.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* JUDUL */}
            <div>
              <label
                htmlFor="judul_acara"
                className="block text-sm font-semibold text-[#064E3B] mb-2"
              >
                Nama Acara
              </label>
              <input
                id="judul_acara"
                name="judul_acara"
                value={form.judul_acara}
                onChange={handleChange}
                placeholder="Penanaman Pohon di Gunung Salak"
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                required
              />
            </div>

            {/* LOKASI & TANGGAL */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lokasi"
                  className="block text-sm font-semibold text-[#064E3B] mb-2"
                >
                  Lokasi
                </label>
                <input
                  id="lokasi"
                  name="lokasi"
                  value={form.lokasi}
                  onChange={handleChange}
                  placeholder="Kota/Kabupaten"
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="tanggal"
                  className="block text-sm font-semibold text-[#064E3B] mb-2"
                >
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>
            </div>

            {/* JENIS & JUMLAH BIBIT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="jenis_bibit"
                  className="block text-sm font-semibold text-[#064E3B] mb-2"
                >
                  Jenis Bibit (Pilih 1+)
                </label>
                <BibitTagInput
                  onTagsChange={handleBibitTagsChange}
                  initialTags={form.jenis_bibit}
                />
              </div>

              <div>
                <label
                  htmlFor="jumlah_bibit"
                  className="block text-sm font-semibold text-[#064E3B] mb-2"
                >
                  Jumlah Target Bibit
                </label>
                <input
                  type="number"
                  id="jumlah_bibit"
                  name="jumlah_bibit"
                  value={form.jumlah_bibit}
                  onChange={handleChange}
                  placeholder="Contoh : 100"
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>
            </div>

            {/* PENANGGUNG JAWAB */}
            <div>
              <label
                htmlFor="penanggung_jawab"
                className="block text-sm font-semibold text-[#064E3B] mb-2"
              >
                Penanggung Jawab (pisahkan dengan koma)
              </label>
              <input
                type="text"
                id="penanggung_jawab"
                name="penanggung_jawab"
                onChange={handlePenanggungJawabChange}
                placeholder="Contoh: Budi, Rina, Andi"
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-sm font-semibold text-[#064E3B] mb-2"
              >
                Deskripsi Acara
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows={3}
                placeholder="Tuliskan detail kegiatan, siapa yang terlibat, dan tujuan acara..."
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                required
              />
            </div>

            {/* UPLOAD GAMBAR */}
            <div>
              <label
                htmlFor="gambar"
                className="block text-sm font-semibold text-[#064E3B] mb-2"
              >
                Upload Gambar Acara
              </label>
              <div className="relative w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-500 overflow-hidden">
                <input
                  type="file"
                  id="gambar"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-between">
                  <span className="bg-[#059669] text-white px-3 py-1 text-sm font-medium rounded-md pointer-events-none">
                    Pilih Gambar
                  </span>
                  <span className="truncate ml-3 text-sm text-gray-600">
                    {fileName}
                  </span>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className={`w-full bg-[#064E3B] hover:bg-[#047857] text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out text-base ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Buat Acara"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
