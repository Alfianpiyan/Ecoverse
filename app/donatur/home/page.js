import DukungOleh from "@/components/HomePage/DukunganOleh";
import NavbarDonatur from "@/components/HomePage/NavbarDonatur";
import SekarangSection from "@/components/HomePage/SekarangSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
    return (
        <>
        <NavbarDonatur/>
        <SekarangSection/>
        <DukungOleh/>
        <Footer/>
        </>
    )
}