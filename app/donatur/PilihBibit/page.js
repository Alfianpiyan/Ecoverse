"use client";
// import NavbarDonatur from "@/components/HomePage/NavbarDonatur";
import TanamPohonPage from "@/components/pilihBibitpage/pilihBibit";
import Footer from "@/components/landing/Footer";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HalPilihBibit() {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        name: "User",
        photo: "/profil.png", 
    });

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
        <>
        <nav className="w-full flex justify-center mt-6">
            <div className="flex items-center justify-between w-[90%] max-w-3xl px-6 py-2 rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-gray-100">
                <div className="flex items-center gap-2">
                <Image
                    src="/Logo.png"
                    alt="Logo Reforesta"
                    width={28}
                    height={28}
                    className="object-contain"
                />
                <span className="font-semibold text-green-700 text-lg">reforesta</span>
                </div>

                <h1 className="text-green-800 font-bold text-lg">Nama Acara</h1>

                {/* dropdown */}
                <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-green-50 px-3 py-1.5 rounded-full transition-all"
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
                    <ChevronDown
                    className={`text-green-700 w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    />
                </div>

                <AnimatePresence>
                    {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                        <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition font-medium"
                        >
                        Logout
                        </button>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
        </nav>
        <TanamPohonPage/>
        
        <Footer/>
        </>
    )
}