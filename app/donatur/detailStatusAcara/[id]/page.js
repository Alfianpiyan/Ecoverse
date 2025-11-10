"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderCard from "@/components/DetailAcaraPian/HeaderCard";
import StatusSection from "@/components/DetailAcaraPian/StatusSection";
import PaymentSection from "@/components/DetailAcaraPian/PaymentSection";
import CommentSection from "@/components/DetailAcaraPian/CommentSection";
import DocumentationSection from "@/components/DetailAcaraPian/DocumentationSection";
import LightboxModal from "@/components/DetailAcaraPian/LightboxModal";
import { motion, AnimatePresence } from "framer-motion";

export default function DetailStatusAcaraPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  // Dummy data (simulasi API)
  const dummyData = [
    {
      id: "1",
      title: "Penanaman 100 Bibit di Bogor",
      penyelenggara: "GreenWorld Foundation",
      lokasi: "Bogor, Jawa Barat",
      tanggal: "12 Oktober 2025",
      status: "menunggu",
      image: "https://i.ibb.co/sP7CqYz/forest.jpg",
      jumlahBibit: 3,
      jenisBibit: "Mahoni",
      harga: "45.000",
      metode: "DANA",
      pembayaran: "Berhasil",
      dokumentasi: [],
    },
    {
      id: "2",
      title: "Aksi Tanam Mangrove",
      penyelenggara: "SaveMangrove ID",
      lokasi: "Taman Nasional Ujung Kulon",
      tanggal: "20 Oktober 2025",
      status: "ditanam",
      image: "https://i.ibb.co/34JYQ3t/mangrove.jpg",
      jumlahBibit: 5,
      jenisBibit: "Mangrove",
      harga: "75.000",
      metode: "BCA Virtual Account",
      pembayaran: "Berhasil",
      dokumentasi: [],
    },
    {
      id: "3",
      title: "Bumi Bogor",
      penyelenggara: "Bumi Lestari",
      lokasi: "Bogor, Jawa Barat",
      tanggal: "25 Oktober 2025",
      status: "selesai",
      image: "https://i.ibb.co/jZ2QvDn/tree.jpg",
      jumlahBibit: 10,
      jenisBibit: "Cemara",
      harga: "150.000",
      metode: "OVO",
      pembayaran: "Berhasil",
      dokumentasi: [
        "https://i.ibb.co/sP7CqYz/forest.jpg",
        "https://i.ibb.co/jZ2QvDn/tree.jpg",
        "https://i.ibb.co/34JYQ3t/mangrove.jpg",
      ],
    },
  ];

  useEffect(() => {
    const found = dummyData.find((d) => d.id === id);
    setData(found);
    const saved = localStorage.getItem(`comments_event_${id}`);
    if (saved) setCommentsList(JSON.parse(saved));
  }, [id]);

  const handleSaveComments = (newList) => {
    setCommentsList(newList);
    localStorage.setItem(`comments_event_${id}`, JSON.stringify(newList));
  };

  if (!data) return <div className="p-10 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fff9] to-[#e9fbee] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <HeaderCard data={data} />
        <div className="grid md:grid-cols-2 gap-6">
          <StatusSection data={data} />
          <PaymentSection data={data} />
        </div>

        {data.status === "selesai" && (
          <>
            <CommentSection commentsList={commentsList} onSave={handleSaveComments} />
            <DocumentationSection data={data} setLightbox={setLightbox} />
          </>
        )}

        <AnimatePresence>
          {lightbox.open && (
            <LightboxModal
              data={data}
              lightbox={lightbox}
              setLightbox={setLightbox}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
