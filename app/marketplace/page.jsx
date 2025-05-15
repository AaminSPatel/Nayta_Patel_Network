"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaSearch, FaFilter, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaRupeeSign, FaTh, FaList } from "react-icons/fa"

// Sample data
const products = [
  {
    id: 1,
    title: "Holstein Friesian Cow",
    category: "Livestock",
    subcategory: "Cattle",
    price: 65000,
    location: "Chandpur",
    seller: "Raheem Khan",
    contact: "9876543210",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Healthy 4-year-old Holstein Friesian cow. Currently giving 18 liters of milk daily. Vaccinated and well-maintained.",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Tractor - Mahindra 575",
    category: "Equipment",
    subcategory: "Tractors",
    price: 450000,
    location: "Mirzapur",
    seller: "Abdul Hameed",
    contact: "9876543211",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "2018 model Mahindra 575 tractor in excellent condition. 2000 hours of use. All documents complete. New tires.",
    postedDate: "1 week ago",
  },
  {
    id: 3,
    title: "Organic Fertilizer - 50kg",
    category: "Supplies",
    subcategory: "Fertilizers",
    price: 1200,
    location: "Jalalpur",
    seller: "Mohammed Salim",
    contact: "9876543212",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "100% organic vermicompost fertilizer. Excellent for all crops. Improves soil health and increases yield naturally.",
    postedDate: "3 days ago",
  },
  {
    id: 4,
    title: "Murrah Buffalo",
    category: "Livestock",
    subcategory: "Buffalo",
    price: 85000,
    location: "Sultanpur",
    seller: "Yasir Hussain",
    contact: "9876543213",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "High-quality Murrah buffalo, 5 years old. Giving 12 liters of milk daily with high fat content. Healthy and vaccinated.",
    postedDate: "5 days ago",
  },
  {
    id: 5,
    title: "Wheat Seeds - HD 2967",
    category: "Supplies",
    subcategory: "Seeds",
    price: 3500,
    location: "Ahmadnagar",
    seller: "Zainab Khatoon",
    contact: "9876543214",
    image: "/placeholder.svg?height=300&width=400",
    description: "High-yielding wheat seeds HD 2967 variety. 100kg pack. Certified seeds with 95% germination rate.",
    postedDate: "1 day ago",
  },
  {
    id: 6,
    title: "Sprinkler Irrigation System",
    category: "Equipment",
    subcategory: "Irrigation",
    price: 25000,
    location: "Faridpur",
    seller: "Imran Ali",
    contact: "9876543215",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Complete sprinkler irrigation system for 2 acres. Includes pipes, sprinklers, and pump connection. Used for one season only.",
    postedDate: "2 weeks ago",
  },
  {
    id: 7,
    title: "Desi Chickens - 10 Birds",
    category: "Livestock",
    subcategory: "Poultry",
    price: 3000,
    location: "Rampur",
    seller: "Shabana Begum",
    contact: "9876543216",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Healthy country chickens raised on natural feed. 6 months old. Good for both eggs and meat. Free-range raised.",
    postedDate: "4 days ago",
  },
  {
    id: 8,
    title: "Power Tiller - Honda",
    category: "Equipment",
    subcategory: "Tillers",
    price: 65000,
    location: "Islampur",
    seller: "Abdul Rahman",
    contact: "9876543217",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Honda power tiller in good working condition. 5.5 HP engine. Perfect for small to medium farms. Fuel efficient.",
    postedDate: "1 month ago",
  },
  {
    id: 9,
    title: "Goats - Sirohi Breed",
    category: "Livestock",
    subcategory: "Goats",
    price: 15000,
    location: "Chandpur",
    seller: "Fatima Begum",
    contact: "9876543218",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Pair of Sirohi breed goats. Female is pregnant. Well-maintained and healthy. Good for both milk and meat.",
    postedDate: "1 week ago",
  },
  {
    id: 10,
    title: "Solar Water Pump",
    category: "Equipment",
    subcategory: "Pumps",
    price: 35000,
    location: "Mirzapur",
    seller: "Yasir Hussain",
    contact: "9876543219",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "2 HP solar water pump with panels. No electricity needed. Perfect for irrigation. Used for 6 months only.",
    postedDate: "3 weeks ago",
  },
  {
    id: 11,
    title: "Organic Pesticides - 5L",
    category: "Supplies",
    subcategory: "Pesticides",
    price: 1500,
    location: "Jalalpur",
    seller: "Mohammed Salim",
    contact: "9876543220",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Natural neem-based pesticide. Safe for organic farming. Effective against most common pests. No harmful chemicals.",
    postedDate: "2 days ago",
  },
  {
    id: 12,
    title: "Milk Cans - Set of 5",
    category: "Equipment",
    subcategory: "Dairy Equipment",
    price: 4500,
    location: "Sultanpur",
    seller: "Rehana Khatun",
    contact: "9876543221",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Stainless steel milk cans. 10L capacity each. Food-grade quality. Perfect for dairy farmers. Easy to clean and maintain.",
    postedDate: "5 days ago",
  },
]

