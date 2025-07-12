"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCalendar,
  FaTag,
  FaSort,
} from "react-icons/fa"
import { usePatel } from "../../components/patelContext"
import Link from "next/link"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showShareOptions, setShowShareOptions] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedLink, setCopiedLink] = useState(null)

  const { blogs, siteUrl, removeAsterisks } = usePatel()

  const POSTS_PER_PAGE = 9
  const categories = [...new Set(blogs.map((post) => post.category))]

  // Filter and sort posts
  const getFilteredAndSortedPosts = () => {
    const filtered = blogs.filter((post) => {
      return (
        (selectedCategory === "" || post.category === selectedCategory) &&
        (searchTerm === "" ||
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })

    // Sort posts
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date))
        break
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }

  const filteredPosts = getFilteredAndSortedPosts()
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[filteredPosts.length -1] : null

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, sortBy])

  const handlePageChange = (page) => {
    setIsLoading(true)
    setCurrentPage(page)
    setTimeout(() => setIsLoading(false), 300)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleShareOptions = (postId) => {
    setShowShareOptions(showShareOptions === postId ? null : postId)
  }

  const handleCopyLink = (postId) => {
    navigator.clipboard.writeText(`${siteUrl}/blog/${postId}`)
    setCopiedLink(postId)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSearchTerm("")
    setSortBy("newest")
    setCurrentPage(1)
  }

  const shareToWhatsApp = (post) => {
    const text = `${post.title}\n\n${post.content.substring(0, 100)}...\n\nRead more: ${siteUrl}/blog/${post._id}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const shareToFacebook = (post) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blog/${post._id}`)}`
    window.open(url, "_blank")
  }

  const shareToTwitter = (post) => {
    const text = `${post.title}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
      `${siteUrl}/blog/${post._id}`,
    )}`
    window.open(url, "_blank")
  }

  const shareToLinkedIn = (post) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteUrl}/blog/${post._id}`)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <Head>
        <title>ज्ञान का खजाना | कृषि, तकनीक और ग्रामीण विकास पर लेख | Nayta Patel</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="कृषि, दूध उत्पादन, ग्रामीण जागरूकता और समुदायिक विकास पर नवीनतम लेख, गाइड और अंतर्दृष्टि। इंदौर, उज्जैन, धार, देवास और रतलाम के लिए विशेष जानकारी।"
        />
        <meta
          name="keywords"
          content="कृषि, खेती, किसानी, किसान, खेती, ग्रामीण विकास, गांव डेटा, मंडी भाव, दूध उत्पादन, फसल उत्पादन, नायता पटेल, नायता पटेल नेटवर्क, नायता पटेल समाज, इंदौर, उज्जैन, देवास, धार, रतलाम, सब्जी, पैदावार, खेतीवाड़ी, समाज विकास"
        />
        <meta name="author" content="Nayta Patel Network" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <meta property="og:title" content="ज्ञान का खजाना | कृषि और ग्रामीण विकास पर लेख" />
        <meta
          property="og:description"
          content="कृषि, तकनीक और ग्रामीण विकास पर नवीनतम लेख और मार्गदर्शिकाएँ। मंडी भाव, फसल उत्पादन और गांव की प्रगति की जानकारी।"
        />
        <meta property="og:image" content={`${siteUrl}/images/blog-social-share.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Nayta Patel Network" />
        <meta property="og:locale" content="hi_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/blog`} />
        <meta name="twitter:title" content="ज्ञान का खजाना | कृषि और ग्रामीण विकास" />
        <meta
          name="twitter:description"
          content="कृषि, समुदायिक निर्माण, मंडी दरों, गांव डेटा और मध्य प्रदेश में नायता पटेल समुदाय के काम पर अंतर्दृष्टि।"
        />
        <meta name="twitter:image" content={`${siteUrl}/images/blog-social-share.jpg`} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "ज्ञान का खजाना",
              description: "कृषि, तकनीक और ग्रामीण विकास पर लेख",
              url: `${siteUrl}/blog`,
              publisher: {
                "@type": "Organization",
                name: "Nayta Patel Network",
                url: siteUrl,
              },
              blogPost: filteredPosts.slice(0, 10).map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                description: post.content.substring(0, 160),
                url: `${siteUrl}/blog/${post._id}`,
                datePublished: post.createdAt || post.date,
                author: {
                  "@type": "Organization",
                  name: "Nayta Patel Network",
                },
                image: post.image?.url || `${siteUrl}/images/blog-placeholder.jpg`,
              })),
            }),
          }}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={`${siteUrl}/blog`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Header Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="text-center mb-8 md:mb-12"
            >
              <motion.h1
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6 },
                  },
                }}
                className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-4"
              >
                ज्ञान का खजाना
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6 },
                  },
                }}
                className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              >
                कृषि, तकनीक और ग्रामीण विकास पर नवीनतम लेख, मार्गदर्शिकाएँ और विशेष जानकारियाँ एक ही स्थान पर!
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, delay: 0.2 },
                  },
                }}
                className="flex justify-center space-x-8 mt-6 text-sm text-gray-600"
              >
                <div className="text-center">
                  <div className="font-bold text-emerald-600 text-xl">{blogs.length}</div>
                  <div>लेख</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-emerald-600 text-xl">{categories.length}</div>
                  <div>श्रेणियां</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-emerald-600 text-xl">
                    {blogs.reduce((total, post) => total + (post.views || 0), 0)}
                  </div>
                  <div>कुल दृश्य</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Filter Toggle Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <FaFilter className="text-emerald-600" />
                <span className="font-medium text-gray-700">फ़िल्टर {showFilters ? "छुपाएं" : "दिखाएं"}</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-emerald-600"
                >
                  <FaChevronRight />
                </motion.div>
              </button>
            </motion.div>

            {/* Filters Section */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-emerald-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">श्रेणी</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 bg-white"
                      >
                        <option value="">सभी श्रेणियां</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">खोजें</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="लेख खोजें..."
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 pl-10 p-3 bg-white"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    {/* Sort */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">क्रमबद्ध करें</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 bg-white"
                      >
                        <option value="newest">नवीनतम</option>
                        <option value="oldest">पुराने</option>
                        <option value="popular">लोकप्रिय</option>
                        <option value="title">शीर्षक के अनुसार</option>
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors font-medium"
                      >
                        फ़िल्टर साफ़ करें
                      </button>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(selectedCategory || searchTerm) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedCategory && (
                        <span className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                          <FaTag className="mr-1" />
                          {selectedCategory}
                          <button onClick={() => setSelectedCategory("")} className="ml-2 hover:text-emerald-600">
                            <FaTimes size={12} />
                          </button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          <FaSearch className="mr-1" />"{searchTerm}"
                          <button onClick={() => setSearchTerm("")} className="ml-2 hover:text-blue-600">
                            <FaTimes size={12} />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-gray-600"
            >
              <span className="font-medium">{filteredPosts.length}</span> लेख मिले
              {(selectedCategory || searchTerm) && <span> फ़िल्टर के साथ</span>}
            </motion.div>

            {/* Featured Post */}
            <AnimatePresence>
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">विशेष लेख</h2>
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden relative hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2 h-64 md:h-80 relative overflow-hidden">
                        <Image
                          src={featuredPost?.image?.url || "/images/blog-placeholder.jpg"}
                          alt={featuredPost?.title || "Featured blog image"}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            विशेष
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                            <span className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                              <FaTag className="mr-1" />
                              {featuredPost.category}
                            </span>
                            <span className="flex items-center">
                              <FaCalendar className="mr-1" />
                              {new Date(featuredPost.createdAt || featuredPost.date).toLocaleDateString("hi-IN")}
                            </span>
                            <span className="fle items-center hidden">
                              <FaEye className="mr-1" />
                              {featuredPost.views || 0}
                            </span>
                          </div>
                          <h3 className="font-bold text-2xl md:text-3xl mb-4 text-gray-900 leading-tight">
                            {featuredPost.title}
                          </h3>
                          <div className="text-gray-600 mb-6 leading-relaxed">
                            <p className="line-clamp-4">{removeAsterisks(featuredPost.content)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/blog/${featuredPost._id}`}
                            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                          >
                            पूरा पढ़ें
                            <FaArrowRight className="ml-2" />
                          </Link>
                          <div className="relative">
                            <button
                              onClick={() => toggleShareOptions(featuredPost._id)}
                              className="text-gray-500 hover:text-emerald-600 p-3 rounded-full hover:bg-emerald-50 transition-all"
                              aria-label="Share options"
                            >
                              <FaShareAlt size={20} />
                            </button>
                            <AnimatePresence>
                              {showShareOptions === featuredPost._id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                  className="absolute right-0 bottom-full mb-2 bg-white rounded-xl shadow-xl p-3 space-y-2 w-48 z-20 border border-gray-100"
                                >
                                  <button
                                    onClick={() => shareToWhatsApp(featuredPost)}
                                    className="flex items-center w-full text-gray-700 hover:text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all"
                                  >
                                    <FaWhatsapp className="mr-3 text-green-500" size={18} />
                                    WhatsApp
                                  </button>
                                  <button
                                    onClick={() => shareToFacebook(featuredPost)}
                                    className="flex items-center w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                  >
                                    <FaFacebook className="mr-3 text-blue-600" size={18} />
                                    Facebook
                                  </button>
                                  <button
                                    onClick={() => shareToTwitter(featuredPost)}
                                    className="flex items-center w-full text-gray-700 hover:text-blue-400 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                  >
                                    <FaTwitter className="mr-3 text-blue-400" size={18} />
                                    Twitter
                                  </button>
                                  <button
                                    onClick={() => shareToLinkedIn(featuredPost)}
                                    className="flex items-center w-full text-gray-700 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                  >
                                    <FaLinkedin className="mr-3 text-blue-700" size={18} />
                                    LinkedIn
                                  </button>
                                  <button
                                    onClick={() => handleCopyLink(featuredPost._id)}
                                    className="flex items-center w-full text-gray-700 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-all"
                                  >
                                    <FaLink className="mr-3 text-purple-500" size={18} />
                                    {copiedLink === featuredPost._id ? "कॉपी हो गया!" : "लिंक कॉपी करें"}
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blog Posts Grid */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">सभी लेख</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaSort />
                  <span>{sortBy === "newest" ? "नवीनतम" : sortBy === "popular" ? "लोकप्रिय" : "क्रमबद्ध"}</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-6 bg-gray-200 rounded mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : currentPosts.length > 0 ? (
                  <motion.div
                    key="posts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {currentPosts.map((post, index) => (
                      <motion.div
                        key={post._id || index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image?.url || "/images/blog-placeholder.jpg"}
                            alt={post.image?.title || `${post.title} - Nayta Patel Blog`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                              {post.category || "Blog"}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                            <span className="flex items-center">
                              <FaCalendar className="mr-1" />
                              {new Date(post.createdAt || post.date).toLocaleDateString("hi-IN")}
                            </span>
                            <span className="fle items-center hidden">
                              <FaEye className="mr-1" />
                              {post.views || 0}
                            </span>
                          </div>
                          <h3 className="font-bold text-xl mb-3 line-clamp-2 text-gray-900 leading-tight">
                            {post.title}
                          </h3>
                          <div className="text-gray-600 mb-4 flex-grow">
                            <p className="line-clamp-3 leading-relaxed">{removeAsterisks(post.content)}</p>
                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <Link
                              href={`/blog/${post._id}`}
                              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                            >
                              पढ़ें
                              <FaArrowRight className="ml-1" size={14} />
                            </Link>
                            <div className="relative">
                              <button
                                onClick={() => toggleShareOptions(post._id)}
                                className="text-gray-400 hover:text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition-all"
                                aria-label="Share options"
                              >
                                <FaShareAlt size={16} />
                              </button>
                              <AnimatePresence>
                                {showShareOptions === post._id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute right-0 bottom-full mb-2 bg-white rounded-xl shadow-xl p-2 space-y-1 w-40 z-20 border border-gray-100"
                                  >
                                    <button
                                      onClick={() => shareToWhatsApp(post)}
                                      className="flex items-center w-full text-gray-700 hover:text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all text-sm"
                                    >
                                      <FaWhatsapp className="mr-2 text-green-500" size={14} />
                                      WhatsApp
                                    </button>
                                    <button
                                      onClick={() => shareToFacebook(post)}
                                      className="flex items-center w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all text-sm"
                                    >
                                      <FaFacebook className="mr-2 text-blue-600" size={14} />
                                      Facebook
                                    </button>
                                    <button
                                      onClick={() => shareToTwitter(post)}
                                      className="flex items-center w-full text-gray-700 hover:text-blue-400 hover:bg-blue-50 p-2 rounded-lg transition-all text-sm"
                                    >
                                      <FaTwitter className="mr-2 text-blue-400" size={14} />
                                      Twitter
                                    </button>
                                    <button
                                      onClick={() => handleCopyLink(post._id)}
                                      className="flex items-center w-full text-gray-700 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-all text-sm"
                                    >
                                      <FaLink className="mr-2 text-purple-500" size={14} />
                                      {copiedLink === post._id ? "कॉपी!" : "लिंक"}
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center"
                  >
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-700">कोई लेख नहीं मिला</h3>
                    <p className="text-gray-600 mb-6">
                      आपके फ़िल्टर के अनुसार कोई ब्लॉग पोस्ट नहीं मिली। कृपया अपने खोज मापदंड को समायोजित करें।
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                    >
                      फ़िल्टर साफ़ करें
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center items-center space-x-2 mt-12"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  const isCurrentPage = page === currentPage
                  const shouldShow =
                    page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

                  if (!shouldShow) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      )
                    }
                    return null
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        isCurrentPage
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronRight />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
