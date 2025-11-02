"use client";

import { useState } from "react";
import Image from "next/image";

export default function DetailAcaraPian() {
  const [statusAcara] = useState("Menunggu Acara");
  const dataAcara = {
    nama: "Acara Penanaman Pohon",
    lokasi: "Taman Hutan Raya Bandung",
    namaInstansi: "Pian",
    tanggal: "25 Oktober 2025",
    status: statusAcara,
  };

  const dataPembayaran = {
    tanggal: "25 Oktober 2025",
    jumlahBibit: 3,
    jenisBibit: "Rp. 45.000,00",
    metode: "DANA",
    status: "Berhasil",
  };

  const tahap = [
    { label: "Menunggu Acara", icon: "/icons/tr1.png" },
    { label: "Sedang Ditanam", icon: "/icons/tr2.png" },
    { label: "Sudah Ditanam", icon: "/icons/tr3.png" },
  ];

  const statusIndex = tahap.findIndex((t) => t.label === statusAcara);

  let progressWidth = "0%";
  if (statusIndex === 1) {
    progressWidth = "50%";
  } else if (statusIndex === 2) {
    progressWidth = "100%";
  }

  return (
    <div className="min-h-screen flex justify-center py-6 md:py-10 px-4 bg-gray-50">
      <div className="w-full space-y-6" style={{ maxWidth: "1200px" }}>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md flex flex-col md:flex-row gap-6 items-start relative">

          <div className="w-full md:w-1/3 h-48 md:h-56 bg-gray-200 rounded-lg shrink-0" />
          
          <div className="flex-grow space-y-1 md:mb-2"> 
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">{dataAcara.nama}</h2>
            <p className="text-base md:text-lg text-green-800">
              Penyelenggara : <span className="text-gray-800">{dataAcara.namaInstansi}</span>
            </p>
            <p className="text-base md:text-lg text-green-800"> 
              Lokasi : <span className="text-gray-800">{dataAcara.lokasi}</span>
            </p>
            <p className="text-base md:text-lg text-green-800"> 
              Tanggal Acara : <span className="text-gray-800">{dataAcara.tanggal}</span>
            </p>

            <p className="font-semibold text-green-700 text-base md:text-lg pt-3">
              Status Acara : {dataAcara.status}
            </p>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-10 pt-2">
            <a 
              href="/profile-instansi" 
              className="text-green-700 font-semibold text-base md:text-lg md:mt-30 hover:text-green-800 transition-colors"
            >
              Lihat Profile Instansi &gt;
            </a>
          </div>

        </div>
 
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between"> 
            <div> 
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-8 text-center"> 
                Status Bibit Kamu
              </h3>
              <div className="relative flex items-start justify-between py-2 px-3 sm:px-6"> 
                  <div
                      className="absolute top-[40px] left-1/2 h-1 bg-gray-200 transform -translate-x-1/2 rounded-full w-[80%]" 
                  ></div>
                  <div
                      className={`absolute top-[40px] left-[10%] h-1 bg-green-500 transform transition-all duration-700`} 
                      style={{ width: progressWidth }}
                  ></div>

                  {tahap.map((item, index) => (
                      <div
                          key={index}
                          className="flex flex-col items-center text-center z-10 w-20 sm:w-24" // Lebar item lebih kecil di mobile
                      >
                          <div
                              className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-500 shadow-md mb-2 ${ 
                                  index <= statusIndex ? "bg-green-600" : "bg-gray-300" 
                              }`}
                          >
                              <Image
                                  src={item.icon}
                                  alt={item.label}
                                  width={32} 
                                  height={32} 
                                  className="object-contain"
                              />
                          </div>
                          <div
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white mt-1 mb-2 text-sm sm:text-base font-bold ${ 
                                  index === statusIndex
                                      ? "bg-green-600" 
                                      : index < statusIndex
                                      ? "bg-green-600" 
                                      : "bg-gray-300" 
                              }`}
                          >
                              {index <= statusIndex ? "✓" : ""}
                          </div>
                          <p className={`text-xs sm:text-base font-semibold ${index === statusIndex ? 'text-green-700' : 'text-gray-500'}`}>{item.label}</p>
                      </div>
                  ))}
              </div>
            </div> 
            <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm md:text-base text-center italic">
                    {statusAcara === "Menunggu Acara" &&
                        "Bibit kamu sedang menunggu hari acara. Terima kasih sudah berkontribusi."}
                    {statusAcara === "Sedang Ditanam" &&
                        "Bibit kamu sedang dalam proses penanaman 🌱. Kami akan segera memberitahu hasilnya!"}
                    {statusAcara === "Sudah Ditanam" &&
                        "Bibit kamu telah berhasil ditanam! Terima kasih telah ikut menghijaukan bumi 🌿."}
                </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center"> 
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4"> 
              Riwayat Pembayaran
            </h3>
            <div className="space-y-2"> 

              <div className="flex items-center text-sm md:text-lg"> 
                <p className="w-1/2 md:w-[185px]">Tanggal Pembayaran</p> 
                <p className="mx-2">:</p>
                <p className="flex-grow text-right">{dataPembayaran.tanggal}</p>
              </div>
              
              <div className="flex items-center text-sm md:text-lg"> 
                <p className="w-1/2 md:w-[185px]">Jumlah Bibit</p> 
                <p className="mx-2">:</p>
                <p className="flex-grow text-right">{dataPembayaran.jumlahBibit}</p>
              </div>
              
              <div className="flex items-center text-sm md:text-lg"> 
                <p className="w-1/2 md:w-[185px]">Jenis Bibit</p> 
                <p className="mx-2">:</p>
                <p className="flex-grow text-right">{dataPembayaran.jenisBibit}</p>
              </div>
              
              <div className="flex items-center text-sm md:text-lg"> 
                <p className="w-1/2 md:w-[185px]">Metode Pembayaran</p> 
                <p className="mx-2">:</p>
                <p className="flex-grow text-right">{dataPembayaran.metode}</p>
              </div>

              <div className="flex items-center text-base md:text-xl pt-2 border-t mt-2"> 
                <p className="font-bold">Status Pembayaran</p>
                <p className="mx-2 font-bold">:</p>
                <p className="flex-grow text-green-600 font-bold text-right">
                  ✅ {dataPembayaran.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}