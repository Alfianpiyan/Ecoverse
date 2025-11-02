// import NavbarAll from "@/components/HomePage/NavbarAll";

import AcarahHijau from "../../../components/HomePage/acarah-hijau";
import AjakTanam from "../../../components/HomePage/AjakTanam";
import Footer from "../../../components/landing/Footer";
import Komunitas from "../../../components/landing/Komunitas";
import DukungOleh from "../../../components/landing/Support";
import LanggananSection from "../../../components/langgananpage/LanggananHome";

export default function HomePenanam () {
    return (
        <>
            {/* <NavbarAll /> */}
            <AjakTanam />
            <Komunitas />
            <LanggananSection />
            <AcarahHijau />
            <DukungOleh />
            <Footer />
        </>
    )
}