"use client";

import Link from "next/link";
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
    { name: "Beranda", scrollTo: "Herosection" },
    { name: "Acara", scrollTo: "Acarahijau" },
    { name: "Contact Us", scrollTo: "contactus-section" },
  ];

  return (
    <>
      {/* === NAVBAR === */}
      <nav
        className={`fixed overflow-x-hidden top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
        px-6 py-3 rounded-full border border-gray-200 shadow-lg w-[80%] max-w-6xl
        transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[#047857]"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M24 42V26m17.942-15.993c-.776 13.024-9.13 17.236-15.946 17.896C24.896 28.009 24 27.104 24 26v-8.372c0-.233.04-.468.125-.684C27.117 9.199 34.283 8.155 40 8.02c1.105-.027 2.006.884 1.94 1.987M7.998 6.072c9.329.685 14.197 6.091 15.836 9.558c.115.242.166.508.166.776v7.504c0 1.14-.96 2.055-2.094 1.94C7.337 24.384 6.11 14.786 6.009 8C5.993 6.894 6.897 5.99 8 6.072"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-[#047857] tracking-tight">
            reforesta
          </span>
        </Link>

        {/* Menu Desktop */}
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

        {/* Buttons Desktop */}
        <div className="hidden md:flex gap-3">
          <Link
            href="/user/register"
            className="px-5 py-1.5 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all duration-300"
          >
            Daftar
          </Link>
          <Link
            href="/user/login"
            className="px-5 py-1.5 text-sm font-medium rounded-full bg-[#047857] text-white hover:bg-[#036b4f] transition-all duration-300 shadow-sm"
          >
            Masuk
          </Link>
        </div>

        {/* Toggle Mobile */}
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

      {/* === Drawer Menu (Non-blocking) === */}
      <div
        className={`fixed top-20 right-4 w-34 max-h-[75vh] overflow-y-auto bg-white z-40 shadow-2xl border border-gray-200
        flex flex-col items-center justify-start py-6 gap-5 rounded-2xl transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-[110%]"}`}
      >
        {/* Scrollable Content */}
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
