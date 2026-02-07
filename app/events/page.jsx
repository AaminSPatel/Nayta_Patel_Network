"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFilter,
  FaSearch,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaTh,
  FaList,
} from "react-icons/fa";
import { usePatel } from "../../components/patelContext";
import Head from "next/head";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const { events, fetchEvents, formatDate, siteUrl } = usePatel();

  const categories = [...new Set(events.map((event) => event.type))];
  const locations = [...new Set(events.map((event) => event.location.name))];
  useEffect(() => {
    fetchEvents();
  }, []);
  //console.log(events);

  const filteredEvents = events.filter((event) => {
    return (
      (selectedCategory === "" || event.type === selectedCategory) &&
      (selectedLocation === "" || event.location.name === selectedLocation) &&
      (searchTerm === "" ||
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
        <title>
          Nayata Samaj me Programms | Kisan Events, Training & Village
          Development Programs || Nayata Patel Programs
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Stay updated on upcoming community events, farmer training programs, and development activities in villages across Indore, Ujjain, Dhar, Dewas, and Ratlam.Nayata Patel Samaj me hone wali events aur programs, Indore , Ujjain me Nayata Patel."
        />
        <meta
          name="keywords"
          content="agriculture events, farmer meetings, rural training, village development, Nayta Patel events,Nayata Patel Samaj, Nayata Patel, Indore, Ujjain, Dewas, Dhar, Ratlam"
        />
        <meta name="author" content="Nayta Patel Network" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/events`} />
        <meta
          property="og:title"
          content="Nayata Patel Programs | Agriculture, Training & Village Development Programs"
        />
        <meta
          property="og:description"
          content="Know about our latest events and initiatives in farming, milk production, and village empowerment in MP."
        />
        <meta property="og:image" content={`${events[0]?.image?.url}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/events`} />
        <meta
          name="twitter:title"
          content="Community Events | Agriculture & Rural Empowerment"
        />
        <meta
          name="twitter:description"
          content="Farmer awareness programs, milk production training, and events across 250 villages."
        />
        <meta name="twitter:image" content={`${events[0]?.image?.url}`} />

        <link rel="canonical" href={`${siteUrl}/events`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              },
            }}
            className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
          >
            नायता पटेल समाज के आगामी कार्यक्रम
          </motion.h2>
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              },
            }}
            className="text-lg text-gray-700"
          >
            सीखें, जुड़ें और एक साथ बढ़ें! कृषि प्रशिक्षण से लेकर समाज के
            कार्यक्रमों तक - हर किसी के लिए है खास आयोजन।{" "}
          </motion.p>
        </motion.div>
      
        <div className="bg-white rounded-lg shadow-lg px-6 py-4 mb-6">
          {/* Header with filter toggle and view mode buttons */}
          <div className="flex justify-between items-center ">
            <div className="flex items-center">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center text-emerald-500 hover:text-emerald-600 mr-4"
              >
                <FaFilter className="text-2xl mr-2" />
                <span className="text-lg font-semibold">Filters</span>
                {isFiltersOpen ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
            </div>

            <div className=" space-x-2 hidden sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition duration-300`}
                aria-label="Grid view"
              >
                <FaTh className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition duration-300`}
                aria-label="List view"
              >
                <FaList className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Collapsible filter content */}
          {isFiltersOpen && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
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
            </div>
          )}
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
                    <img
                      src={event?.image?.url || "/placeholder.svg"}
                      alt={event.eventName}
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {event.type}
                    </div>
                  </div>
                  <div className="py-4 px-4">
                    <h3 className="font-bold text-xl mb-2">
                      {event.eventName}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDate(event.time.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2 text-sm">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event?.location}</span>
                    </div>
                    <div className="  hidden items-center text-gray-600 mb-4">
                      <FaUsers className="mr-2" />
                      <span> attending</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-8 max-h-35">
                      {event.content}
                    </p>
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
                      <img
                        src={event?.image?.url || "/placeholder.svg"}
                        alt={event.eventName}
                        loading="lazy"
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {event.type}
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="font-bold text-xl mb-2">
                        {event.eventName}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span>{event.datetime}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{event.location.name}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaUsers className="mr-2" />
                        <span> attending</span>
                      </div>
                      <p className="text-gray-600 mb-4 text-xs">
                        {event.content}
                      </p>
                    
                      
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
              No events match your current filters. Try adjusting your search
              criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedLocation("");
                setSearchTerm("");
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
              <h3 className="text-2xl font-bold mb-2">
                Have an event to share?
              </h3>
              <p className="text-gray-600">
                If you're organizing an event that would benefit our community,
                let us know and we'll help spread the word.
              </p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap">
              Host an Event
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
