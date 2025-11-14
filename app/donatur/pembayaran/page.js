
import NavbarDonatur from "@/components/HomePage/NavbarDonatur";
import TrackingBibit from "@/components/Acarapage/TrackingBibit";
import TransaksiBibit from "@/components/pembayaran/PembayaranBibit";
import Footer from "@/components/landing/Footer";


export default function HalPembayaran() {
    return (
        <>
        <NavbarDonatur/>
        <TransaksiBibit/>
        <Footer/>
        </>
    )
}