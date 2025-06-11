"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoNotifications, IoCheckmarkCircle, IoWarning, IoInformationCircle } from "react-icons/io5"
import { usePatel } from "./patelContext"

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Successful",
      message: "Your subscription has been renewed successfully",
      type: "success",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
    },
    {
      id: 2,
      title: "System Update",
      message: "New features have been added to your dashboard",
      type: "info",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "New login detected from unknown device",
      type: "warning",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
    },
    {
      id: 4,
      title: "Welcome!",
      message: "Thanks for joining our platform. Get started with your first project",
      type: "info",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
    },
    {
      id: 5,
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      type: "success",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
    },
  ])
  const {user} = usePatel();
 useEffect(()=>{
  if(user){
    setNotifications(user.notifications)
  }
 },[user])

  

  const modalRef = useRef(null)
  const buttonRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

const getTimeAgo = (timestamp) => {
  // Convert timestamp to Date object if it's a string
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Calculate time differences
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / (60 * 60));
  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  const weeks = Math.floor(diffInSeconds / (60 * 60 * 24 * 7));
  const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
  const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));

  // Return appropriate time string
  if (diffInSeconds < 5) return "Just now";
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
      case "warning":
        return <IoWarning className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
      case "info":
      default:
        return <IoInformationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
    }
  }

  // Get notification colors based on type
  const getNotificationColors = (type, read) => {
    const baseClasses = read ? "bg-gray-50" : "bg-white"

    switch (type) {
      case "success":
        return `${baseClasses} border-l-4 border-emerald-500 hover:bg-emerald-50`
      case "warning":
        return `${baseClasses} border-l-4 border-yellow-500 hover:bg-yellow-50`
      case "info":
      default:
        return `${baseClasses} border-l-4 border-blue-500 hover:bg-blue-50`
    }
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative w-full sm:w-96">
      {/* Notification Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Notifications"
      >
        <IoNotifications className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 rounded-full" />

        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 sm:-right-1 left-4 bg-gray-500 text-white text-xs rounded-full sm:w-5 sm:h-5 h-4 w-4 flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Notification Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute sm:right-0 -right-14 sm:ml-0 ml-1 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <IoNotifications className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => markAsRead(notification._id)}
                      className={`px-4 py-3 cursor-pointer transition-colors duration-200 ${getNotificationColors(notification.type, notification.read)}`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-xs sm:text-sm font-medium ${notification.read ? "text-gray-600" : "text-gray-900"}`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                            )}
                          </div>
                          <p
                            className={`text-xs sm:text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{getTimeAgo(notification.createdAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <button className="w-full text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
