"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  FaHome,
  FaChartLine,
  FaUsers,
  FaCalendarAlt,
  FaBookOpen,
  FaAddressBook,
  FaInfoCircle,
  FaEnvelope,
  FaTimes,
  FaBlog,
  FaNewspaper,
} from "react-icons/fa";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Users,
  Home,
  MessageCircle,
  
} from "lucide-react";
import { usePatel } from "./patelContext";

const navigationItems = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "News", href: "/news", icon: FaNewspaper },
  { name: "Villages", href: "/directory", icon: FaAddressBook },
  { name: "Prices", href: "/prices", icon: FaChartLine },
  { name: "Blogs", href: "/blog", icon: FaBlog },
  { name: "Posts", href: "/wall", icon: FaUsers },
  { name: "Events", href: "/events", icon: FaCalendarAlt },
  { name: "Stories", href: "/stories", icon: FaBookOpen },
  /* { name: "Learning", href: "/learning", icon: FaGraduationCap },
  { name: "Marketplace", href: "/marketplace", icon: FaStore }, */
  { name: "About", href: "/about", icon: FaInfoCircle },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
];

export default function CustomSidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // Check if the path starts with /admin
  const { isSidebarOpen, closeSidebar, siteBrand,siteLogo,isPWA , user } = usePatel();
 
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Blog", icon: FileText, path: "/admin/blog" },
    { name: "News", icon: FaNewspaper, path: "/admin/news" },
    { name: "Stories", icon: FileText, path: "/admin/stories" },
    { name: "Events", icon: Calendar, path: "/admin/events" },
    { name: "Villages", icon: Home, path: "/admin/villages" },
    { name: "Posts", icon: MessageSquare, path: "/admin/posts" },
    { name: "Prices", icon: DollarSign, path: "/admin/prices" },
    { name: "Members", icon: Users, path: "/admin/members" },
    { name: "Feedbacks", icon: MessageCircle, path: "/admin/feedbacks" },
  ];

  if(isPWA && user?.role !=='admin') return;
  return (
    <>
    
          {/* Mobile Overlay Background */}
          <div
            className={`fixed inset-0 transition-opacity md:hidden ${
              isSidebarOpen ? "opacity-100 visible " : "opacity-0 invisible "
            }`}
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <aside
            className={`fixed top-0 md:sticky left-0  h-[100vh] w-64 bg-white border-r z-50 shadow-md p-4 flex flex-col transform transition-transform duration-300
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
          >
            {/* Close Button - Mobile Only */}
            <div className="flex justify-between items-center mb-6 md:hidden bg-white">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <img src={siteLogo} alt="Nayta Patel Network logo image" className="h-10 w-10 rounded-full"/>
                </div>
                <span className="font-bold text-lg  cursor-pointer"><Link href={'/'}>{siteBrand}</Link></span>
              </div>
              <button className=" cursor-pointer" onClick={closeSidebar}>
                <FaTimes className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Desktop Logo */}
            <div className="hidden md:flex items-center justify-center mb-6">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <img src={siteLogo} alt="Nayta Patel Network logo image" className="h-10 w-10 rounded-full"/>
                  </div>
                  <span className="font-bold text-lg"> <Link href={'/'}>{siteBrand}</Link></span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <div className="mb-6">
              <h4 className="text-gray-500 uppercase text-xs px-3 mb-2">
                Navigation
              </h4>
              <nav className="space-y-1 relative">
                {!isAdmin ? (
                  navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-2 rounded-md relative transition-colors ${
                          isActive
                            ? "bg-emerald-100 text-emerald-600 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={closeSidebar}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                        {isActive && (
                          <motion.div
                            className="absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-r-md"
                            layoutId="sidebar-highlight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    );
                  })
                ) : (
                  <div className="py-4">
                    <nav>
                      <ul className="space-y-1 px-2 ">
                        {(user?.role === 'admin'? menuItems : menuItems?.slice(0,6)).map((item) => (
                          <li key={item.name}>
                            <Link href={item.path}>
                              <div
                                className={`sidebar-link ${
                                  pathname === item.path ? "active" : ""
                                }`}
                              >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}
              </nav>
            </div>

            {/* Call to Action */}
          { !isAdmin && <div className="mt-auto ">
              <h4 className="text-gray-500 uppercase text-xs px-3 mb-2">
                Join Us
              </h4>
              <Link href="/signup" onClick={closeSidebar}>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition-colors">
                  Become a Member
                </button>
              </Link>
            </div>}
          </aside>
        </>
      
  );
}
