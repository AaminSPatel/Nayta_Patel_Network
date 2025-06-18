"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Users,
  Home,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { usePatel } from "./patelContext"

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
const {user} = usePatel()
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Blog", icon: FileText, path: "/admin/blog" },
    { name: "Stories", icon: FileText, path: "/admin/stories" },
    { name: "Events", icon: Calendar, path: "/admin/events" },
    { name: "Members", icon: Users, path: "/admin/members" },
    { name: "Villages", icon: Home, path: "/admin/villages" },
    { name: "Prices", icon: DollarSign, path: "/admin/prices" },
    { name: "Posts", icon: MessageSquare, path: "/admin/posts" },
    { name: "Feedbacks", icon: MessageCircle, path: "/admin/feedbacks" },
  ]

  return (
    <motion.div
      className={`bg-white border-l border-gray-200 h-screen ${collapsed ? "w-20" : "w-64"} transition-all duration-300 ease-in-out`}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && <h1 className="text-xl font-bold text-green-600">AdminPanel</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-lg hover:bg-gray-100">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="py-4">
        <nav>
          <ul className="space-y-1 px-2">
            {(user.role !== 'admin'? menuItems.map : menuItems.slice(0,5)).map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <div className={`sidebar-link ${pathname === item.path ? "active" : ""}`}>
                    <item.icon size={20} />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  )
}
