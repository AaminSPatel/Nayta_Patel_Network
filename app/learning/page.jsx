"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaSearch, FaFilter, FaPlay, FaFileDownload, FaBookOpen, FaGraduationCap } from "react-icons/fa"
import { usePatel } from "../../components/patelContext"
import Head from "next/head"

// Sample data
const learningContent = [
  {
    id: 1,
    title: "Modern Organic Farming Techniques",
    category: "Farming",
    level: "Beginner",
    duration: "45 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Learn the fundamentals of organic farming, including soil preparation, natural pest control, and crop rotation strategies for better yields.",
    author: "Dr. Imran Khan",
    views: 1250,
    type: "Video",
  },
  {
    id: 2,
    title: "Dairy Management for Small Holders",
    category: "Dairy",
    level: "Intermediate",
    duration: "1 hour",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Comprehensive guide to managing a small dairy farm, covering nutrition, health management, and milk quality improvement techniques.",
    author: "Fatima Begum",
    views: 980,
    type: "Course",
  },
  {
    id: 3,
    title: "Government Schemes for Farmers",
    category: "Government",
    level: "Beginner",
    duration: "30 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Detailed overview of current government schemes, subsidies, and programs available for farmers, with application procedures.",
    author: "Abdul Hameed",
    views: 1560,
    type: "PDF",
  },
  {
    id: 4,
    title: "Water Conservation in Agriculture",
    category: "Environment",
    level: "Intermediate",
    duration: "50 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Practical techniques for water conservation in farming, including drip irrigation, rainwater harvesting, and efficient water management.",
    author: "Yasir Hussain",
    views: 870,
    type: "Video",
  },
  {
    id: 5,
    title: "Digital Marketing for Farm Products",
    category: "Marketing",
    level: "Advanced",
    duration: "1.5 hours",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Learn how to market your agricultural products online, create a digital presence, and connect directly with consumers.",
    author: "Zainab Khatoon",
    views: 1120,
    type: "Course",
  },
  {
    id: 6,
    title: "Livestock Health Management",
    category: "Livestock",
    level: "Intermediate",
    duration: "1 hour",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Essential practices for maintaining livestock health, preventing common diseases, and basic veterinary care for cattle and goats.",
    author: "Dr. Mohammed Salim",
    views: 1340,
    type: "Video",
  },
  {
    id: 7,
    title: "Financial Literacy for Rural Families",
    category: "Education",
    level: "Beginner",
    duration: "40 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Basic financial concepts, savings strategies, and budget management techniques tailored for rural households.",
    author: "Rehana Khatun",
    views: 950,
    type: "PDF",
  },
  {
    id: 8,
    title: "Sustainable Cattle Rearing",
    category: "Livestock",
    level: "Advanced",
    duration: "1.2 hours",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Advanced techniques for sustainable cattle management, focusing on nutrition, breeding, and environmentally friendly practices.",
    author: "Abdul Rahman",
    views: 780,
    type: "Course",
  },
  {
    id: 9,
    title: "Women's Self-Help Groups",
    category: "Women Empowerment",
    level: "Beginner",
    duration: "35 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Guide to forming and managing women's self-help groups, including microfinance, collective bargaining, and enterprise development.",
    author: "Shabana Begum",
    views: 1050,
    type: "Video",
  },
  {
    id: 10,
    title: "Digital Literacy Basics",
    category: "Education",
    level: "Beginner",
    duration: "1 hour",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Introduction to smartphones, internet, and basic applications useful for farmers and rural communities.",
    author: "Imran Ali",
    views: 1680,
    type: "Course",
  },
  {
    id: 11,
    title: "Organic Pest Management",
    category: "Farming",
    level: "Intermediate",
    duration: "55 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description: "Natural and organic methods to control pests and diseases in crops without harmful chemicals.",
    author: "Dr. Imran Khan",
    views: 920,
    type: "Video",
  },
  {
    id: 12,
    title: "Children's Education Rights",
    category: "Education",
    level: "Beginner",
    duration: "25 minutes",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Information about children's right to education, available scholarships, and importance of keeping children in school.",
    author: "Fatima Siddiqui",
    views: 760,
    type: "PDF",
  },
]

