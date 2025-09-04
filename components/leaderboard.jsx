"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCrown, FaMedal, FaTrophy, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaStar, FaTimes, FaSpinner } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

const LeaderboardDashboard = ({ villages = [], users = [], posts = [], comments = [], likes = [], news = [] }) => {
  const [activeTab, setActiveTab] = useState("ambassadors")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedItem, setSelectedItem] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const [pointsBreakdown, setPointsBreakdown] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  // Points calculation functions with detailed breakdown
  const calculateAmbassadorPoints = (postCount, likeCount, commentCount, replyCount, newsCount) => {
    const basePoints = 100
    const postPoints = postCount * 10
    const likePoints = likeCount * 2
    const commentPoints = commentCount * 5
    const replyPoints = replyCount * 3
    const newsPoints = newsCount * 30
    
    const total = basePoints + postPoints + likePoints + commentPoints + replyPoints + newsPoints
    
    return {
      total,
      breakdown: [
        { label: "Base Points", points: basePoints },
        { label: "Post Points", points: postPoints, count: postCount },
        { label: "Like Points", points: likePoints, count: likeCount },
        { label: "Comment Points", points: commentPoints, count: commentCount },
        { label: "Reply Points", points: replyPoints, count: replyCount },
        { label: "News Points", points: newsPoints, count: newsCount }
      ]
    }
  }

  const calculateUserPoints = (postCount, likeCount, commentCount, replyComments) => {
    const basePoints = 100
    const postPoints = postCount * 10
    const likePoints = likeCount * 2
    const commentPoints = commentCount * 5
    const replyComment = replyComments * 3
    const total = basePoints + postPoints + likePoints + commentPoints + replyComment
    
    return {
      total,
      breakdown: [
        { label: "Base Points", points: basePoints },
        { label: "Post Points", points: postPoints, count: postCount },
        { label: "Like Points", points: likePoints, count: likeCount },
        { label: "Comment Points", points: commentPoints, count: commentCount },
        { label: "Reply Points", points: replyComment, count: replyComments },
      ]
    }
  }

  const calculateVillagePoints = (userCount, postCount, likeCount, commentCount, ambassadorPoints , ambassadorName) => {
    const basePoints = 100
    const userPoints = userCount * 10
    const postPoints = postCount * 5
    const engagementPoints = Math.round((likeCount * 0.5) + (commentCount * 2))
    const ambassadorBonus = ambassadorPoints // Add ambassador points to village
    
    const total = basePoints + userPoints + postPoints + engagementPoints + ambassadorBonus
    
    return {
      total,
      breakdown: [
        { label: "Base Points", points: basePoints },
        { label: "User Points", points: userPoints, count: userCount },
        { label: "Post Points", points: postPoints, count: postCount },
        { label: "Engagement Points", points: engagementPoints, details: `${likeCount} likes, ${commentCount} comments` },
        { label: `${ambassadorName} Ambassador Points`, points: ambassadorBonus, count: 0 }
      ]
    }
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

  const getVillageAchievements = (userCount, verifiedCount, postCount, ambassadorPoints) => {
    const achievements = []
    
    if (userCount >= 50) achievements.push("50+ users")
    else if (userCount >= 20) achievements.push("20+ users")
    
    if (verifiedCount >= userCount * 0.8) achievements.push("80%+ verified users")
    else if (verifiedCount >= userCount * 0.5) achievements.push("50%+ verified users")
    
    if (postCount >= 100) achievements.push("100+ posts")
    else if (postCount >= 50) achievements.push("50+ posts")
    
    if (ambassadorPoints > 0) achievements.push("Has Ambassadors")
    
    return achievements.length > 0 ? achievements : ["New Village"]
  }

  // Process data
  const processedData = useMemo(() => {
    setIsLoading(true)
    
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
      likes: post.likes.length,
      comments: post.comments?.map(id => id?.toString()) || [],
      allComments: post.comments.length
    }))

    const commentsWithStringIds = comments.map(comment => ({
      ...comment,
      _id: comment._id?.toString(),
      user: comment.user?._id.toString(),
      post: comment.post?._id.toString(),
      replies: comment.replies?.map(reply => ({
        ...reply,
        user: reply.user?._id.toString(),
        replyTo: reply.replyTo
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
    
    const newsWithStringIds = news.map(news => ({
      ...news,
      _id: news._id?.toString(),
      publisher: news.publisher?._id.toString(),
    }))

    // Process ambassadors (users with role 'ambassador')
    const ambassadors = usersWithStringIds
      .filter(user => (user.role === "ambassador") && (user?.profilepic?.url?.length > 2))
      .map(user => {
        const ambassadorPosts = postsWithStringIds.filter(post => 
          compareIds(post.user, user._id)
        )
        const ambassadorNews = newsWithStringIds.filter(news =>
          compareIds(news.publisher, user._id)
        )
        const postIds = ambassadorPosts.map(p => p._id.toString())
        
        const totalLikes = ambassadorPosts.map(p => p.likes)
        const postLikes = totalLikes.reduce((sum, likes) => sum + likes, 0)
        
        // Count comments on ambassador's posts
        const postComments = commentsWithStringIds.filter(comment => 
          comment.post && postIds.includes(comment.post)
        ).length
        
        // Count replies to ambassador's comments
        const replyComments = commentsWithStringIds.filter(comment => 
          comment.replies?.some(reply => compareIds(reply.user, user._id))
        ).length
        
        const pointsData = calculateAmbassadorPoints(ambassadorPosts.length, postLikes, postComments, replyComments, ambassadorNews.length)
        
        return {
          ...user,
          points: pointsData.total,
          pointsBreakdown: pointsData.breakdown,
          achievements: getAmbassadorAchievements(ambassadorPosts.length, postLikes, postComments),
          location: user.village || "Unknown",
          stats: {
            posts: ambassadorPosts.length,
            likes: postLikes,
            comments: postComments,
            replies: replyComments,
            news: ambassadorNews.length
          }
        }
      })

    // Process regular users
    const regularUsers = usersWithStringIds
      .filter(user => (user.role !== "ambassador") && (user.role !== "admin") && (user?.profilepic?.url?.length > 0))
      .map(user => {
        const userPosts = postsWithStringIds.filter(post => 
          compareIds(post.user, user._id)
        )
        const postIds = userPosts.map(p => p._id)
        
        const totalLikes = userPosts.map(p => p.likes)
        const postLikes = totalLikes.reduce((sum, likes) => sum + likes, 0)
        
        const userComments = commentsWithStringIds.filter(comment => 
          comment.post && postIds.includes(comment.post)
        ).length
        
        // Count replies to user's comments
        const replyComments = commentsWithStringIds.filter(comment => 
          comment.replies?.some(reply => compareIds(reply.user, user._id))
        ).length
        
        const pointsData = calculateUserPoints(userPosts.length, postLikes, userComments, replyComments)
        
        return {
          ...user,
          points: pointsData.total,
          pointsBreakdown: pointsData.breakdown,
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
      
 //const 


      /* // Calculate ambassador points for this village
      const villageAmbassadors = ambassadors.filter(ambassador => 
        ambassador.village === village.name
      ) */
     /*  const ambassadorPoints = 
 */
 const ambassadorId = village?.ambassador?._id 
       const ambassadorPosts = postsWithStringIds.filter(post => 
          compareIds(post.user,ambassadorId)
        )
        const ambassadorNews = newsWithStringIds.filter(news =>
          compareIds(news.publisher,ambassadorId)
        )
        const postIds = ambassadorPosts.map(p => p._id.toString())
        
        const totalLikes = ambassadorPosts.map(p => p.likes)
        const postLikes = totalLikes.reduce((sum, likes) => sum + likes, 0)
        
        // Count comments on ambassador's posts
        const postComments = commentsWithStringIds.filter(comment => 
          comment.post && postIds.includes(comment.post)
        ).length
        
        // Count replies to ambassador's comments
        const replyComments = commentsWithStringIds.filter(comment => 
          comment.replies?.some(reply => compareIds(reply.user, ambassadorId))
        ).length
        
        const ambassadorPoints = calculateAmbassadorPoints(ambassadorPosts.length, postLikes, postComments, replyComments, ambassadorNews.length)
        
      
      const pointsData = calculateVillagePoints(villageUsers.length, villagePosts.length, villageLikes, villageComments, ambassadorPoints.total, village?.ambassador?.fullname)
      
      return {
        ...village,
        points: pointsData.total,
        pointsBreakdown: pointsData.breakdown,
        achievements: getVillageAchievements(villageUsers.length, verifiedUsers, ambassadorPoints.total),
        state: village.district || village.location || "Unknown",
        population: village.population ? `${village.population}+` : "Unknown",
        stats: {
          users: villageUsers.length,
          verifiedUsers,
          posts: villagePosts.length,
          likes: villageLikes,
          comments: villageComments,
         
          ambassadorPoints : ambassadorPoints.total
        }
      }
    })

    setIsLoading(false)
    
    return {
      ambassadors: ambassadors.sort((a, b) => b.points - a.points),
      users: regularUsers.sort((a, b) => b.points - a.points),
      villages: processedVillages.sort((a, b) => b.points - a.points)
    }
  }, [villages, users, posts, comments, likes, news])

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
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setPointsBreakdown(item.pointsBreakdown)
  }

  const getTabIcon = (tab) => {
    switch (tab) {
      case "ambassadors":
        return <FaCrown className="w-4 h-4" />
      case "users":
        return <FaUsers className="w-4 h-4" />
      case "villages":
        return <FaMapMarkerAlt className="w-4 h-4" />
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading Leaderboard Data...</h2>
          <p className="text-gray-500">Please wait while we process the data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HiSparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
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
          <div className="flex bg-white rounded-xl justify-around p-2 shadow-lg border-2 border-emerald-100">
            {["ambassadors", "users", "villages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center text-sm gap-1 px-2 py-2 rounded-lg font-semibold transition-all duration-300 ${
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
          <div className=" items-center hidden gap-2 bg-white rounded-xl px-4 py-2 shadow-lg border-2 border-yellow-100">
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

          {/* Sidebar Toggle - Show on mobile */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-white rounded-xl px-4 py-2 shadow-lg border-2 border-emerald-100 text-emerald-600 font-semibold lg:hidden"
          >
            {showSidebar ? "Hide" : "Show"} Top 50
          </button>
        </motion.div>

        <div className="flex sm:flex-row flex-col gap-8">
          {/* Main Leaderboard */}
          <div className="flex-1">
            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-end justify-center gap-3 lg:gap-8 mb-8 px-2">
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
                        <div className="relative cursor-pointer group" onClick={() => handleItemClick(item)}>
                          {(activeTab === "ambassadors" || activeTab === "users") &&  (
                            <div className="relative mb-4 flex items-center justify-center">
                              <img
                                src={item?.profilepic?.url || "/placeholder.svg"}
                                alt={item.fullname}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              />
                              <div
                                className={`absolute -top-2 right-2 w-8 h-8 bg-gradient-to-r ${colors[actualIndex]} rounded-full flex items-center justify-center text-white text-sm shadow-lg`}
                              >
                                {icons[actualIndex]}
                              </div>
                            </div>
                          )}

                          {activeTab === "villages" && (
                            <div className="relative mb-4 flex items-center justify-center">
                              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center">
                               {/*  <FaMapMarkerAlt className="w-8 h-8 text-white" /> */}
                                <img
                                src={item?.images[0]?.url || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              />
                              </div>
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
                            <h3 className="font-bold text-gray-800 text-sm lg:text-base max-w-20 truncate">{activeTab === "villages" ? item.name : item.fullname}</h3>
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
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-emerald-50 hover:border-emerald-200 cursor-pointer group transition-all duration-300"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="relative flex items-center gap-4">
                      <div className="absolute w-5 h-5 bottom-0 z-30 left-0 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full flex items-center justify-center font-bold text-emerald-700 text-lg">
                        {index + 4}
                      </div>

                      {(activeTab === "ambassadors" || activeTab === "users") && (
                        <img
                          src={item?.profilepic?.url ||  "/home4.jpg"}
                          alt={item.fullname}
                          className="w-12 h-12 rounded-full border-2 border-emerald-200 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}

                      {activeTab === "villages" && (
                        <div className="w-12 h-12 rounded-full border border-emerald-200 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center">
                          <img
                          src={item?.images[0]?.url || "/home4.jpg"}
                          alt={item.name}
                          className="min-w-12 w-12 h-12 object-cover rounded-full border-2 border-emerald-200 group-hover:scale-110 transition-transform duration-300"
                        />
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{activeTab === "villages" ? `${item.name}`:`${item.fullname}`}</h3>
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

          {/* Sidebar - Top 50 List - Now visible on mobile when toggled */}
          <AnimatePresence>
            {(showSidebar || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="w-full lg:w-80 bg-white rounded-xl shadow-lg border-2 border-emerald-100 p-6 h-fit lg:sticky top-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                    <FaTrophy className="w-5 h-5 text-yellow-500" />
                    टॉप 50 {getTabLabel(activeTab)}
                  </h3>
                  <button 
                    onClick={() => setShowSidebar(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {getCurrentData()
                    .slice(0, 50)
                    .map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.01 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors duration-200"
                        onClick={() => handleItemClick(item)}
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

                        {(activeTab === "ambassadors" || activeTab === "users") && (
                          <img
                            src={item?.profilepic?.url || "/placeholder.svg"}
                            alt={item.fullname}
                            className="w-8 h-8 rounded-full border border-emerald-200"
                          />
                        )}

                        {activeTab === "villages" && (
                          <div className="w-8 h-8 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center">
                            <img
                          src={item?.images[0]?.url ||  "./home4.jpg"}
                          alt={''}
                          className="w-8 h-8 rounded-full border-2 border-emerald-200 group-hover:scale-110 transition-transform duration-300"
                        />
                        </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-800 truncate">{activeTab === "villages" ? item.name : item.fullname}</p>
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
              onClick={() => {
                setSelectedItem(null)
                setPointsBreakdown(null)
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Details</h2>
                  <button 
                    onClick={() => {
                      setSelectedItem(null)
                      setPointsBreakdown(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  {(activeTab === "ambassadors" || activeTab === "users") && (
                    <img
                      src={selectedItem.profilepic?.url || "/placeholder.svg"}
                      alt={selectedItem.fullname}
                      className="w-20 h-20 rounded-full border-4 border-emerald-200 mx-auto mb-4"
                    />
                  )}
                  {activeTab === "villages" && (
                    <div className="w-20 h-20 rounded-full border-4 border-emerald-200 mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center">
                     <img
                          src={selectedItem?.images[0]?.url || "/home4.jpg"}
                          alt={selectedItem.name}
                          className="min-w-12 w-12 h-12 object-cover rounded-full border-2 border-emerald-200 group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeTab === "villages" ? selectedItem.name : selectedItem.fullname}</h2>
                  <p className="text-emerald-600 font-semibold text-lg">{selectedItem.points} अंक</p>
                  <p className="text-gray-600">
                    {activeTab === "villages"
                      ? `${selectedItem.state} • ${selectedItem.population}`
                      : selectedItem.location}
                  </p>
                </div>

                {/* Points Breakdown */}
                {pointsBreakdown && (
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <HiSparkles className="w-4 h-4 text-yellow-500" />
                      Points Breakdown
                    </h3>
                    <div className="space-y-2">
                      {pointsBreakdown.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center p-2 bg-blue-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">
                              {item.label}
                              {item.count !== undefined && ` (${item.count})`}
                              {item.details && ` - ${item.details}`}
                            </span>
                          </div>
                          <span className="font-semibold text-emerald-600">+{item.points}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

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
                  onClick={() => {
                    setSelectedItem(null)
                    setPointsBreakdown(null)
                  }}
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

export default LeaderboardDashboard