"use client"

import { useState, useEffect } from "react"
import {
  FaFilter,
  FaSearch,
  FaTh,
  FaList,
  FaCalendarAlt,
  FaLocationArrow,
  FaSpinner,
  FaEye,
  FaArrowsAltV,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"
import { usePatel } from "../../components/patelContext"
import Head from "next/head"
import {motion} from "framer-motion"

export default function MandiPricesPage() {
  const { prices,siteUrl } = usePatel()
  const [selectedState, setSelectedState] = useState("Madhya Pradesh")
  const [selectedMandi, setSelectedMandi] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("list")
  const [mandiData, setMandiData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("grain")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [currentMandiIndex, setCurrentMandiIndex] = useState(0)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setMandiData(prices || [])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }
    fetchData()
  }, [prices])

  // Get unique states and mandis for filters
  const states = [...new Set(mandiData.map((item) => item.state))].sort()
  const mandis = [...new Set(mandiData.map((item) => item.mandiName))].sort()

  // Filter data based on selections
  const filteredData = mandiData.filter((mandi) => {
    return (
      (selectedState === "" || mandi.state === selectedState) &&
      (selectedMandi === "" || mandi.mandiName === selectedMandi) &&
      (searchTerm === "" ||
        mandi.mandiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mandi.mandiLocation?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Navigate between mandis
  const navigateMandi = (direction) => {
    if (direction === "next" && currentMandiIndex < filteredData.length - 1) {
      setCurrentMandiIndex(currentMandiIndex + 1)
    } else if (direction === "prev" && currentMandiIndex > 0) {
      setCurrentMandiIndex(currentMandiIndex - 1)
    }
  }

  // Get current mandi data
  const currentMandi = filteredData[currentMandiIndex] || null

  // Extract price data for the current category
  const extractPriceData = (prices, category) => {
    if (!prices || !prices[category]) return []

    const result = []
    const categoryData = prices[category]

    Object.entries(categoryData).forEach(([itemName, itemData]) => {
      // Handle nested items (gram, garlic, potato)
      if (typeof itemData === "object" && !itemData.currentPrice) {
        Object.entries(itemData).forEach(([subItemName, subItemData]) => {
          result.push({
            name: `${itemName} (${subItemName.replace(/_/g, " ")})`,
            ...subItemData,
          })
        })
      } else {
        // Handle simple items
        result.push({
          name: itemName.replace(/_/g, " "),
          ...itemData,
        })
      }
    })

    return result
  }

  // Get price data for the current mandi and category
  const currentPriceData = currentMandi ? extractPriceData(currentMandi.prices, activeCategory) : []

  // Sort the price data if needed
  const sortedPriceData = sortConfig.key
    ? [...currentPriceData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    : currentPriceData

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="h-8 w-8 text-emerald-500 animate-spin" />
          <p className="text-lg text-gray-600">Loading mandi prices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
          initial="hidden"
          animate="visible"
          variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={{ hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }}}
            className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
          >
Mandi Price Dashboard          </motion.h2>
          <motion.p 
            variants={{
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }}
            className="text-lg text-gray-700"
          >
ताजा बाजार भाव: आपके क्षेत्र के कृषि उत्पादों के रीयल-टाइम अपडेट्स। हमारा डेटा रोजाना अपडेट होता है ताकि आप सही निर्णय ले सकें!   </motion.p>
        </motion.div>
<Head>
  <title>Daily Mandi Prices | Vegetables, Grains & Milk Rates in MP</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="description" content="Live updates of mandi prices for vegetables, grains, and milk from Indore, Ratlam, Ujjain, Dewas, and Dhar regions." />
  <meta name="keywords" content="mandi price, sabji rate, milk rate, kisan mandi, Indore mandi, MP vegetables, tomato, potato, wheat price, MP market rate" />
  <meta name="author" content="Nayta Patel Network" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/prices`} />
  <meta property="og:title" content="Daily Mandi Prices | MP Market Rates Live" />
  <meta property="og:description" content="Get updated mandi rates daily for farming, trading, and village planning." />
  <meta property="og:image" content={`${siteUrl}/prices.jpg`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`${siteUrl}/prices`} />
  <meta name="twitter:title" content="Live Mandi Rates | Vegetables, Milk & Crops" />
  <meta name="twitter:description" content="Stay ahead with live updates on mandi prices in your area." />
  <meta name="twitter:image" content={`${siteUrl}/prices.jpg`} />

  <link rel="canonical" href={`${siteUrl}/prices`} />
  <link rel="icon" href={`${siteUrl}/favicon.ico`} />
</Head>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-emerald-500" />
          <h2 className="text-xl font-semibold text-gray-800">Filter Mandis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* State Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value)
                setSelectedMandi("")
                setCurrentMandiIndex(0)
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Mandi Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mandi</label>
            <select
              value={selectedMandi}
              onChange={(e) => {
                setSelectedMandi(e.target.value)
                setCurrentMandiIndex(0)
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              disabled={!selectedState}
            >
              <option value="">All Mandis</option>
              {mandis && mandis?.filter(
                  (mandi) =>
                    selectedState === "" || mandiData.find((m) => m.mandiName === mandi)?.state === selectedState,
                ).map((mandi) => (
                  <option key={mandi} value={mandi}>
                    {mandi}
                  </option>
                ))}
            </select>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Search Mandi</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search mandis..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentMandiIndex(0)
                }}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => {
              setSelectedState("")
              setSelectedMandi("")
              setSearchTerm("")
              setCurrentMandiIndex(0)
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Reset Filters
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                viewMode === "grid" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaTh className="mr-1" /> Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                viewMode === "list" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaList className="mr-1" /> Table
            </button>
          </div>
        </div>
      </div>

      {/* Mandi Navigation */}
      {filteredData.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Showing mandi {currentMandiIndex + 1} of {filteredData.length}
          </div>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-md border ${
                currentMandiIndex === 0
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => navigateMandi("prev")}
              disabled={currentMandiIndex === 0}
            >
              <FaChevronLeft className="mr-1" /> Previous Mandi
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-md border ${
                currentMandiIndex >= filteredData.length - 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => navigateMandi("next")}
              disabled={currentMandiIndex >= filteredData.length - 1}
            >
              Next Mandi <FaChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Mandi Price Display */}
      {filteredData.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Mandi Header */}
          <div className= "bg-gradient-to-r from-emerald-500 via-55% to-emerald-600 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">{currentMandi.mandiName}</h2>
                <div className="flex items-center mt-2">
                  <FaLocationArrow className="mr-2" />
                  <span>
                    {currentMandi.mandiLocation}, {currentMandi.state}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <FaCalendarAlt className="mr-2" />
                <span>Updated: {formatDate(currentMandi.date)}</span>
              </div>
            </div>
            {currentMandi.intro && <p className="mt-4 text-emerald-100">{currentMandi.intro}</p>}
          </div>

          {/* Price Categories */}
          <div className="p-6">
            <div className="flex overflow-x-auto mb-6 border-b">
              {["grain", "vegetable", "dairy", "oil", "others"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 font-medium capitalize ${
                    activeCategory === category
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Price Details */}
            {sortedPriceData.length > 0 ? (
              viewMode === "list" ? (
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("name")}
                        >
                          <div className="flex items-center">
                            Commodity
                            <FaArrowsAltV className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("currentPrice")}
                        >
                          <div className="flex items-center">
                            Current Price (₹)
                            <FaArrowsAltV className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("minPrice")}
                        >
                          <div className="flex items-center">
                            Min Price (₹)
                            <FaArrowsAltV className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("maxPrice")}
                        >
                          <div className="flex items-center">
                            Max Price (₹)
                            <FaArrowsAltV className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedPriceData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium capitalize">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">₹{item.currentPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.minPrice ? `₹${item.minPrice}` : "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.maxPrice ? `₹${item.maxPrice}` : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
                  {sortedPriceData.map((item, index) => (
                    <PriceCard key={index} item={item} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500">No {activeCategory} prices available for this mandi</div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <FaEye className="h-12 w-12 text-gray-300" />
            <p className="text-gray-500 text-lg">No mandis found matching your filters</p>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
              onClick={() => {
                setSelectedState("")
                setSelectedMandi("")
                setSearchTerm("")
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Price Card Component
const PriceCard = ({ item }) => {
  const priceChange =
    item.currentPrice && item.previousPrice
      ? (((item.currentPrice - item.previousPrice) / item.previousPrice) * 100).toFixed(1)
      : null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold capitalize mb-4 border-b-emerald-400 border-b pb-2 "> {item.name.toLowerCase().includes('gram')?item.name.toLowerCase().replace(/\bgram\b/g, "Chana"):item.name}</h3>
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Price:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">₹{item.currentPrice}</span>
            {priceChange && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  priceChange > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}
              </span>
            )}
          </div>
        </div>

        {item.minPrice && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Min Price:</span>
            <span>₹{item.minPrice}</span>
          </div>
        )}

        {item.maxPrice && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Max Price:</span>
            <span>₹{item.maxPrice}</span>
          </div>
        )}
      </div>
    </div>
  )
}