const categories = [...new Set(learningContent.map((item) => item.category))]
const levels = ["Beginner", "Intermediate", "Advanced"]
const types = ["Video", "PDF", "Course"]

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const {siteUrl} = usePatel()
  const filteredContent = learningContent.filter((item) => {
    return (
      (selectedCategory === "" || item.category === selectedCategory) &&
      (selectedLevel === "" || item.level === selectedLevel) &&
      (selectedType === "" || item.type === selectedType) &&
      (searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
  <title>Learning Hub | Farming Knowledge, Milk Production & Rural Skills</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="description" content="Learn modern farming, milk production techniques, mandi trading, and community development with easy guides and expert tips." />
  <meta name="keywords" content="farming guide, mandi trading, milk business, MP kisan knowledge, rural learning, kheti siksha, kisani siksha" />
  <meta name="author" content="Nayta Patel Network" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/learning`} />
  <meta property="og:title" content="Learning Hub | Kisan & Samaj Education" />
  <meta property="og:description" content="Learn to grow, produce, and trade better with our farming knowledge base." />
  <meta property="og:image" content={`${siteUrl}/learning.jpg`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`${siteUrl}/learning`} />
  <meta name="twitter:title" content="Farming & Milk Production Learning Platform" />
  <meta name="twitter:description" content="From kheti to mandi – everything you need to learn in one place." />
  <meta name="twitter:image" content={`${siteUrl}/learning.jpg`} />

  <link rel="canonical" href={`${siteUrl}/learning`} />
  <link rel="icon" href={`${siteUrl}/favicon.ico`} />
</Head>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
        <p className="text-gray-600 mb-8">
          Access educational resources to enhance your knowledge and skills. From farming techniques to financial
          literacy, we have content for everyone.
        </p>

     {/* Filters */}
<div className="bg-white rounded-lg shadow-lg p-8 mb-10">
  <div className="flex items-center mb-6">
    <FaFilter className="text-emerald-500 mr-4 text-2xl" />
    <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
      <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Levels</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
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
          placeholder="Search content..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 pl-12 p-3"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  </div>
</div>

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningContent.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="bg-gray-100 rounded-full px-2 py-1">{item.category}</span>
                    <span className="mx-2">•</span>
                    <span>{item.level}</span>
                    <span className="mx-2">•</span>
                    <span>{item.duration}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.views} views</span>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                      {item.type === "Video" ? (
                        <>
                          <FaPlay className="mr-2" /> Watch
                        </>
                      ) : item.type === "PDF" ? (
                        <>
                          <FaFileDownload className="mr-2" /> Download
                        </>
                      ) : (
                        <>
                          <FaBookOpen className="mr-2" /> Start
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Content */}
        <h2 className="text-2xl font-bold mb-6">All Learning Resources</h2>
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-40">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.type}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="bg-gray-100 rounded-full px-2 py-1">{item.category}</span>
                    <span className="mx-2">•</span>
                    <span>{item.level}</span>
                    <span className="mx-2">•</span>
                    <span>{item.duration}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.views} views</span>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 text-sm rounded-md transition-colors flex items-center">
                      {item.type === "Video" ? (
                        <>
                          <FaPlay className="mr-1" /> Watch
                        </>
                      ) : item.type === "PDF" ? (
                        <>
                          <FaFileDownload className="mr-1" /> Download
                        </>
                      ) : (
                        <>
                          <FaBookOpen className="mr-1" /> Start
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No content found</h3>
            <p className="text-gray-600 mb-4">
              No learning resources match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("")
                setSelectedLevel("")
                setSelectedType("")
                setSearchTerm("")
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Become an Educator CTA */}
        <div className="mt-12 bg-emerald-50 rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Have knowledge to share?</h3>
              <p className="text-gray-600">
                If you have expertise in farming, livestock, education, or any other relevant field, consider becoming
                an educator on our platform.
              </p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap flex items-center">
              <FaGraduationCap className="mr-2" />
              Become an Educator
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
