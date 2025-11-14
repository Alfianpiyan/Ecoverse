"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/lib/Supabaseclient";
import { BibitTagInput } from "./BibitTagInput/BibitTagInput";

export default function FormAcara() {
  const [form, setForm] = useState({
    judul_acara: "",
    lokasi: "",
    tanggal: "",
    waktu: "", 
    jenis_bibit: [],
    jumlah_bibit: "",
    deskripsi: "",
    gambar: null,
    penanggung_jawab: [],
  });

  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("Tidak ada gambar yang dipilih");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBibitTagsChange = useCallback((tagsArray) => {
    setForm((prev) => ({ ...prev, jenis_bibit: tagsArray }));
  }, []);

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

  const handlePenanggungJawabChange = (e) => {
    const { value } = e.target;
    const namaArray = value
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    setForm((prev) => ({ ...prev, penanggung_jawab: namaArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user)
        throw new Error("Gagal mengambil data user. Coba login ulang.");

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

      const payload = {
        judul_acara: form.judul_acara,
        lokasi: form.lokasi,
        tanggal: form.tanggal,
        waktu: form.waktu,
        jumlah_bibit:
          form.jumlah_bibit !== "" ? parseInt(form.jumlah_bibit, 10) : null,
        jenis_bibit: form.jenis_bibit,
        deskripsi: form.deskripsi,
        gambar: imageUrl,
        status: "akan datang",
        id_user: user.id,
        penanggung_jawab: form.penanggung_jawab,
        created_at: new Date(),
      };

      const { error: insertError } = await supabase
        .from("acara_penanaman")
        .insert([payload]);

      if (insertError) throw insertError;

      await Swal.fire({
        title: "Berhasil!",
        text: "Acara berhasil disimpan ke Supabase!",
        icon: "success",
        confirmButtonColor: "#059669",
      });

      // Reset form
      setForm({
        judul_acara: "",
        lokasi: "",
        tanggal: "",
        waktu: "",
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

      Swal.fire({
        title: "Gagal!",
        text: "Gagal menyimpan acara: " + error.message,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen py-8 flex mt-36 pt-24 items-center justify-center px-4 mb-48">
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
            {/* Nama Acara */}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
                required
              />
            </div>

            {/* Lokasi, Tanggal, Waktu */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Lokasi
                </label>
                <input
                  id="lokasi"
                  name="lokasi"
                  value={form.lokasi}
                  onChange={handleChange}
                  placeholder="Kota/Kabupaten"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Waktu Acara
                </label>
                <input
                  type="time"
                  id="waktu"
                  name="waktu"
                  value={form.waktu}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>
            </div>

            {/* Jenis & Jumlah Bibit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Jenis Bibit (Pilih 1+)
                </label>
                <BibitTagInput
                  onTagsChange={handleBibitTagsChange}
                  initialTags={form.jenis_bibit}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                  Jumlah Target Bibit
                </label>
                <input
                  type="number"
                  name="jumlah_bibit"
                  value={form.jumlah_bibit}
                  onChange={handleChange}
                  placeholder="Contoh: 100"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
                  required
                />
              </div>
            </div>

            {/* Penanggung Jawab */}
            <div>
              <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                Penanggung Jawab (pisahkan dengan koma)
              </label>
              <input
                type="text"
                onChange={handlePenanggungJawabChange}
                placeholder="Contoh: Budi, Rina, Andi"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                Deskripsi Acara
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows={3}
                placeholder="Tuliskan detail kegiatan..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-[#10B981] focus:ring-[#10B981]"
                required
              />
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="block text-sm font-semibold text-[#064E3B] mb-2">
                Upload Gambar Acara
              </label>
              <div className="relative w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 overflow-hidden">
                <input
                  type="file"
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

            {/* Submit */}
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
