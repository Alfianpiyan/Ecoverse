"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function NavbarDonatur({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Gagal logout:", error.message);
    }
  };

  const navItems = [
    { name: "Beranda", path: "/user/home" },
    { name: "Tanam", path: "/user/tanam" },
    { name: "Acara", path: "/user/acara" },
  ];

  const profileItems = [
    { name: "Profile", path: "/user/home/profile" },
    { name: "Riwayat", path: "/user/home/riwayat" },
    { name: "Setting", path: "/user/home/setting" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-center mt-10 z-50 sticky top-0 left-0 bg-transparent">
      {/* Navbar Container */}
      <div
        className="flex items-center justify-between px-6 py-3 
        rounded-full border border-gray-200 shadow-md 
        w-[900px] max-w-[92%] bg-white transition-all duration-300"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Logo Reforesta"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-semibold text-green-700 text-lg tracking-tight">
            reforesta
          </span>
        </div>

        {/* Hamburger Icon for mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-green-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigasi (Desktop) */}
        <ul className="hidden md:flex items-center gap-6 font-medium relative">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="activeBorder"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#047857] rounded-full"
                    style={{ zIndex: 0 }}
                  />
                )}
                <Link
                  href={item.path}
                  className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-green-700 hover:text-green-800 hover:bg-green-50"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Dropdown Profile */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-3 py-1 hover:bg-green-50 rounded-full transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <User className="text-green-700 w-5 h-5" />
            )}
            <span className="text-green-700 font-medium">
              {user?.name || "User"}
            </span>
            <ChevronDown
              className={`text-green-700 w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
              >
                {profileItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition font-medium"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 left-0 w-full bg-white shadow-lg rounded-b-2xl border-t border-gray-200 md:hidden z-40"
          >
            <ul className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-green-700 font-medium ${
                    pathname === item.path
                      ? "bg-green-100"
                      : "hover:bg-green-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2" />
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="block text-left w-full px-4 py-2 rounded-md text-red-600 hover:bg-red-50 font-medium"
              >
                Logout
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
