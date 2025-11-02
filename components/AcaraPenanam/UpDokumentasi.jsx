"use client";

import { useState } from 'react';

export function UpDokumentasi({ onSubmitDocumentation, currentStatus }) {
    const [file, setFile] = useState(null);
    const [catatan, setCatatan] = useState('');
    const [fileName, setFileName] = useState("Tidak ada file dipilih");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            setFile(null);
            setFileName("Tidak ada file dipilih");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Harap pilih foto!');
            return;
        }

        setIsUploading(true);
        
        const dummyUrl = `/dokumentasi/${currentStatus}_${Date.now()}.jpg`;

        setTimeout(() => {
            onSubmitDocumentation({
                url: dummyUrl, 
                catatan: catatan,
            });

            setFile(null);
            setCatatan('');
            setFileName("Tidak ada file dipilih");
            setIsUploading(false);
            alert("Dokumentasi berhasil diunggah! (Simulasi)");
        }, 1000);
    };

    const title = currentStatus === 'Sedang Berlangsung' 
        ? 'Upload Dokumentasi Penanaman'
        : 'Upload Dokumentasi Hasil';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-[#064E3B]">{title}</h3>
            <p className="text-gray-600 text-sm">
                Unggah foto dan catatan kegiatan untuk status "{currentStatus}".
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="relative w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 overflow-hidden"> 
                        <input
                            type="file"
                            id="upload-foto"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            required
                            disabled={isUploading}
                        />
                        <div className="flex items-center justify-start">
                            <span className="bg-emerald-700 text-white px-3 py-1 text-sm font-medium rounded-md pointer-events-none"> 
                                Pilih Foto
                            </span>
                            <span className="truncate ml-3 text-sm text-gray-600"> 
                                {fileName}
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="catatan" className="block text-sm font-semibold text-[#064E3B] mb-2">
                        Catatan Kegiatan
                    </label>
                    <textarea
                        id="catatan"
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        rows={3}
                        placeholder="Tuliskan catatan kegiatan di sini..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:border-[#10B981] focus:ring-[#10B981]"
                        disabled={isUploading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isUploading || !file}
                    className={`w-full bg-[#064E3B] hover:bg-[#047857] text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out text-base ${isUploading || !file ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                    {isUploading ? 'Mengunggah...' : 'Kirim Dokumentasi'}
                </button>
            </form>
        </div>
    );
}