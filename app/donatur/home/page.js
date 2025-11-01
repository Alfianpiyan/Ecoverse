import AcarahHijau from "@/components/HomePage/acarah-hijau";
import DukungOleh from "@/components/HomePage/DukunganOleh";
import NavbarDonatur from "@/components/HomePage/NavbarDonatur";
import SekarangSection from "@/components/HomePage/SekarangSection";
import AcaraHijau from "@/components/landing/Acarahijau";
import Footer from "@/components/landing/Footer";
import Komunitas from "@/components/landing/Komunitas";

export default function Home() {
    return (
        <>
        <NavbarDonatur/>
        <SekarangSection/>
        <Komunitas/>
        <DukungOleh/>
        <AcarahHijau/>
        <Footer/>
        </>
    )
}