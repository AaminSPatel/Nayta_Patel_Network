'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCube, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiChevronRight } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { usePatel } from './patelContext'


const EventCubeSlider = () => {
  const [allEvents, setAllEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const {events} = usePatel()
  useEffect(() => {
    if(events){
        setAllEvents(events)
        setLoading(false)
    }
  }, [events])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!events.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No upcoming events scheduled</p>
      </div>
    )
  }

  return (
    <div className="relative max-w-xl h-auto mx-auto py-4 px-4">
  
      <div className="relative sm:h-[350px] h-[400px] sm:mb-0 mb-12">
        <Swiper
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
            loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          speed={1000}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          
          modules={[EffectCube, Pagination, Autoplay]}
          className="h-full w-full"
        >
          {allEvents.map((event) => (
            <SwiperSlide key={event._id} className="bg-white rounded-xl overflow-hidden">
              <div className="relative h-full flex flex-col">
                {/* Event Image */}
                {event.image?.url && (
                  <div className="absolute w-full h-full z-0 opacity-30 overflow-hidden">
                    <img
                      src={event.image?.url}
                      alt={event.eventName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                  <div className="absolute w-full h-full z-0 opacity-30 bg-green-600"></div>

                {/* Event Content */}
                <div className="p-6 flex-1 flex flex-col z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full mb-2">
                        {event.type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800  line-clamp-3  sm:pt-1 pt-2">{event.eventName}</h3>
                    </div>
                    {event.eventStatus && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.eventStatus === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        event.eventStatus === 'ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.eventStatus}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-800 mb-3 text-sm line-clamp-5 flex-1">{event.content}</p>
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-700">
                      <FiCalendar className="mr-2 text-white" />
                      <span>{new Date(event.time.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiClock className="mr-2 text-white" />
                      <span>{event.time.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiMapPin className="mr-2 text-white" />
                      <span>{event.location}</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default EventCubeSlider