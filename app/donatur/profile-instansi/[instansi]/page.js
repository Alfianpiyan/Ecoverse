"use client";

import Footer from "@/components/landing/Footer";
import ProfilInstansi from "@/components/ProfileInstansi/profileinstansi";
import { use } from "react";

export default function ProfilInstansiPage({ params }) {
  const { instansi } = use (params);

  return (
    <>
      
        <ProfilInstansi slug={instansi} />
        <Footer />
    </>
  )
}
