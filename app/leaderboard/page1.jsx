"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCrown, FaMedal, FaTrophy, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaStar } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

// Sample data
const sampleData = {
  ambassadors: [
    {
      id: 1,
      name: "राहुल शर्मा",
      image: "/placeholder.svg?height=100&width=100",
      points: 2850,
      achievements: ["100+ रेफरल्स", "5 गांव कवर किए", "महीने का सर्वश्रेष्ठ एंबेसडर"],
      location: "दिल्ली",
    },
    {
      id: 2,
      name: "प्रिया पटेल",
      image: "/placeholder.svg?height=100&width=100",
      points: 2720,
      achievements: ["85+ रेफरल्स", "4 गांव कवर किए", "सबसे तेज़ ग्रोथ"],
      location: "गुजरात",
    },
    {
      id: 3,
      name: "अमित कुमार",
      image: "/placeholder.svg?height=100&width=100",
      points: 2650,
      achievements: ["90+ रेफरल्स", "3 गांव कवर किए", "बेस्ट परफॉर्मर"],
      location: "बिहार",
    },
    {
      id: 4,
      name: "सुनीता देवी",
      image: "/placeholder.svg?height=100&width=100",
      points: 2580,
      achievements: ["75+ रेफरल्स", "6 गांव कवर किए"],
      location: "उत्तर प्रदेश",
    },
    {
      id: 5,
      name: "विकास गुप्ता",
      image: "/placeholder.svg?height=100&width=100",
      points: 2450,
      achievements: ["80+ रेफरल्स", "4 गांव कवर किए"],
      location: "राजस्थान",
    },
  ],
  users: [
    {
      id: 1,
      name: "अनिल यादव",
      points: 1850,
      achievements: ["50+ पोस्ट्स", "1000+ लाइक्स", "टॉप कंट्रिब्यूटर"],
      location: "हरियाणा",
    },
    { id: 2, name: "मीरा सिंह", points: 1720, achievements: ["45+ पोस्ट्स", "800+ लाइक्स", "एक्टिव यूजर"], location: "पंजाब" },
    {
      id: 3,
      name: "संजय वर्मा",
      points: 1650,
      achievements: ["40+ पोस्ट्स", "900+ लाइक्स", "कम्युनिटी हेल्पर"],
      location: "मध्य प्रदेश",
    },
    { id: 4, name: "रीता शर्मा", points: 1580, achievements: ["35+ पोस्ट्स", "700+ लाइक्स"], location: "छत्तीसगढ़" },
    { id: 5, name: "मोहन लाल", points: 1450, achievements: ["30+ पोस्ट्स", "600+ लाइक्स"], location: "झारखंड" },
  ],
  villages: [
    {
      id: 1,
      name: "रामपुर",
      points: 5850,
      achievements: ["100% डिजिटल", "सबसे ज्यादा एंगेजमेंट", "मॉडल विलेज"],
      state: "उत्तर प्रदेश",
      population: "5000+",
    },
    {
      id: 2,
      name: "सुंदरगांव",
      points: 5720,
      achievements: ["95% डिजिटल", "हाई एंगेजमेंट", "स्मार्ट विलेज"],
      state: "हरियाणा",
      population: "3500+",
    },
    {
      id: 3,
      name: "खुशीपुर",
      points: 5650,
      achievements: ["90% डिजिटल", "गुड एंगेजमेंट", "प्रोग्रेसिव विलेज"],
      state: "पंजाब",
      population: "4200+",
    },
    {
      id: 4,
      name: "नंदनगांव",
      points: 5580,
      achievements: ["85% डिजिटल", "एक्टिव कम्युनिटी"],
      state: "मध्य प्रदेश",
      population: "2800+",
    },
    {
      id: 5,
      name: "शांतिपुर",
      points: 5450,
      achievements: ["80% डिजिटल", "ग्रोइंग कम्युनिटी"],
      state: "बिहार",
      population: "3200+",
    },
  ],
}

const months = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]

