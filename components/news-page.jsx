"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaEye,
  FaHeart,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaPlus,
  FaNewspaper,
  FaFire,
  FaArrowUp,
  FaGlobe,
  FaArrowRight,
  FaTractor,
} from "react-icons/fa"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { usePatel } from "./patelContext"

// Sample news data
const sampleNews = [
  {
    id: 1,
    title: "गाँव में नई तकनीक से बढ़ी फसल की पैदावार",
    content:
      "आधुनिक कृषि तकनीक के उपयोग से स्थानीय किसानों की फसल में 40% तक की वृद्धि हुई है। यह पहल नायता पटेल नेटवर्क के सहयोग से शुरू की गई थी।",
    fullContent:
      "आधुनिक कृषि तकनीक के उपयोग से स्थानीय किसानों की फसल में 40% तक की वृद्धि हुई है। यह पहल नायता पटेल नेटवर्क के सहयोग से शुरू की गई थी। किसान भाइयों ने बताया कि नई तकनीक से न केवल उत्पादन बढ़ा है बल्कि लागत भी कम आई है। इस सफलता को देखते हुए अन्य गांवों में भी इस तकनीक को अपनाने की योजना बनाई जा रही है।",
    image: "/placeholder.svg?height=300&width=400",
    location: "राजकोट, गुजरात",
    date: "2024-01-15",
    publisher: "राम पटेल",
    category: "कृषि",
    views: 1250,
    likes: 89,
    featured: true,
  },
  {
    id: 2,
    title: "सामुदायिक स्वास्थ्य शिविर का आयोजन",
    content: "गाँव में निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया गया जिसमें 500 से अधिक लोगों ने भाग लिया।",
    fullContent:
      "गाँव में निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया गया जिसमें 500 से अधिक लोगों ने भाग लिया। इस शिविर में डॉक्टरों की टीम ने मुफ्त जांच की और दवाइयां भी वितरित कीं। यह पहल समुदाय के स्वास्थ्य सुधार की दिशा में एक महत्वपूर्ण कदम है।",
    image: "/placeholder.svg?height=300&width=400",
    location: "अहमदाबाद, गुजरात",
    date: "2024-01-14",
    publisher: "डॉ. सुनीता शर्मा",
    category: "स्वास्थ्य",
    views: 890,
    likes: 67,
    featured: false,
  },
  {
    id: 3,
    title: "शिक्षा क्षेत्र में डिजिटल क्रांति",
    content: "स्थानीय स्कूलों में डिजिटल शिक्षा की शुरुआत से बच्चों की पढ़ाई में नई दिशा मिली है।",
    fullContent:
      "स्थानीय स्कूलों में डिजिटल शिक्षा की शुरुआत से बच्चों की पढ़ाई में नई दिशा मिली है। टैबलेट और इंटरनेट की सुविधा से बच्चे अब घर बैठे भी पढ़ाई कर सकते हैं। शिक्षकों का कहना है कि इससे बच्चों की रुचि पढ़ाई में बढ़ी है।",
    image: "/placeholder.svg?height=300&width=400",
    location: "सूरत, गुजरात",
    date: "2024-01-13",
    publisher: "प्रिंसिपल मोहन दास",
    category: "शिक्षा",
    views: 1100,
    likes: 95,
    featured: true,
  },
  {
    id: 4,
    title: "महिला सशक्तिकरण कार्यक्रम की सफलता",
    content: "स्थानीय महिलाओं के लिए आयोजित कौशल विकास कार्यक्रम से 200 महिलाओं को रोजगार मिला।",
    fullContent:
      "स्���ानीय महिलाओं के लिए आयोजित कौशल विकास कार्यक्रम से 200 महिलाओं को रोजगार मिला। इस कार्यक्रम में सिलाई, कढ़ाई, और हस्तशिल्प का प्रशिक्षण दिया गया। अब ये महिलाएं घर बैठे काम करके अच्छी आमदनी कर रही हैं।",
    image: "/placeholder.svg?height=300&width=400",
    location: "वडोदरा, गुजरात",
    date: "2024-01-12",
    publisher: "सुमित्रा पटेल",
    category: "महिला सशक्तिकरण",
    views: 750,
    likes: 78,
    featured: false,
  },
  {
    id: 5,
    title: "पर्यावरण संरक्षण में युवाओं की भागीदारी",
    content: "गाँव के युवाओं ने मिलकर 1000 पेड़ लगाए और पर्यावरण संरक्षण का संदेश दिया।",
    fullContent:
      "गाँव के युवाओं ने मिलकर 1000 पेड़ लगाए और पर्यावरण संरक्षण का संदेश दिया। यह अभियान तीन दिन तक चला जिसमें स्कूल के बच्चों ने भी भाग लिया। युवाओं का कहना है कि वे हर महीने ऐसे कार्यक्रम आयोजित करेंगे।",
    image: "/placeholder.svg?height=300&width=400",
    location: "भावनगर, गुजरात",
    date: "2024-01-11",
    publisher: "विकास यादव",
    category: "पर्यावरण",
    views: 920,
    likes: 112,
    featured: true,
  },
  {
    id: 6,
    title: "किसान उत्पादक संगठन की स्थापना",
    content: "स्थानीय किसानों ने मिलकर एक उत्पादक संगठन बनाया है जो उनकी आर्थिक स्थिति सुधारने में मदद करेगा।",
    fullContent:
      "स्थानीय किसानों ने मिलकर एक उत्पादक संगठन बनाया है जो उनकी आर्थिक स्थिति सुधारने में मदद करेगा। इस संगठन के माध्यम से किसान अपनी फसल को बेहतर दामों पर बेच सकेंगे और नई तकनीकों का लाभ उठा सकेंगे।",
    image: "/placeholder.svg?height=300&width=400",
    location: "जामनगर, गुजरात",
    date: "2024-01-10",
    publisher: "किशन भाई पटेल",
    category: "कृषि",
    views: 680,
    likes: 54,
    featured: false,
  }, {
    id: 7,
    title: "पर्यावरण संरक्षण में युवाओं की भागीदारी",
    content: "गाँव के युवाओं ने मिलकर 1000 पेड़ लगाए और पर्यावरण संरक्षण का संदेश दिया।",
    fullContent:
      "गाँव के युवाओं ने मिलकर 1000 पेड़ लगाए और पर्यावरण संरक्षण का संदेश दिया। यह अभियान तीन दिन तक चला जिसमें स्कूल के बच्चों ने भी भाग लिया। युवाओं का कहना है कि वे हर महीने ऐसे कार्यक्रम आयोजित करेंगे।",
    image: "/placeholder.svg?height=300&width=400",
    location: "भावनगर, गुजरात",
    date: "2024-01-11",
    publisher: "विकास यादव",
    category: "पर्यावरण",
    views: 920,
    likes: 112,
    featured: true,
  },
  
]


