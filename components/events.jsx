'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi'
import { usePatel } from './patelContext'

const HeroEventTicker = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
   const {events,formatDate} = usePatel()
  // Fetch events from your API
 
  // Auto-rotate events
  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % events.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [events.length])

  if (!events.length) return null

  const currentEvent = events[activeIndex]

  return (
    <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden bg-gradient-to-r from-emerald-900 to-emerald-700">
      {/* Background Image */}
      {currentEvent?.image?.url && (
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={currentEvent.image.url} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Event Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-10 text-white">
        <AnimatePresence custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl"
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-100 bg-white/20 rounded-full backdrop-blur-sm">
              {currentEvent.type}
            </div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-2 leading-tight py-1 line-clamp-2"
              whileHover={{ scale: 1.02 }}
            >
              {currentEvent.eventName}
            </motion.h2>
            
            <p className="text-lg md:text-xl mb-6 text-emerald-100 max-w-lg line-clamp-3">
              {currentEvent.content}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>{new Date(currentEvent.time.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                <span>{currentEvent.time.time}</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                <span>{currentEvent.location}</span>
              </div>
              {/* {currentEvent.attendees && (
                <div className="flex items-center">
                  <FiUsers className="mr-2" />
                  <span>{currentEvent.attendees} attending</span>
                </div>
              )} */}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        {events.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status Badge */}
      {currentEvent.eventStatus && (
        <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold ${
          currentEvent.eventStatus === 'upcoming' ? 'bg-yellow-500 text-yellow-900' :
          currentEvent.eventStatus === 'ongoing' ? 'bg-green-500 text-green-900' :
          'bg-orange-500 text-white'
        }`}>
          {currentEvent.eventStatus.toUpperCase()}
        </div>
      )}
    </div>
  )
}

export default HeroEventTicker