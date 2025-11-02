"use client";

import { useState, useCallback } from "react"; 
import { supabase } from "@/lib/Supabaseclient";
import { BibitTagInput } from "./BibitTagInput/BibitTagInput"; 

export default function FormAcara() {
    const [form, setForm] = useState({
        nama_acara: "",
        lokasi: "",
        tanggal_acara: "",
        jenis_bibit: [], 
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
    const handleBibitTagsChange = useCallback((tagsArray) => {
        setForm((prev) => ({ ...prev, jenis_bibit: tagsArray }));
    }, []); 

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

        const isFormValid = form.nama_acara.trim() !== '' &&
            form.lokasi.trim() !== '' &&
            form.tanggal_acara.trim() !== '' &&
            form.jenis_bibit.length > 0 && 
            form.jumlah_bibit.trim() !== '' &&
            form.deskripsi.trim() !== '';

        if (!isFormValid) {
            alert("Harap lengkapi semua kolom (termasuk memilih minimal satu Jenis Bibit)!");
            setIsSubmitting(false);
            return;
        }

        try {
            let imageUrl = null;
            // Dapatkan user dari Supabase
            // const { data: { user } } = await supabase.auth.getUser();

            // if (!user) {
            //     alert("Harap login terlebih dahulu!");
            //     setIsSubmitting(false);
            //     return;
            // }

            // Logika upload dan insert Supabase (kok di komen bang? iya buat data dummy ,jep klo make supa tinggal uncomen aj)
            
            alert("✅ Acara berhasil disimpan! (Simulasi)");

            setForm({
                nama_acara: "",
                lokasi: "",
                tanggal_acara: "",
                jenis_bibit: [], 
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
        <div className="h-screen bg-[#F0FDF4] py-8 flex items-center justify-center px-4 overflow-y-auto">
            <div className="w-[1100] mx-auto"> 
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
                        <div>
                            <label htmlFor="nama_acara" className="block text-sm font-semibold text-[#064E3B] mb-2"> 
                                Nama Acara
                            </label>
                            <input
                                id="nama_acara"
                                name="nama_acara"
                                value={form.nama_acara}
                                onChange={handleChange}
                                placeholder="Penanaman Pohon di Gunung Salak"
                                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
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
                                    className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
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
                                    className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div> 
                                <label htmlFor="jenis_bibit" className="block text-sm font-semibold text-[#064E3B] mb-2">
                                    Jenis Bibit (Pilih 1+)
                                </label>
                                <BibitTagInput 
                                    onTagsChange={handleBibitTagsChange} 
                                    initialTags={form.jenis_bibit}
                                />
                            </div>

                            <div>
                                <label htmlFor="jumlah_bibit" className="block text-sm font-semibold text-[#064E3B] mb-2">
                                    Jumlah Targe Bibit
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
                                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-3 text-base text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                                required
                            />
                        </div>

                        <div className='-mt-1'> 
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
                                    <span className="bg-[#059669] text-white px-3 py-1 text-sm font-medium rounded-md pointer-events-none"> 
                                        Pilih Gambar
                                    </span>
                                    <span className="truncate ml-3 text-sm text-gray-600"> 
                                        {fileName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-[#064E3B] hover:bg-[#047857] text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out text-base ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
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