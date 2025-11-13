"use client"

import NavbarDonatur from "@/components/HomePage/NavbarDonatur"
import Footer from "@/components/landing/Footer"
import ProfileAnda from "@/components/Profilepage/ProfileAnda"

export default function Profile () {
    return(
        <>
           <NavbarDonatur/>
           <ProfileAnda />
           <br />
           <Footer />
        </>
    )
}