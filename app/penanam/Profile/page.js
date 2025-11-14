import ProfileHeader from "@/components/ProfilePenanam/ProfileHeader";
import AcaraCard from "@/components/ProfilePenanam/ProfileAcaraList";
import Footer from "@/components/landing/Footer";
import NavbarPnanam from "@/components/NavbarPenanam/navbarpenanam";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <main className="flex-1 container mx-auto px-4 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 gap-12">
          <NavbarPnanam/>
          <ProfileHeader />
          <AcaraCard/>
        </div>
      </main>
      <Footer />
    </div>
  );
}