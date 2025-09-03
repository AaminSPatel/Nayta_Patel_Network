"use client"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCube, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cube"
import "swiper/css/pagination"
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi"
import { usePatel } from "./patelContext.js"

export default function EventCubeSlider() {
  const { events = [] } = usePatel() || {}
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(Array.isArray(events) ? events : [])
  }, [events])

  if (!items.length) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No upcoming events scheduled</p>
      </div>
    )
  }

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="relative h-[380px] sm:h-[360px]">
        <Swiper
          effect="cube"
          grabCursor
          loop
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={1000}
          pagination={{ clickable: true }}
          modules={[EffectCube, Pagination, Autoplay]}
          className="h-full w-full"
        >
          {items.map((ev) => (
            <SwiperSlide key={ev._id} className="bg-card rounded-2xl overflow-hidden">
              <div className="relative h-full">
                {ev.image && ev.image.url && (
                  <img
                    src={ev.image.url || "/placeholder.svg"}
                    alt={ev.eventName}
                    className="absolute inset-0 h-full w-full object-cover opacity-25"
                  />
                )}
                <div className="absolute inset-0 bg-primary/20" />
                <div className="relative z-10 p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block text-xs font-semibold bg-primary/15 text-primary px-2 py-1 rounded-full">
                        {ev.type}
                      </span>
                      <h3 className="mt-2 font-semibold text-lg line-clamp-2">{ev.eventName}</h3>
                    </div>
                    {ev.eventStatus && (
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        {ev.eventStatus}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-foreground/80 line-clamp-4 flex-1">{ev.content}</p>
                  <div className="space-y-1 text-sm text-foreground/80">
                    <div className="flex items-center gap-2">
                      <FiCalendar /> {ev.time && ev.time.date ? new Date(ev.time.date).toLocaleDateString("en-IN") : ""}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock /> {ev.time && ev.time.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin /> {ev.location}
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
