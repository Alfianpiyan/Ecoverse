"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Beranda", scrollTo: "herosection" },
    { name: "Acara", scrollTo: "acara-section" },
    { name: "Contact Us", scrollTo: "contact-sec" },
  ];

  return (
    <>
      <nav
        className={`fixed overflow-x-hidden top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
        px-6 py-3 rounded-full border border-gray-200 shadow-lg w-[80%] max-w-6xl
        transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"
        }`}
      >
        <Link href="/" className="flex items-center gap-1 group">
          <div className="p-1.5 rounded-full">
            <Image
              src="/eco.png"
              alt="Logo Ecoverse"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-[#047857] tracking-tight">
            Ecoverse
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScrollTo(link.scrollTo)}
              className="font-semibold text-sm px-4 py-2 rounded-full text-[#047857] hover:text-green-800 hover:bg-[#047857]/10 transition-all duration-300"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex gap-3">
          <Link
            href="/Daftar"
            className="px-5 py-1.5 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all duration-300"
          >
            Daftar
          </Link>
          <Link
            href="/Masuk"
            className="px-5 py-1.5 text-sm font-medium rounded-full bg-[#047857] text-white hover:bg-[#036b4f] transition-all duration-300 shadow-sm"
          >
            Masuk
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-[#047857]/10 transition"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#047857]" />
          ) : (
            <Menu className="w-6 h-6 text-[#047857]" />
          )}
        </button>
      </nav>

      <div
        className={`fixed top-20 right-4 w-34 max-h-[75vh] overflow-y-auto bg-white z-40 shadow-2xl border border-gray-200
        flex flex-col items-center justify-start py-6 gap-5 rounded-2xl transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-[110%]"}`}
      >
        <div className="flex flex-col items-center w-full px-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScrollTo(link.scrollTo)}
              className="text-[#047857] font-medium text-sm px-4 py-2 rounded-full hover:bg-[#047857]/10 w-full transition"
            >
              {link.name}
            </button>
          ))}

          <div className="flex flex-col w-full gap-3 mt-3">
            <Link
              href="/user/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-5 py-2 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all duration-300"
            >
              Daftar
            </Link>
            <Link
              href="/user/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-5 py-2 text-sm font-medium rounded-full bg-[#047857] text-white hover:bg-[#036b4f] transition-all duration-300 shadow-sm"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
