import AboutSection from "@/components/landing/Aboutme";
import BenefitSection from "@/components/landing/bnefit";
import HeroSection from "@/components/landing/Herosection";
import Komunitas from "@/components/landing/Komunitas";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <Navbar/>
   <HeroSection/>
   <AboutSection/>
   <Komunitas/>
   <BenefitSection/>
   </>
  );
}
