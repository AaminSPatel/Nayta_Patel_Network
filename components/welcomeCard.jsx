"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

export default function WelcomeCard({ user, onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const cardRef = useRef(null)

  // Close card when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300) // Wait for animation to finish
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          />

          {/* Card Container */}
          <div className="flex min-h-screen items-start pt-24 justify-center p-4">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-xl shadow-xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="fixed top-10 -mt-4 right-0 z-10 p-2 text-white hover:text-emerald-100 cursor-pointer transition-colors"
                aria-label="Close welcome card"
              >
                <FaTimes size={24} />
              </button>

              {/* Card Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-300 overflow-hidden shadow-md">
                      <img 
                        src={user?.profilepic?.url || '/user.png'} 
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-800">
                      नायता पटेल नेटवर्क में आपका स्वागत है!
                    </h2>
                    <p className="text-sm text-emerald-600">
                      प्रिय {user?.fullname || 'सदस्य'}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="prose prose-emerald text-sm text-emerald-700 mb-6">
                  <p>
                    आपका हमारे नायता पटेल नेटवर्क में स्वागत है! हमारा यह डिजिटल परिवार 
                    मध्य प्रदेश के नायता पटेल समाज को जोड़ने और समृद्ध करने के लिए समर्पित है।
                  </p>
                  <p className="mt-3 font-medium">
                    आपकी सदस्यता हमारे लिए मूल्यवान है!
                  </p>
                </div>

                {/* Footer */}
                <div className="text-center border-t border-emerald-100 pt-4">
                  <p className="text-sm font-semibold text-emerald-600">
                    नायता पटेल नेटवर्क - मध्य प्रदेश
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">
                    naytapatelnetwork.vercel.app
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}