export default function NewsPage() {
 // const [news, setNews] = useState(sampleNews)
  const [filteredNews, setFilteredNews] = useState(sampleNews)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [featuredNews, setFeaturedNews] = useState([])
  const [showPublishForm, setShowPublishForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const newsPerPage = 6
    const router = useRouter()
    const [userData,setUserData] = useState({})
     const {news,user, setNews,formatContent} = usePatel()

     useEffect(()=>{
        if(user){
            setUserData(user)
        }
     }, [user])
     useEffect(()=>{
      if(news){
        setFeaturedNews(news.slice(0,3))
      }
     },[news])
  // Filter and search functionality
  useEffect(() => {
    let filtered = news

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location.includes(selectedLocation))
    }

    if (selectedDate) {
      filtered = filtered.filter((item) => item.date === selectedDate)
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredNews(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedLocation, selectedDate, selectedCategory, news])
  // Pagination
  const indexOfLastNews = currentPage * newsPerPage
  const indexOfFirstNews = indexOfLastNews - newsPerPage
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews)
  const totalPages = Math.ceil(filteredNews.length / newsPerPage)

  // Get unique locations and categories for filters
  const locations = [...new Set(news.map((item) => item.location.split(",")[0]))]
  const categories = [...new Set(news.map((item) => item.category))]


  // Handle publish news
  const handlePublishNews = (formData) => {
    const newNews = {
      id: news.length + 1,
      title: formData.title,
      content: formData.content,
      fullContent: formData.fullContent || formData.content,
      image: "/placeholder.svg?height=300&width=400",
      location: formData.location,
      date: new Date().toISOString().split("T")[0],
      publisher: formData.publisher,
      category: formData.category || "सामान्य",
      views: 0,
      likes: 0,
      featured: false,
    }
    setNews([newNews, ...news])
    setShowPublishForm(false)
  }

  return (
    <>
      <Head>
        <title>समाचार - नायता पटेल नेटवर्क | Latest News and Updates</title>
        <meta
          name="description"
          content="नायता पटेल नेटवर्क पर नवीनतम समाचार, कृषि अपडेट, सामुदायिक खबरें और स्थानीय घटनाओं की जानकारी प्राप्त करें।"
        />
        <meta name="keywords" content="समाचार, कृषि, समुदाय, गुजरात, नायता पटेल, स्थानीय खबरें" />
        <meta property="og:title" content="समाचार - नायता पटेल नेटवर्क" />
        <meta property="og:description" content="नवीनतम समाचार और सामुदायिक अपडेट्स पढ़ें नायता पटेल नेटवर्क पर।" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://naytapatelnetwork.vercel.app/news" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.header
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white sm:py-6 py-3 shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        > 
          <div className="container mx-auto px-4">
            <div className="flex items-start flex-col gap-1 justify-between">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaNewspaper className="sm:text-4xl text-2xl" />
                <div>
                  <h1 className="sm:text-3xl text-xl font-bold">समाचार केंद्र</h1>
                  <p className="text-orange-50 sm:text-md text-sm">नायता पटेल नेटवर्क</p>
                </div>
              </motion.div>

             { (userData.role ==='ambassador' ||  userData.role ==='admin' )&& (<motion.button
                onClick={() => setShowPublishForm(true)}
                className="bg-orange-400  text-white sm:px-6 px-3 sm:py-3 py-1 cursor-pointer rounded-full font-bold flex items-center space-x-2 hover:bg-orange-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus />
                <span>समाचार प्रकाशित करें</span>
              </motion.button>)}
            </div>
          </div>
        </motion.header>

        {/* Search and Filters */}
        <motion.section
          className="bg-white shadow-md sm:py-6 py-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="समाचार खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 sm:py-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-emerald-500 text-white sm:px-6 px-2 sm:py-4 py-2 sm:text-xl rounded-full flex items-center gap-2 hover:bg-emerald-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilter />
                <span className="hidden sm:flex">फिल्टर</span>
              </motion.button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">सभी स्थान</option>
                    {locations.map((location,index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">सभी श्रेणियां</option>
                    {categories.map((category,index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <motion.button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedLocation("")
                      setSelectedDate("")
                      setSelectedCategory("")
                    }}
                    className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    फिल्टर साफ़ करें
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
        {/* Featured News */}
      { currentPage === 1 && (<motion.section className="py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-3 mb-6">
              <FaFire className="sm:text-3xl text-xl text-emerald-500"/>
              <h2 className="sm:text-3xl text-xl font-bold text-gray-800">मुख्य समाचार</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredNews?.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() =>   router.push(`/news/${item?._id}`)}
                  >
                    <div className="relative">
                      {item?.image?.url ? <div className="overflow-hidden">
                           <img
                      src={item?.image?.url || "/placeholder.svg"}
                      alt={item?.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    </div> :  <div className="h-[56px] bg-orange-100">{''}</div>}
                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        मुख्य
                      </div>
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                        <FaEye />
                        <span>{item?.views}</span>
                      </div>
                    </div>

                    <div className="sm:p-6 p-3">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 sm:mb-3 mb-2">
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt />
                          <span>{item?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt />
                          <span>{new Date(item?.publish_date).toLocaleDateString("hi-IN")}</span>
                        </div>
                      </div>

                      <h3 className="text-md font-bold text-gray-800 ms:mb-3 mb-2 group-hover:text-emerald-600 transition-colors">
                        {item?.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-5 sm:text-sm text-xs">{item?.content}</p>

                      <div className="flex items-center justify-between  text-xs">
                        {item?.publisher?.fullname && <div className="flex items-center space-x-1 text-gray-500 bg-emerald-200 rounded-2xl px-2 py-1">
                          <FaUser />
                          <span>{item?.publisher?.fullname || item?.publisher_name}</span>
                        </div>}

                        <div className="flex items-center space-x-4 py-1 px-2 rounded-2xl bg-emerald-50">
                          
                          <motion.button
                            className="flex items-center gap-2 space-x-1  hover:text-blue-600  cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                           Share <FaShare />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.section>)}

        {/* All News */}
        <motion.section className="py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FaArrowUp className="text-xl text-emerald-500 sm:block hidden" />
                <FaArrowRight className="text-xl text-emerald-500 sm:hidden" />
                <h2 className="sm:text-3xl text-xl font-bold text-gray-800">सभी समाचार</h2>
              </div>
             {filteredNews.length !== news.length && <div className="text-gray-600 text-xs">कुल {filteredNews.length} समाचार मिले</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentNews.length > 3 ? currentNews.slice(3,currentNews.length) :currentNews) .map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => {  router.push(`/news/${item._id}`)}}
                >
                  <div className="relative">
                    <div className="overflow-hidden">
                   {item?.image?.url ? <div className="overflow-hidden">
                           <img
                      src={item?.image?.url || "/placeholder.svg"}
                      alt={item?.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    </div> :  <div className="h-[56px] bg-orange-100">{''}</div>}
                    </div>
                 
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full sm:text-sm text-xs font-bold">
                      {item?.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full sm:text-sm text-xs flex items-center space-x-1">
                      <FaEye />
                      <span>{item?.views}</span>
                    </div>
                  </div>

                  <div className="sm:p-6 p-3">
                    <div className="flex items-center space-x-4 sm:text-sm text-xs text-gray-500 sm:mb-3 mb-2">
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt />
                        <span>{item?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock />
                        <span>{new Date(item.publish_date).toLocaleDateString("hi-IN")}</span>
                      </div>
                    </div>

                    <h3 className="text-md sm:text-xl font-bold text-gray-800 sm:mb-3 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {item?.title}
                    </h3>

                    <div className="text-gray-600 mb-4 sm:text-sm text-xs font-medium line-clamp-6 mask-b-from-75%">{formatContent(item.content)} </div>
                    <div className="flex items-center justify-between text-xs">
                      {item?.publisher?.fullname && <div className="flex items-center space-x-1 text-gray-500  shadow-sm shadow-amber-200  bg-emerald-200 rounded-2xl px-2 py-1">
                          <FaUser />
                          <span>{item?.publisher?.fullname || item?.publisher_name}</span>
                        </div>}

                      <div className="flex items-center space-x-4 bg-emerald-100 py-1 px-2 rounded-2xl">
                        
                        <motion.button
                          className="flex items-center gap-2 space-x-1  hover:text-blue-600"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                        Share  <FaShare />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center space-x-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft className="text-orange-500" />
                </motion.button>

                {[...Array(totalPages)].map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-full font-bold ${
                      currentPage === index + 1
                        ? "bg-orange-500 text-white"
                        : "bg-white text-orange-500 hover:bg-orange-50"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index + 1}
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight className="text-orange-500" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Marquee News Ticker */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white sm:py-3 z-40 sm:text-md text-sm"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center">
            <div className="bg-yellow-400 text-black sm:px-4 px-2 sm:py-2 py-3 font-bold flex items-center space-x-2">
              <FaGlobe />
              <span>ताज़ा खबर</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex space-x-8 whitespace-nowrap"
                animate={{ x: [1200, -1200] }}
                transition={{
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {news.map((news, index) => (
                  <span key={index} className="sm:text-lg text-sm flex gap-1 items-center">
                     <FaTractor className="rotate-y-180" size={18}/>- {news.title}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        
        {/* Publish News Form Modal */}
        <AnimatePresence>
          {showPublishForm && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPublishForm(false)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.5, y: -100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 100 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">समाचार प्रकाशित करें</h2>
                    <motion.button
                      onClick={() => setShowPublishForm(false)}
                      className="text-gray-500 hover:text-red-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes className="text-2xl" />
                    </motion.button>
                  </div>

                  <PublishNewsForm onSubmit={handlePublishNews} onCancel={() => setShowPublishForm(false)} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}


// Publish News Form Component
function PublishNewsForm({ onSubmit, onCancel, currentUser }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
    publisher_name: currentUser?.name || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {path} = usePatel()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.location || !formData.category) {
      alert("कृपया सभी आवश्यक फील्ड भरें");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem('token');
      const submitFormData = new FormData();
      
      // Append all form fields
      submitFormData.append("title", formData.title);
      submitFormData.append("content", formData.content);
      submitFormData.append("location", formData.location);
      submitFormData.append("publisher_name", formData.publisher_name);
      submitFormData.append("category", formData.category);
      
      // Append image if exists
      if (imageFile) {
        submitFormData.append("image", imageFile);
      }
console.log(submitFormData);

      const response = await fetch(`${path}/api/news`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitFormData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit news");
      }

      // Call onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(data);
      }
      
      // Reset form on success
      setFormData({
        title: "",
        content: "",
        category: "",
        location: "",
        publisher_name: currentUser?.name || "",
      });
      setImageFile(null);

    } catch (error) {
      console.error("Error submitting news:", error);
      alert(error.message || "समाचार प्रकाशित करने में त्रुटि हुई");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Category options matching your schema
  const categories = [
    { value: "Accident", label: "दुर्घटना" },
    { value: "Farming", label: "कृषि" },
    { value: "Weather", label: "मौसम" },
    { value: "Good", label: "अच्छी खबर" },
    { value: "Bad", label: "बुरी खबर" },
    { value: "Samaj", label: "समाज" },
    { value: "Technology", label: "तकनीक" },
    { value: "Market", label: "बाजार" },
    { value: "Education", label: "शिक्षा" },
    { value: "Health", label: "स्वास्थ्य" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          समाचार शीर्षक *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="समाचार का शीर्षक लिखें..."
        />
      </div>

      {/* Content Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          समाचार विवरण *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="समाचार का पूरा विवरण..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            स्थान *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="शहर, राज्य"
          />
        </div>

        {/* Publisher Name Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            प्रकाशक का नाम *
          </label>
          <input
            type="text"
            name="publisher_name"
            value={formData.publisher_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="आपका नाम"
            readOnly={!!currentUser?.name}
          />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          श्रेणी *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">श्रेणी चुनें</option>
          {categories.map((cat,index) => (
            <option key={index} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          समाचार छवि
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
            <span className="text-sm font-medium">
              {imageFile ? imageFile.name : "छवि चुनें"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {imageFile && (
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              हटाएं
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <motion.button
          type="submit"
          disabled={isUploading}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-colors ${
            isUploading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          whileHover={{ scale: isUploading ? 1 : 1.02 }}
          whileTap={{ scale: isUploading ? 1 : 0.98 }}
        >
          {isUploading ? "प्रकाशित हो रहा है..." : "प्रकाशित करें"}
        </motion.button>

        <motion.button
          type="button"
          onClick={onCancel}
          disabled={isUploading}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          रद्द करें
        </motion.button>
      </div>
    </form>
  );
}