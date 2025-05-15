"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, Menu, Search, User } from "lucide-react"
import { usePatel } from "./patelContext"
import Image from "next/image"

export default function HeaderAdmin() {
  const [notifications, setNotifications] = useState(5)
  const [messages, setMessages] = useState(3)
  const {toggleSidebar,user,siteBrand,siteLogo} = usePatel()
  return (
    <motion.header
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
          <button className="mr-2 cursor-pointer md:hidden" onClick={toggleSidebar}>
                    <Menu className="h-6 w-6 text-emerald-600" />
          </button>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Mail size={20} />
              {messages > 0 && (
                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200 mx-2"></div>

          <button className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
              <img src={user?.profilepic?.url}   className='h-8 w-8 rounded-full' alt={user?.fullname}/> 
            </div>
            <span className="hidden md:inline-block">{user?.fullname}</span>
          </button>
        </div>
      </div>
    </motion.header>
  )
}
