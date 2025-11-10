// import NavbarAll from "@/components/HomePage/NavbarAll";

import NavbarPenanam from "@/components/NavbarPenanam/navbarpenanam";
import AcarahHijau from "../../../components/HomePage/acarah-hijau";
import AjakTanam from "../../../components/HomePage/AjakTanam";
import Footer from "../../../components/landing/Footer";
import Komunitas from "../../../components/landing/Komunitas";
import DukungOleh from "../../../components/landing/Support";
import LanggananSection from "../../../components/langgananpage/LanggananHome";
import NavbarPnanam from "@/components/NavbarPenanam/navbarpenanam";

export default function HomePenanam () {
    return (
        <>
            <NavbarPnanam/>
            <AjakTanam />
            <Komunitas />
            <LanggananSection />
            <AcarahHijau />
            <DukungOleh />
            <Footer />
        </>
    )
}