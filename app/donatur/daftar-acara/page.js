import React from "react";
import DaftarAcara from "@/components/Acarapage/DaftarAcara";
import Footer from "@/components/landing/Footer";
import NavbarDonatur from "@/components/HomePage/NavbarDonatur";

export default function Page() {
return (
    <>
        <NavbarDonatur />    
        <DaftarAcara />
        <Footer />
    </>
)
}