export default function LeaderboardDashboard() {
  const [activeTab, setActiveTab] = useState("ambassadors")
  const [selectedMonth, setSelectedMonth] = useState("अक्टूबर")
  const [selectedItem, setSelectedItem] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)

  const getCurrentData = () => {
    return sampleData[activeTab] || []
  }

  const getTabIcon = (tab) => {
    switch (tab) {
      case "ambassadors":
        return <FaCrown className="w-5 h-5" />
      case "users":
        return <FaUsers className="w-5 h-5" />
      case "villages":
        return <FaMapMarkerAlt className="w-5 h-5" />
      default:
        return null
    }
  }

  const getTabLabel = (tab) => {
    switch (tab) {
      case "ambassadors":
        return "एंबेसडर"
      case "users":
        return "यूजर्स"
      case "villages":
        return "गांव"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HiSparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-yellow-600 bg-clip-text text-transparent">
              लीडरबोर्ड
            </h1>
            <HiSparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 text-lg">महीने के टॉप परफॉर्मर्स</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Tab Selection */}
          <div className="flex bg-white rounded-xl p-2 shadow-lg border-2 border-emerald-100">
            {["ambassadors", "users", "villages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-emerald-50"
                }`}
              >
                {getTabIcon(tab)}
                {getTabLabel(tab)}
              </button>
            ))}
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-lg border-2 border-yellow-100">
            <FaCalendarAlt className="w-4 h-4 text-yellow-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent font-semibold text-gray-700 focus:outline-none"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden bg-white rounded-xl px-4 py-2 shadow-lg border-2 border-emerald-100 text-emerald-600 font-semibold"
          >
            टॉप 50 {showSidebar ? "छुपाएं" : "दिखाएं"}
          </button>
        </motion.div>

        <div className="flex gap-8">
          {/* Main Leaderboard */}
          <div className="flex-1">
            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-end justify-center gap-4 lg:gap-8 mb-8">
                {getCurrentData()
                  .slice(0, 3)
                  .map((item, index) => {
                    const position = index === 0 ? 1 : index === 1 ? 2 : 3
                    const actualIndex = position === 1 ? 0 : position === 2 ? 1 : 2
                    const heights = ["h-32", "h-24", "h-20"]
                    const colors = [
                      "from-yellow-400 to-yellow-600",
                      "from-gray-300 to-gray-500",
                      "from-amber-600 to-amber-800",
                    ]
                    const icons = [<FaCrown />, <FaMedal />, <FaTrophy />]

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + actualIndex * 0.1 }}
                        className={`flex flex-col items-center ${position === 2 ? "order-first lg:order-none" : ""}`}
                      >
                        <div className="relative cursor-pointer group" onClick={() => setSelectedItem(item)}>
                          {activeTab === "ambassadors" && (
                            <div className="relative mb-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              />
                              <div
                                className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${colors[actualIndex]} rounded-full flex items-center justify-center text-white text-sm shadow-lg`}
                              >
                                {icons[actualIndex]}
                              </div>
                            </div>
                          )}

                          <div
                            className={`bg-gradient-to-t ${colors[actualIndex]} ${heights[actualIndex]} w-20 lg:w-24 rounded-t-lg shadow-lg flex flex-col items-center justify-end pb-2 group-hover:shadow-xl transition-all duration-300`}
                          >
                            <div className="text-white font-bold text-lg">{position}</div>
                          </div>

                          <div className="text-center mt-2">
                            <h3 className="font-bold text-gray-800 text-sm lg:text-base">{item.name}</h3>
                            <p className="text-emerald-600 font-semibold">{item.points} अंक</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
              </div>
            </motion.div>

            {/* Remaining Rankings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {getCurrentData()
                .slice(3, 10)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-emerald-50 hover:border-emerald-200 cursor-pointer group transition-all duration-300"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-yellow-100 rounded-full flex items-center justify-center font-bold text-emerald-700 text-lg">
                        {index + 4}
                      </div>

                      {activeTab === "ambassadors" && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded-full border-2 border-emerald-200 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {activeTab === "villages" ? `${item.state} • ${item.population}` : item.location}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{item.points} अंक</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaStar className="w-3 h-3" />
                          <span className="text-xs">{item.achievements.length} उपलब्धियां</span>
                        </div>
                      </div>

                      <FaEye className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Sidebar - Top 50 List */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="w-80 bg-white rounded-xl shadow-lg border-2 border-emerald-100 p-6 h-fit sticky top-8 hidden lg:block"
              >
                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                  <FaTrophy className="w-5 h-5 text-yellow-500" />
                  टॉप 50 {getTabLabel(activeTab)}
                </h3>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getCurrentData()
                    .slice(0, 50)
                    .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.01 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors duration-200"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < 3
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {activeTab === "ambassadors" && (
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-8 h-8 rounded-full border border-emerald-200"
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-emerald-600">{item.points} अंक</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Achievement Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  {activeTab === "ambassadors" && (
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      className="w-20 h-20 rounded-full border-4 border-emerald-200 mx-auto mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedItem.name}</h2>
                  <p className="text-emerald-600 font-semibold text-lg">{selectedItem.points} अंक</p>
                  <p className="text-gray-600">
                    {activeTab === "villages"
                      ? `${selectedItem.state} • ${selectedItem.population}`
                      : selectedItem.location}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-yellow-500" />
                    उपलब्धियां
                  </h3>
                  <div className="space-y-2">
                    {selectedItem.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                >
                  बंद करें
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
