import AboutSection from "@/components/landing/Aboutme";
import AcaraHijau from "@/components/landing/Acarahijau";
import BenefitSection from "@/components/landing/bnefit";
import CaraKerja from "@/components/landing/caraKerja";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/Herosection";
import Komunitas from "@/components/landing/Komunitas";
import HubungiKami from "@/components/landing/KontakKami";
import Navbar from "@/components/landing/Navbar";
import DukungOleh from "@/components/landing/Support";
import Image from "next/image";

export default function landing() {
  return (
   <>
   <Navbar/>
   <HeroSection/>
   <AboutSection/>
   <Komunitas/>
   <CaraKerja/>
   <BenefitSection/>
   <AcaraHijau/>
   <DukungOleh/>
   <HubungiKami/>
   <Footer/>
   </>
  );
}
