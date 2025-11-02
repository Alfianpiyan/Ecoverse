"use client";

import { useState, useEffect, useCallback } from 'react';
import { AcaraCard } from './AcaraCard';
import { BagianStatus } from './BagianStatus';
import { UpDokumentasi } from './UpDokumentasi';
import { GaleriDokum } from './GaleriDokum';

const DUMMY_DATA = {
    '1': { 
        id: '1',
        judul_acara: "Penanaman Harapan di Gunung Salak",
        lokasi: "Bogor, Jawa Barat",
        tanggal: "2025-11-21",
        jumlah_target_bibit: 150,
        jenis_bibit: "Pohon Mahoni",
        deskripsi: "Acara penanaman ini bertujuan untuk merehabilitasi area lereng Gunung Salak yang sempat gundul akibat pembukaan lahan. Mari menanam harapan baru bersama!",
        current_status: 'Menunggu Acara', 
        gambar: '/placeholder-image.jpg', 
        dokumentasi: [
            { id: 101, url: '/img-1.jpg', catatan: 'Penggalian lubang', status: 'Sedang Berlangsung' },
            { id: 102, url: '/img-2.jpg', catatan: 'Proses penanaman batch pertama', status: 'Sedang Berlangsung' },
            { id: 103, url: '/img-3.jpg', catatan: 'Foto bersama setelah selesai', status: 'Sudah Ditanam' },
        ]
    }
};

export default function DetailAcaraPage({ acaraId }) { 
    const [acara, setAcara] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [activeStatus, setActiveStatus] = useState('Menunggu Acara'); 

    const fetchAcaraData = async () => {
        if (!acaraId) return;
        setIsLoading(true);
        
        setTimeout(() => {
            const fetchedAcara = DUMMY_DATA[acaraId]; 
            
            if (fetchedAcara) {
                setAcara(fetchedAcara);
                setActiveStatus(fetchedAcara.current_status);
            }
            setIsLoading(false);
        }, 500); 
    };

    useEffect(() => {
        fetchAcaraData();
    }, [acaraId]); 

    const handleStatusChange = async (newStatus) => {
        setIsLoading(true);
        setTimeout(() => {
            setAcara(prev => ({ ...prev, current_status: newStatus }));
            setActiveStatus(newStatus);
            setIsLoading(false);
        }, 300);
    };

    const handleAddDokumentasi = (newDoc) => {
        const newDokumentasiItem = { ...newDoc, id: Date.now(), status: activeStatus };
        setAcara(prev => ({ 
            ...prev, 
            dokumentasi: [...(prev?.dokumentasi || []), newDokumentasiItem] 
        }));
    };

    const handleUpdateAcara = useCallback(() => {
        alert('Detail Acara berhasil diupdate! (Simulasi)');
    }, []);


    if (isLoading) {
        return (
            <div className="bg-[#F0FDF4] min-h-screen flex items-center justify-center">
                <p className="text-[#064E3B] font-semibold text-lg">Memuat Detail Acara...</p>
            </div>
        );
    }

    if (!acara) {
         return (
            <div className="bg-[#F0FDF4] min-h-screen flex items-center justify-center">
                <p className="text-red-600 font-semibold text-lg">Acara ID: {acaraId} tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className=" min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                <AcaraCard 
                    acara={acara} 
                    isLoading={isLoading} 
                />

                <BagianStatus 
                    currentStatus={acara.current_status}
                    activeStatus={activeStatus}
                    onStatusChange={handleStatusChange} 
                    onUpdateAcara={handleUpdateAcara}
                    isLoading={isLoading}
                />
                
                {activeStatus !== 'Menunggu Acara' && (
                    <GaleriDokum 
                        dokumentasi={acara.dokumentasi}
                        activeStatus={activeStatus}
                    />
                )}

                {(activeStatus === 'Sedang Berlangsung' || activeStatus === 'Sudah Ditanam') && (
                    <UpDokumentasi 
                        onSubmitDocumentation={handleAddDokumentasi} 
                        currentStatus={activeStatus}
                    />
                )}

            </div>
        </div>
    );
}