const categories = [...new Set(products.map((product) => product.category))]
const subcategories = [...new Set(products.map((product) => product.subcategory))]
const locations = [...new Set(products.map((product) => product.location))]

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [viewMode, setViewMode] = useState("grid") // grid or list

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "" || product.category === selectedCategory) &&
      (selectedSubcategory === "" || product.subcategory === selectedSubcategory) &&
      (selectedLocation === "" || product.location === selectedLocation) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (searchTerm === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
        <p className="text-gray-600 mb-8">
          Buy and sell agricultural products, livestock, equipment, and supplies directly with other community members.
        </p>

      {/* Filters */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
  <div className="flex items-center gap-2 mb-6">
    <FaFilter className="text-emerald-500 text-xl" />
    <h2 className="text-2xl font-semibold text-gray-800">Filter Products</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    {/* Category */}
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-2">Category</label>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory("");
          }}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
      </div>
    </div>

    {/* Subcategory */}
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-2">Subcategory</label>
      <div className="relative">
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none"
          disabled={!selectedCategory}
        >
          <option value="">All Subcategories</option>
          {subcategories
            .filter((subcat) =>
              !selectedCategory || products.some((p) => p.category === selectedCategory && p.subcategory === subcat)
            )
            .map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
      </div>
    </div>

    {/* Location */}
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-2">Location</label>
      <div className="relative">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
      </div>
    </div>

    {/* Search */}
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-2">Search</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  </div>

  {/* Price Range */}
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-600 mb-2">
      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
    </label>
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min="0"
        max="500000"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="range"
        min="0"
        max="500000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <button
      onClick={() => {
        setSelectedCategory("");
        setSelectedSubcategory("");
        setSelectedLocation("");
        setSearchTerm("");
        setPriceRange([0, 500000]);
      }}
      className="text-emerald-600 hover:text-emerald-700 font-medium underline"
    >
      Reset All Filters
    </button>

    <div className="flex space-x-2">
      <button
        onClick={() => setViewMode("grid")}
        className={`flex items-center gap-1 px-4 py-2 rounded-md ${
          viewMode === "grid"
            ? "bg-emerald-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <FaTh />
        Grid
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`flex items-center gap-1 px-4 py-2 rounded-md ${
          viewMode === "list"
            ? "bg-emerald-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <FaList />
        List
      </button>
    </div>
  </div>
</div>

        {/* Products Display */}
        {filteredProducts.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-56">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{product.title}</h3>
                      <div className="text-xl font-bold text-emerald-600 flex items-center">
                        <FaRupeeSign className="text-sm" />
                        {product.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{product.location}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{product.postedDate}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">Seller: {product.seller}</div>
                      <div className="flex space-x-2">
                        <a
                          href={`tel:${product.contact}`}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md transition-colors"
                        >
                          <FaPhoneAlt />
                        </a>
                        <a
                          href={`https://wa.me/91${product.contact}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors"
                        >
                          <FaWhatsapp />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl">{product.title}</h3>
                        <div className="text-xl font-bold text-emerald-600 flex items-center">
                          <FaRupeeSign className="text-sm" />
                          {product.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{product.location}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{product.postedDate}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">Seller: {product.seller}</div>
                        <div className="flex space-x-2">
                          <a
                            href={`tel:${product.contact}`}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                          >
                            <FaPhoneAlt className="mr-2" /> Call
                          </a>
                          <a
                            href={`https://wa.me/91${product.contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                          >
                            <FaWhatsapp className="mr-2" /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              No products match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("")
                setSelectedSubcategory("")
                setSelectedLocation("")
                setSearchTerm("")
                setPriceRange([0, 500000])
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Sell Product CTA */}
        <div className="mt-12 bg-emerald-50 rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Have something to sell?</h3>
              <p className="text-gray-600">
                List your agricultural products, livestock, or equipment on our marketplace to reach buyers directly.
              </p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap">
              Post an Ad
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
