"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaCalendarAlt, FaMapMarkerAlt, FaFilter, FaSearch, FaUsers } from "react-icons/fa"
import { usePatel } from "../../components/patelContext"
import Head from "next/head"

// Sample data
const eventsData = [
  {
    id: 1,
    name: "Organic Farming Workshop",
    date: "May 15, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Chandpur Community Center",
    image: "/placeholder.svg?height=200&width=300",
    category: "Farming",
    description:
      "Learn advanced organic farming techniques from expert farmers. Topics include soil health, natural pest control, and crop rotation strategies.",
    attendees: 45,
  },
  {
    id: 2,
    name: "Youth Digital Skills Training",
    date: "May 22, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "Mirzapur High School",
    image: "/placeholder.svg?height=200&width=300",
    category: "Education",
    description:
      "A comprehensive training program for rural youth to learn basic computer skills, internet usage, and mobile applications for agriculture.",
    attendees: 30,
  },
  {
    id: 3,
    name: "Women's Dairy Management",
    date: "June 5, 2023",
    time: "11:00 AM - 3:00 PM",
    location: "Sultanpur Panchayat Hall",
    image: "/placeholder.svg?height=200&width=300",
    category: "Dairy",
    description:
      "Workshop focused on dairy farm management, milk quality improvement, and forming women's cooperatives for better market access.",
    attendees: 38,
  },
  {
    id: 4,
    name: "Cattle Health Camp",
    date: "June 12, 2023",
    time: "8:00 AM - 5:00 PM",
    location: "Ahmadnagar Veterinary Center",
    image: "/placeholder.svg?height=200&width=300",
    category: "Livestock",
    description:
      "Free veterinary check-ups for cattle. Vaccination and basic treatments will be provided. Experts will share tips on cattle nutrition and care.",
    attendees: 120,
  },
  {
    id: 5,
    name: "Government Schemes Awareness",
    date: "June 18, 2023",
    time: "10:00 AM - 1:00 PM",
    location: "Jalalpur Community Hall",
    image: "/placeholder.svg?height=200&width=300",
    category: "Government",
    description:
      "Information session about various government schemes for farmers, including subsidies, loans, and insurance programs.",
    attendees: 75,
  },
  {
    id: 6,
    name: "Water Conservation Workshop",
    date: "June 25, 2023",
    time: "9:00 AM - 12:00 PM",
    location: "Rampur Agricultural College",
    image: "/placeholder.svg?height=200&width=300",
    category: "Environment",
    description:
      "Learn effective water conservation techniques for agriculture, including drip irrigation, rainwater harvesting, and watershed management.",
    attendees: 55,
  },
  {
    id: 7,
    name: "Agricultural Marketing Strategies",
    date: "July 3, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Faridpur Farmer's Club",
    image: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    description:
      "Workshop on effective marketing strategies for agricultural products, direct selling techniques, and using digital platforms.",
    attendees: 40,
  },
  {
    id: 8,
    name: "Children's Education Fair",
    date: "July 10, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Islampur Central School",
    image: "/placeholder.svg?height=200&width=300",
    category: "Education",
    description:
      "Educational fair for rural children with interactive learning activities, scholarship information, and career guidance.",
    attendees: 150,
  },
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid or list
const {events, fetchEvents,formatDate,siteUrl} = usePatel();

const categories = [...new Set(events.map((event) => event.type))]
const locations = [...new Set(events.map((event) => event.location.name))]
useEffect(()=>{
  fetchEvents();
},[])
console.log(events);

  const filteredEvents = events.filter((event) => {
    return (
      (selectedCategory === "" || event.type === selectedCategory) &&
      (selectedLocation === "" || event.location.name === selectedLocation) &&
      (searchTerm === "" ||
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
  <title>Nayata Samaj me Programms | Kisan Events, Training & Village Development Programs || Nayata Patel Programs</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="robots" content="index, follow" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="theme-color" content="#4CAF50" />
  <meta name="description" content="Stay updated on upcoming community events, farmer training programs, and development activities in villages across Indore, Ujjain, Dhar, Dewas, and Ratlam.Nayata Patel Samaj me hone wali events aur programs, Indore , Ujjain me Nayata Patel." />
  <meta name="keywords" content="agriculture events, farmer meetings, rural training, village development, Nayta Patel events,Nayata Patel Samaj, Nayata Patel, Indore, Ujjain, Dewas, Dhar, Ratlam" />
  <meta name="author" content="Nayta Patel Network" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/events`} />
  <meta property="og:title" content="Nayata Patel Programs | Agriculture, Training & Village Development Programs" />
  <meta property="og:description" content="Know about our latest events and initiatives in farming, milk production, and village empowerment in MP." />
  <meta property="og:image" content={`${events[0]?.image?.url}`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`${siteUrl}/events`} />
  <meta name="twitter:title" content="Community Events | Agriculture & Rural Empowerment" />
  <meta name="twitter:description" content="Farmer awareness programs, milk production training, and events across 250 villages." />
  <meta name="twitter:image" content={`${events[0]?.image?.url}`} />

  <link rel="canonical" href={`${siteUrl}/events`} />
  <link rel="icon" href={`${siteUrl}/favicon.ico`} />
</Head>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-gray-600 mb-8">
          Join our community events to learn, connect, and grow together. From farming workshops to educational
          programs, there's something for everyone.
        </p>

       {/* Filters */}
<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <div className="flex items-center mb-6">
    <FaFilter className="text-emerald-500 mr-3 text-2xl" />
    <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 pl-10 p-3"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  </div>

  <div className="flex justify-end">
    <div className="flex space-x-3">
      <button
        onClick={() => setViewMode("grid")}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          viewMode === "grid" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } transition duration-300`}
      >
        Grid
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          viewMode === "list" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } transition duration-300`}
      >
        List
      </button>
    </div>
  </div>
</div>

        {/* Events Display */}
        {filteredEvents.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image src={event?.image?.url || "/placeholder.svg"} alt={event.eventName} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {event.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{event.eventName}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        {formatDate(event.datetime)} 
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event?.location}</span>
                    </div>
                    <div className="  hidden items-center text-gray-600 mb-4">
                      <FaUsers className="mr-2" />
                      <span> attending</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-5 h-16">{event.content}</p>
                  
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                      <Image src={event?.image?.url || "/placeholder.svg"} alt={event.eventName} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {event.type}
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="font-bold text-xl mb-2">{event.eventName}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span>
                          {event.datetime}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{event.location.name}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaUsers className="mr-2" />
                        <span> attending</span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.content}</p>
                     {/*  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors">
                        Register Now
                      </button> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              No events match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("")
                setSelectedLocation("")
                setSearchTerm("")
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Host Event CTA */}
        <div className="mt-12 bg-emerald-50 rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Have an event to share?</h3>
              <p className="text-gray-600">
                If you're organizing an event that would benefit our community, let us know and we'll help spread the
                word.
              </p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap">
              Host an Event
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
