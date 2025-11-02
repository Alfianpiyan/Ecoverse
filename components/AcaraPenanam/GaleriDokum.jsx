import Image from 'next/image';

export function GaleriDokum({ dokumentasi, activeStatus }) {
    
    let filteredDocs = [];

    if (activeStatus === 'Sudah Ditanam') {
        filteredDocs = dokumentasi.filter(doc => 
            doc.status === 'Sudah Ditanam' || doc.status === 'Sedang Berlangsung'
        );
    } else if (activeStatus === 'Sedang Berlangsung') {
        filteredDocs = dokumentasi.filter(doc => doc.status === 'Sedang Berlangsung');
    } else {
        filteredDocs = [];
    }
    
    const title = activeStatus === 'Sedang Berlangsung' 
        ? 'Galeri Dokumentasi Penanaman'
        : activeStatus === 'Sudah Ditanam'
            ? 'Galeri Dokumentasi FINAL (Penanaman & Hasil)'
            : 'Galeri Dokumentasi';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-[#064E3B]">{title}</h3>
            
            {filteredDocs.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">Belum ada dokumentasi untuk status ini.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filteredDocs.map((doc) => {
                        
                        const isPendingPreview = doc.isPending === true && doc.url && doc.url.startsWith('data:');
                        
                        return (
                            <div key={doc.id} 
                                 className={`relative group overflow-hidden rounded-lg shadow-md border 
                                            ${isPendingPreview ? 'border-2 border-yellow-500' : 'border-gray-100'}`}>
                                
                                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                    {doc.url ? (
                                        isPendingPreview ? (
                                            <img
                                                src={doc.url} 
                                                alt={doc.catatan || 'Dokumentasi Preview'} 
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <Image 
                                                src={doc.url} 
                                                alt={doc.catatan || 'Dokumentasi'} 
                                                layout="fill"
                                                objectFit="cover"
                                                unoptimized={!doc.url || doc.url.startsWith('/')}
                                            />
                                        )
                                    ) : (
                                        <span className="text-center p-4">Gambar tidak ditemukan</span>
                                    )}
                                </div>
                                
                                <p className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs p-1.5 truncate">
                                    {doc.catatan || 'Catatan Kegiatan...'}
                                    {isPendingPreview && " (Preview)"}
                                </p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}