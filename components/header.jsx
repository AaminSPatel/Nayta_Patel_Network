"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { usePatel } from "../components/patelContext"
import { Menu } from "lucide-react"
import HeaderAdmin from "./HeaderAdmin"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { toggleSidebar,isSidebarOpen,user ,siteBrand,siteLogo} = usePatel()
  const isAdmin = pathname.startsWith("/admin"); // Check if the path starts with /admin
 const [userData , setUserData] = useState({})
 useEffect(()=>{
    setUserData(user)
  
 },[user])
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Prices", href: "/prices" },
    { name: "Community Wall", href: "/wall" },
    { name: "Events", href: "/events" },
    { name: "Stories", href: "/stories" },
  ]

  return (
    <>
  { isAdmin ? <HeaderAdmin/> : (<header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80"
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className={`flex items-center ${isSidebarOpen?'-z-20':'z-0'}`}>
          <button className="mr-2 md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6 text-emerald-600" />
          </button>
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <img src={siteLogo} alt="Nayta Patel Network logo image" className="h-10 w-10 rounded-full"/>
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">{siteBrand}</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href} className="relative px-2 py-1 text-sm font-medium">
              {pathname === item.href && (
                <motion.div
                  className="absolute inset-0 bg-emerald-100 rounded-md z-0"
                  layoutId="navbar-highlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </nav>

        {!userData && (<div>
          <button  className="bg-emerald-500 hover:bg-emerald-600 text-white py-1 px-2 rounded-md">
            <Link href="/signup">Join Now</Link>
          </button>
        </div>) }
        {userData &&   <Link href="/profile"><div className="cursor-pointer flex gap-0.5">
                     

          <div className="h-9 w-9 rounded-full overflow-hidden bg-emerald-500">
            <img src={userData?.profilepic?.url} alt={userData?.fullname} className="h-9 w-9 border-emerald-300 border rounded-full"/>
          </div>
          <button  className="text-emerald-500 border-2 line-clamp-1 hover:bg-emerald-600 max-h-9 hidden md:flex overflow-hidden py-1 px-2 hover:text-white rounded-3xl cursor-pointer">
            {userData?.fullname}
          </button>
         
        </div> </Link>}
      </div>
    </header>)}
    </>
  )
}
