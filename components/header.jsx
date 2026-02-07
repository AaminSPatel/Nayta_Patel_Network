"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { usePatel } from "../components/patelContext"
import { Menu } from "lucide-react"
import HeaderAdmin from "./HeaderAdmin"
import { FaBell, FaCamera, FaIdCard } from "react-icons/fa"
import NotificationModal from "./notification_model"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { toggleSidebar, isSidebarOpen, user, siteBrand, siteLogo ,isPWA,setShowWelcomeCard } = usePatel()
  const isAdmin = pathname.startsWith("/admin")
  const [notification,setNotification] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Posts", href: "/wall" },
    { name: "Events", href: "/events" },
    { name: "Stories", href: "/pehchan" },
  ]

/*   // Debugging logs
  useEffect(() => {
    //console.log("User data changed:", user)
  }, [user])
 */
  return (
    <>
      {isAdmin ? (
        <HeaderAdmin />
      ) : (
        <header
          className={`sticky top-0 z-40 w-full transition-all duration-200 ${
            isScrolled ? "bg-white shadow-md" : "bg-white/80"
          }`}
        >
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            <div className={`flex items-center ${isSidebarOpen ? '-z-20' : 'z-0'}`}>
              {!isPWA &&  <button className="mr-2 md:hidden" onClick={toggleSidebar}>
                <Menu className="h-6 w-6 text-emerald-600" />
              </button>}
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 flex items-center justify-center">
                    <img 
                      src={siteLogo} 
                      alt="Nayta Patel Network logo image" 
                      className="h-10 w-10 object-fit"
                    />
                   
                  </div>
                  {!isPWA ?<span className="font-bold text-lg  hidden sm:inline-block">{siteBrand}</span> :
                  <span className="font-bold sm:text-lg  text-sm sm:inline-block">{siteBrand}</span>}
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-4">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="relative px-2 py-1 text-sm font-medium"
                >
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

            <div className="flex items-center">
              {!user ? (
                <Link href="/signup">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-1 px-3 rounded-md text-sm">
                    Join Now
                  </button>
                </Link>
              ) : ( <div className="flex">
                <div className="flex mx-2 gap-2 items-center justify-center">
                 {pathname === '/' && user?.status === 'verified' && <button className="text-emerald-500 cursor-pointer" onClick={()=> setShowWelcomeCard(true)}><FaIdCard/> </button>}
                <NotificationModal/>
                </div>
                <Link href="/profile">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="h-9 w-9 rounded-full overflow-hidden border-4 border-emerald-500">
                      <img 
                        src={user?.profilepic?.url || '/user.avif'} 
                        alt={user?.fullname} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = '/user.avif'
                        }}
                      />
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-emerald-600 hover:text-emerald-800">
                      {user?.fullname || 'Profile'}
                    </span>
                  </div>
                </Link>
              </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  )
}