"use client";

import { useState } from "react";
import { supabase } from "@/lib/Supabaseclient";

export default function FormAcara() {
  const [form, setForm] = useState({
    nama_acara: "",
    lokasi: "",
    tanggal_acara: "",
    jenis_bibit: "",
    jumlah_bibit: "",
    deskripsi: "",
    gambar: null,
  });

  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("Tidak ada gambar yang dipilih");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = ['nama_acara', 'lokasi', 'tanggal_acara', 'jenis_bibit', 'jumlah_bibit', 'deskripsi'];
    const isFormValid = requiredFields.every(field => form[field].trim() !== '');

    if (!isFormValid) {
        alert("Harap lengkapi semua kolom yang wajib diisi!");
        setIsSubmitting(false);
        return;
    }

    try {
      let imageUrl = null;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Harap login terlebih dahulu!");
        setIsSubmitting(false);
        return;
      }

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
      
      const { error: insertError } = await supabase
        .from("acara_penanaman")
        .insert([
          {
            id_user: user.id,
            judul_acara: form.nama_acara,
            deskripsi: form.deskripsi,
            lokasi: form.lokasi,
            tanggal: form.tanggal_acara,
            jenis_bibit: form.jenis_bibit,
            jumlah_bibit: parseInt(form.jumlah_bibit),
            gambar: imageUrl,
          },
        ]);

      if (insertError) throw insertError;

      alert("✅ Acara berhasil disimpan!");

      setForm({
        nama_acara: "",
        lokasi: "",
        tanggal_acara: "",
        jenis_bibit: "",
        jumlah_bibit: "",
        deskripsi: "",
        gambar: null,
      });
      setPreview("");
      setFileName("Tidak ada gambar yang dipilih");

    } catch (err) {
      console.error("Error insert:", err);
      alert("❌ Gagal menyimpan acara: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] py-8 flex items-center justify-center px-4"> 
      <div className=" w-[1050] mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-xl space-y-5">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-[#064E3B]">
              Buat Acara Penanaman Baru
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Isi informasi di bawah ini untuk menambahkan acara penanaman ke platform EcoVerse.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nama_acara" className="block text-sm font-semibold text-[#064E3B] mb-2">
                Nama Acara
              </label>
              <input
                id="nama_acara"
                name="nama_acara"
                value={form.nama_acara}
                onChange={handleChange}
                placeholder="Contoh: Penanaman Pohon di Gunung Salak"
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lokasi" className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Lokasi
                </label>
                <input
                  id="lokasi"
                  name="lokasi"
                  value={form.lokasi}
                  onChange={handleChange}
                  placeholder="Kota/Kabupaten"
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>

              <div>
                <label htmlFor="tanggal_acara" className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  id="tanggal_acara"
                  name="tanggal_acara"
                  value={form.tanggal_acara}
                  onChange={handleChange}
                  placeholder="dd/mm/yyyy"
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="jenis_bibit" className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Jenis Bibit
                </label>
                <input
                  id="jenis_bibit"
                  name="jenis_bibit"
                  value={form.jenis_bibit}
                  onChange={handleChange}
                  placeholder="Contoh: Pohon Mahoni"
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>

              <div>
                <label htmlFor="jumlah_bibit" className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Jumlah Bibit
                </label>
                <input
                  type="number"
                  id="jumlah_bibit"
                  name="jumlah_bibit"
                  value={form.jumlah_bibit}
                  onChange={handleChange}
                  placeholder="Contoh : 100"
                  className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="deskripsi" className="block text-sm font-semibold text-[#064E3B] mb-2">
                Deskripsi Acara
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows={3} 
                placeholder="Tuliskan detail kegiatan, siapa yang terlibat, dan tujuan acara..."
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                required
              />
            </div>

            <div className="-mt-3" >
                <label htmlFor="gambar" className="block text-sm font-semibold text-[#064E3B] mb-2">
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
                        <span className="bg-[#059669] text-white px-3 py-1 text-xs font-medium rounded-md pointer-events-none">
                            Pilih Gambar
                        </span>
                        <span className="truncate ml-2 text-sm text-gray-600">
                            {fileName}
                        </span>
                    </div>
                </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-[#064E3B] hover:bg-[#047857] text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memproses...' : 'Buat Acara'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}