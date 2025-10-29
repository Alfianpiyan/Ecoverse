"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function FormAcara() {
  const [form, setForm] = useState({
    judul_acara: "",
    status: "Sedang Berlangsung",
    waktu: "",
    deskripsi: "",
    lokasi: "",
    tanggal: new Date().toISOString().substr(0, 10),
    gambar: null,
  });

  const [preview, setPreview] = useState("");
  const [penanggungJawab, setPenanggungJawab] = useState([
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" },
  ]);

  const [acaraList, setAcaraList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  // 🔹 Ambil semua acara yang dimiliki user
  useEffect(() => {
    const fetchAcara = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("acara_penanaman")
        .select("*")
        .eq("id_user", user.id)
        .order("created_at", { ascending: false });

      if (!error) setAcaraList(data || []);
      setLoadingList(false);
    };

    fetchAcara();
  }, []);

  // 🔹 Handle perubahan form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle gambar preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, gambar: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, gambar: null }));
      setPreview("");
    }
  };

  // 🔹 Ubah data penanggung jawab
  const handlePenanggungJawabChange = (index, key, value) => {
    const copy = [...penanggungJawab];
    copy[index][key] = value;
    setPenanggungJawab(copy);
  };

  // 🔹 Submit acara baru
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      // Upload gambar ke Supabase Storage
      if (form.gambar) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("gambar_acara")
          .upload(`acara/${Date.now()}_${form.gambar.name}`, form.gambar);

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("gambar_acara")
          .getPublicUrl(uploadData.path);

        imageUrl = publicUrl.publicUrl;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Harap login terlebih dahulu!");
        return;
      }

      // Insert ke database
     // ...
const { error: insertError } = await supabase
  .from("acara_penanaman")
  .insert([
    {
      id_user: user.id,
      judul_acara: form.judul_acara,
      deskripsi: form.deskripsi,
      lokasi: form.lokasi,
      tanggal: form.tanggal,
      waktu: form.waktu,
      status: form.status,
      gambar: imageUrl,
      penanggung_jawab: penanggungJawab, // 🟢 array JSON langsung
      // ❌ HAPUS galeri: [] karena sudah di tabel galeri_acara
    },
  ]);


      if (insertError) throw insertError;

      alert("✅ Acara berhasil disimpan!");

      // Refresh list acara
      const { data } = await supabase
        .from("acara_penanaman")
        .select("*")
        .eq("id_user", user.id)
        .order("created_at", { ascending: false });

      setAcaraList(data || []);

      // Reset form
      setForm({
        judul_acara: "",
        status: "Sedang Berlangsung",
        waktu: "",
        deskripsi: "",
        lokasi: "",
        tanggal: new Date().toISOString().substr(0, 10),
        gambar: null,
      });
      setPreview("");
      setPenanggungJawab([
        { name: "", role: "" },
        { name: "", role: "" },
        { name: "", role: "" },
      ]);
    } catch (err) {
      console.error("Error insert:", err);
      alert("❌ Gagal menyimpan acara: " + err.message);
    }
  };

  // 🔹 Upload dokumentasi ke galeri acara
  // 🔹 Upload dokumentasi ke tabel galeri_acara
const handleUploadDokumentasi = async (acaraId, files) => {
  if (!files?.length) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Harap login terlebih dahulu!");
      return;
    }

    const uploadedUrls = [];

    for (const file of files) {
      // Upload ke storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gambar_acara")
        .upload(`galeri/${Date.now()}_${file.name}`, file);

      if (uploadError) throw uploadError;

      // Ambil public URL
      const { data: publicUrl } = supabase.storage
        .from("gambar_acara")
        .getPublicUrl(uploadData.path);

      uploadedUrls.push(publicUrl.publicUrl);
    }

    // Simpan ke tabel galeri_acara
    const galeriRows = uploadedUrls.map((url) => ({
      id_acara: acaraId,
      foto_url: url, // ✅ kolom sesuai tabel kamu
      id_user: user.id,
    }));

    const { error: insertError } = await supabase
      .from("galeri_acara")
      .insert(galeriRows);

    if (insertError) throw insertError;

    alert("📸 Dokumentasi berhasil ditambahkan!");
  } catch (err) {
    console.error("Gagal upload dokumentasi:", err);
    alert("❌ Gagal upload dokumentasi: " + err.message);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-3xl font-extrabold text-[#064E3B] text-center">
          Buat Acara Penanaman Baru
        </h2>

        {/* 🔹 Container daftar acara */}
        {!loadingList && acaraList.length > 0 && (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-[#064E3B] mb-3">
              Acara Kamu
            </h3>
            {acaraList.map((acara) => (
              <div
                key={acara.id}
                className="border rounded-xl p-5 flex justify-between items-center bg-white shadow-sm"
              >
                <div>
                  <h4 className="font-semibold text-lg">{acara.judul_acara}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{acara.deskripsi}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {acara.tanggal} — {acara.waktu}
                  </p>
                </div>

                <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Tambah Dokumentasi
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadDokumentasi(acara.id, e.target.files)}
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Form Tambah Acara */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 space-y-7 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Acara
              </label>
              <input
                name="judul_acara"
                value={form.judul_acara}
                onChange={handleChange}
                placeholder="Ex: Bersih-bersih Hutan Kota"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Acara
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
              >
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            {/* Waktu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Acara
              </label>
              <input
                name="waktu"
                value={form.waktu}
                onChange={handleChange}
                placeholder="08:00 - 12:00 WIB"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Acara
              </label>
              <input
                name="lokasi"
                value={form.lokasi}
                onChange={handleChange}
                placeholder="Ex: Taman Nasional Gunung Gede"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Acara
              </label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Gambar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Acara
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Acara
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={5}
              placeholder="Ceritakan detail acara ini..."
              className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
              required
            />
          </div>

          {/* Penanggung Jawab */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Penanggung Jawab
            </label>
            {penanggungJawab.map((p, i) => (
              <div key={i} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder={`Nama ${i + 1}`}
                  value={p.name}
                  onChange={(e) =>
                    handlePenanggungJawabChange(i, "name", e.target.value)
                  }
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder={`Jabatan ${i + 1}`}
                  value={p.role}
                  onChange={(e) =>
                    handlePenanggungJawabChange(i, "role", e.target.value)
                  }
                  className="border p-2 rounded w-1/2"
                />
              </div>
            ))}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full md:w-auto bg-[#059669] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Tambah Acara Baru
          </button>
        </form>
      </div>
    </div>
  );
}
