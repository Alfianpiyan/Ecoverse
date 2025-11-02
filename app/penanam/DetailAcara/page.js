// app/penanam/DetailAcara/page.js

// Tidak perlu 'use client' karena ini hanya memanggil komponen client
import DetailAcaraPage from '@/components/AcaraPenanam/DetailAcaraPage';

import DetailAcaraNav from '@/components/Navbar/DetailAcaraNav';

export default function AcaraDetailStatis() {
    
    // **ID acara DUMMY statis**
    // Karena kita tidak mengambil ID dari URL, kita tentukan ID-nya di sini
    const acaraIdStatis = '1'; 

    return (
      
        <main>
              <DetailAcaraNav/>
            {/* Teruskan ID statis ke komponen DetailAcaraPage */}
            <DetailAcaraPage acaraId={acaraIdStatis} />
        </main>
    );
}