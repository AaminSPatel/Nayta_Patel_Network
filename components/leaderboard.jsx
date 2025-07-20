"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCrown, FaMedal, FaTrophy, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaStar } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

const LeaderboardDashboard = ({ villages = [], users = [], posts = [], comments = [], likes = [] }) => {
  const [activeTab, setActiveTab] = useState("ambassadors")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedItem, setSelectedItem] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)

  // Months in English
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  // Helper function to compare IDs safely
  const compareIds = (id1, id2) => {
    if (!id1 || !id2) return false
    return id1.toString() === id2.toString()
  }

  // Points calculation functions
  const calculateAmbassadorPoints = (postCount, likeCount, commentCount, replyCount) => {
    const basePoints = 1000
    const postPoints = postCount * 10
    const likePoints = likeCount * 2
    const commentPoints = commentCount * 5
    const replyPoints = replyCount * 3
    
    return basePoints + postPoints + likePoints + commentPoints + replyPoints
  }

  const calculateUserPoints = (postCount, likeCount, commentCount) => {
    const basePoints = 100
    const postPoints = postCount * 5
    const likePoints = likeCount * 1
    const commentPoints = commentCount * 3
    
    return basePoints + postPoints + likePoints + commentPoints
  }

  const calculateVillagePoints = (userCount, postCount, likeCount, commentCount) => {
    const basePoints = 500
    const userPoints = userCount * 10
    const postPoints = postCount * 5
    const engagementPoints = (likeCount * 0.5) + (commentCount * 2)
    
    return basePoints + userPoints + postPoints + engagementPoints
  }

  // Achievement functions
  const getAmbassadorAchievements = (postCount, likeCount, commentCount) => {
    const achievements = []
    
    if (postCount >= 50) achievements.push("50+ posts")
    else if (postCount >= 20) achievements.push("20+ posts")
    
    if (likeCount >= 500) achievements.push("500+ likes")
    else if (likeCount >= 200) achievements.push("200+ likes")
    
    if (commentCount >= 100) achievements.push("100+ comments")
    else if (commentCount >= 50) achievements.push("50+ comments")
    
    return achievements.length > 0 ? achievements : ["New Ambassador"]
  }

  const getUserAchievements = (postCount, likeCount, commentCount) => {
    const achievements = []
    
    if (postCount >= 20) achievements.push("20+ posts")
    else if (postCount >= 10) achievements.push("10+ posts")
    
    if (likeCount >= 100) achievements.push("100+ likes")
    else if (likeCount >= 50) achievements.push("50+ likes")
    
    if (commentCount >= 30) achievements.push("30+ comments")
    else if (commentCount >= 15) achievements.push("15+ comments")
    
    return achievements.length > 0 ? achievements : ["New User"]
  }

  const getVillageAchievements = (userCount, verifiedCount, postCount) => {
    const achievements = []
    
    if (userCount >= 50) achievements.push("50+ users")
    else if (userCount >= 20) achievements.push("20+ users")
    
    if (verifiedCount >= userCount * 0.8) achievements.push("80%+ verified users")
    else if (verifiedCount >= userCount * 0.5) achievements.push("50%+ verified users")
    
    if (postCount >= 100) achievements.push("100+ posts")
    else if (postCount >= 50) achievements.push("50+ posts")
    
    return achievements.length > 0 ? achievements : ["New Village"]
  }
  // Process data
  const processedData = useMemo(() => {
    // Convert all IDs to strings for consistent comparison
    const usersWithStringIds = users.map(user => ({
      ...user,
      _id: user._id?.toString(),
      posts: user.posts?.map(id => id?.toString()) || [],
      comments: user.comments?.map(id => id?.toString()) || [],
      likes: user.likes?.map(id => id?.toString()) || []
    }))

    const postsWithStringIds = posts.map(post => ({
      ...post,
      _id: post._id?.toString(),
      user: post.user?._id.toString(),
      likes: post.likes?.map(id => id?.toString()) || [],
      comments: post.comments?.map(id => id?.toString()) || []
    }))

    const commentsWithStringIds = comments.map(comment => ({
      ...comment,
      _id: comment._id?.toString(),
      user: comment.user?._id.toString(),
      post: comment.post?.toString(),
      replies: comment.replies?.map(reply => ({
        ...reply,
        user: reply.user?.toString(),
        replyTo: reply.replyTo?.toString()
      })) || [],
      likes: comment.likes?.map(id => id?.toString()) || []
    }))

    const likesWithStringIds = likes.map(like => ({
      ...like,
      _id: like._id?.toString(),
      user: like.user?._id.toString(),
      post: like.post?._id.toString(),
      comment: like.comment?._id.toString()
    }))

    // Process ambassadors (users with role 'ambassador')
    const ambassadors = usersWithStringIds
      .filter(user => user.role === "ambassador")
      .map(user => {
        const ambassadorPosts = postsWithStringIds.filter(post => 
          compareIds(post.user, user._id)
        )
        const postIds = ambassadorPosts.map(p => p._id)
      //  console.log('ambassadorPosts',ambassadorPosts);
        
        // Count likes on ambassador's posts
        const postLikes = likesWithStringIds.filter(like => 
          like.post && postIds.includes(like.post)
        ).length
        
        // Count comments on ambassador's posts
        const postComments = commentsWithStringIds.filter(comment => 
          comment.post && postIds.includes(comment.post)
        ).length
        
        // Count replies to ambassador's comments
        const replyComments = commentsWithStringIds.filter(comment => 
          comment.replies?.some(reply => compareIds(reply.user, user._id))
        ).length
        
        return {
          ...user,
          points: calculateAmbassadorPoints(ambassadorPosts.length, postLikes, postComments, replyComments),
          achievements: getAmbassadorAchievements(ambassadorPosts.length, postLikes, postComments),
          location: user.village || "Unknown",
          stats: {
            posts: ambassadorPosts.length,
            likes: postLikes,
            comments: postComments,
            replies: replyComments
          }
        }
      })

    // Process regular users
    const regularUsers = usersWithStringIds
      .filter(user => user.role !== "ambassador")
      .map(user => {
        const userPosts = postsWithStringIds.filter(post => 
          compareIds(post.user, user._id)
        )
        const postIds = userPosts.map(p => p._id)
        
        const postLikes = likesWithStringIds.filter(like => 
          like.post && postIds.includes(like.post)
        ).length
        
        const postComments = commentsWithStringIds.filter(comment => 
          comment.post && postIds.includes(comment.post)
        ).length
        
        const userComments = commentsWithStringIds.filter(comment => 
          compareIds(comment.user, user._id)
        ).length
        
        return {
          ...user,
          points: calculateUserPoints(userPosts.length, postLikes, userComments),
          achievements: getUserAchievements(userPosts.length, postLikes, userComments),
          location: user.village || "Unknown",
          stats: {
            posts: userPosts.length,
            likes: postLikes,
            comments: userComments
          }
        }
      })

    // Process villages
    const processedVillages = villages.map(village => {
      const villageUsers = usersWithStringIds.filter(user => user.village === village.name)
      const villageUserIds = villageUsers.map(u => u._id)
      
      const villagePosts = postsWithStringIds.filter(post => 
        villageUserIds.some(id => compareIds(id, post.user))
      )
      const villagePostIds = villagePosts.map(p => p._id)
      
      const villageLikes = likesWithStringIds.filter(like => 
        like.post && villagePostIds.includes(like.post)
      ).length
      
      const villageComments = commentsWithStringIds.filter(comment => 
        comment.post && villagePostIds.includes(comment.post)
      ).length
      
      const verifiedUsers = villageUsers.filter(u => u.status === "verified").length
      
      return {
        ...village,
        points: villageUsers.length ,// calculateVillagePoints(villageUsers.length /* , villagePosts.length, villageLikes, villageComments */),
        achievements: getVillageAchievements(villageUsers.length, verifiedUsers, villagePosts.length),
        state: village.district || village.location || "Unknown",
        population: village.population ? `${village.population}+` : "Unknown",
        stats: {
          users: villageUsers.length,
          verifiedUsers,
          posts: villagePosts.length,
          likes: villageLikes,
          comments: villageComments
        }
      }
    })

    return {
      ambassadors: ambassadors.sort((a, b) => b.points - a.points),
      users: regularUsers.sort((a, b) => b.points - a.points),
      villages: processedVillages.sort((a, b) => b.points - a.points)
    }
  }, [villages, users, posts, comments, likes])


  // Filter by month
  const filterByMonth = (data) => {
    const currentYear = new Date().getFullYear()
    return data.filter(item => {
      const itemDate = new Date(item.createdAt)
      return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === currentYear
    })
  }

  // Get current data based on active tab
  const getCurrentData = () => {
    const data = processedData[activeTab] || []
    return data
   // return filterByMonth(data)
  }

  // Rest of your component remains the same...
  // (Keep all the JSX rendering code from your original file)
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
    <div className="min-h-screen p-4 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HiSparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-yellow-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <HiSparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 text-lg">Top performers of {months[selectedMonth]}</p>
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-lg border-2 border-yellow-100">
            <FaCalendarAlt className="w-4 h-4 text-yellow-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="bg-transparent font-semibold text-gray-700 focus:outline-none"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
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
            Top 50 {showSidebar ? "Hide" : "Show"}
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
                        key={item._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + actualIndex * 0.1 }}
                        className={`flex flex-col items-center ${position === 2 ? "order-first lg:order-none" : ""}`}
                      >
                        <div className="relative cursor-pointer group" onClick={() => setSelectedItem(item)}>
                          {(activeTab === "ambassadors" || activeTab === "users") &&  (
                            <div className="relative mb-4">
                              <img
                                src={item?.profilepic?.url || "/placeholder.svg"}
                                alt={item.fullname}
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
                            className={`bg-gradient-to-t ${colors[actualIndex]} ${heights[actualIndex]} w-20 mx-4 lg:w-24 rounded-t-lg shadow-lg flex flex-col items-center justify-end pb-2 group-hover:shadow-xl transition-all duration-300`}
                          >
                            <div className="text-white font-bold text-lg">{position}</div>
                          </div>

                          <div className="text-center mt-2">
                            <h3 className="font-bold text-gray-800 text-sm lg:text-base max-w-20">{item.name}</h3>
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
                          src={item?.profilepic?.url || "/placeholder.svg"}
                          alt={item.fullname}
                          className="w-12 h-12 rounded-full border-2 border-emerald-200 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{activeTab === "villages" ? `${item.name}`:`${item.fullname}`}</h3>
                        <p className="text-gray-600 text-sm">
                          {activeTab === "villages" ? `${item.name} • ${item.population}` : item.village}
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
                      src={selectedItem.profilepic.url || "/placeholder.svg"}
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
 function getTabIcon(tab) {
    switch (tab) {
      case "ambassadors": return <FaCrown className="w-5 h-5" />
      case "users": return <FaUsers className="w-5 h-5" />
      case "villages": return <FaMapMarkerAlt className="w-5 h-5" />
      default: return null
    }
  }

export default LeaderboardDashboard