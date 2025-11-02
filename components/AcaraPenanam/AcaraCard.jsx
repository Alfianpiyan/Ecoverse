// components/AcaraPenanam/AcaraCard.jsx
import Image from 'next/image';
import { MapPin, Calendar, Sprout } from 'lucide-react';

export function AcaraCard({ acara, isLoading }) {
    
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse space-y-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {acara.gambar && (
                    <Image 
                        src={acara.gambar} 
                        alt={acara.judul_acara} 
                        layout="fill"
                        objectFit="cover"
                        className="opacity-80"
                        unoptimized
                    />
                )}
                <h1 className="absolute text-2xl font-bold text-[#064E3B] bg-white/70 p-2 rounded-lg backdrop-blur-sm">
                    {acara.judul_acara || "Nama Acara"}
                </h1>
            </div>

            <div className="p-4 border border-gray-100 rounded-lg space-y-3">
                <h3 className="text-xl font-bold text-[#064E3B] mb-3">Detail Acara</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[#047857]" />
                        <span className="font-semibold text-gray-700">Lokasi:</span>
                        <span className="text-gray-900">{acara.lokasi || "N/A"}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#047857]" />
                        <span className="font-semibold text-gray-700">Tanggal:</span>
                        <span className="text-gray-900">{formatDate(acara.tanggal)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Sprout className="w-4 h-4 text-[#047857]" />
                        <span className="font-semibold text-gray-700">Jumlah Target Bibit:</span>
                        <span className="text-gray-900">{acara.jumlah_bibit || 0} Bibit</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Sprout className="w-4 h-4 text-[#047857]" />
                        <span className="font-semibold text-gray-700">Jenis Bibit:</span>
                        <span className="text-gray-900 truncate">{acara.jenis_bibit || "N/A"}</span>
                    </div>
                </div>

                <p className="text-gray-600 pt-3 text-sm border-t mt-3">
                    {acara.deskripsi || "Tidak ada deskripsi acara yang tersedia."}
                </p>
            </div>
            
        </div>
    );
}