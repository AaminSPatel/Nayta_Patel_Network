"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaChartLine, FaUsers, FaCalendarAlt, FaBookOpen, FaAddressBook, FaMapSigns, FaEnvelope, FaBlog, FaNewspaper, FaTractor } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { usePatel } from "./patelContext";

const PwaTabBar = () => {
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
const {isPWA} = usePatel();

  const navigationItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Villages", href: "/directory", icon: FaMapSigns },
    { name: "Posts", href: "/wall", icon: FaUsers },
    { name: "News", href: "/news", icon: FaNewspaper },
    { name: "Blogs", href: "/blog", icon: FaBlog },
    { name: "Stories", href: "/pehchan", icon: FaBookOpen },
    { name: "Events", href: "/events", icon: FaCalendarAlt },
    { name: "Prices", href: "/prices", icon: FaChartLine },
/*     { name: "Stories", href: "/stories", icon: FaBookOpen },
    { name: "Contact", href: "/contact", icon: FaEnvelope }, */
  ];

  const mainItems = navigationItems.slice(0, 4); // Show first 4 items in the main bar
  const menuItems = navigationItems.slice(4); // The rest go in the expanded menu

  if (!isPWA) return null;

  return (
    <>
      {/* Main Tab Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-around items-center h-16">
          {mainItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="flex-1 flex flex-col items-center justify-center">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${isActive ? "text-emerald-600" : "text-gray-600"}`}
                >
                  <item.icon className="text-xl" />
                </motion.div>
                <motion.span 
                  className={`text-xs mt-1 ${isActive ? "text-emerald-600 font-medium" : "text-gray-500"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            );
          })}
          
          {/* Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-gray-600"
            >
              {isMenuOpen ? <MdClose className="text-xl" /> : <MdMenu className="text-xl" />}
            </motion.div>
            <span className="text-xs mt-1 text-gray-500">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed bottom-16 left-0 right-0 bg-white shadow-lg z-40 rounded-t-2xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center p-3 rounded-lg ${isActive ? "bg-emerald-100 text-emerald-600" : "hover:bg-gray-100 text-gray-700"}`}
                    >
                      <item.icon className="mr-3" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PwaTabBar;