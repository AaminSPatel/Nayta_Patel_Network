"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMapPin, FiPhone, FiMail, FiUser, FiCalendar, FiGrid, FiTrendingUp, FiShield } from "react-icons/fi"
import { FaSeedling, FaComments, FaThumbsUp, FaCrown, FaMedal, FaGem } from "react-icons/fa"
import { GiWheat, GiLaurelCrown } from "react-icons/gi"
import Head from "next/head"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { usePatel } from "../../../components/patelContext"
import PostCard from "../../../components/postCard"

const PublicProfile = () => {
  const { siteUrl, path, user, timeAgo, comments: allComments, posts } = usePatel()
  const { id } = useParams()
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    fullName: "",
    village: "",
    mobile: "",
    email: "",
    profilePic: "",
    role: "",
    createdAt: "",
    posts: 0,
    comments: 0,
    likes: 0,
    bio: "",
    totalLikesReceived: 0,
    totalCommentsReceived: 0,
  })

  const [userPosts, setUserPosts] = useState([])
  const [allLikes,setAllLikes] = useState(null)
  const [allComment,setAllComment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")
  const [postsLoading, setPostsLoading] = useState(false)

  useEffect(()=>{
    if(posts.length && user && allComments.length){
let allCommentsCount = allComments.filter(item => item?.user === id.toString()).length;

     setAllComment(allCommentsCount)
console.log(allCommentsCount,'allcoments');

        let alllikes =  posts.filter((post) => post.user._id === id).reduce((totalLikes, post) => totalLikes + (post.likes?.length || 0), 0);
        setAllLikes(alllikes)
    }
  },[allComments,posts,user])
  useEffect(() => {
    if (user?._id === id && user) {
      router.push("/profile")
    }
  }, [user])

  useEffect(() => {
    if (posts.length && user) {
        let usersPosts = posts.filter((item)=>item.user._id === id)
      setUserPosts(usersPosts)
    }
  }, [posts,user])

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch(`${path}/api/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()

        // Calculate total likes and comments received on user's posts
        const totalLikesReceived = data.posts?.reduce((total, post) => total + (post.likes?.length || 0), 0) || 0
        const totalCommentsReceived = data.posts?.reduce((total, post) => total + (post.comments?.length || 0), 0) || 0

        setProfileData({
          fullName: data.fullname,
          village: data.village,
          mobile: data?.mobile || "**** *** ***",
          email: data?.email || `*****@gmail.com`,
          profilePic: data.profilepic?.url,
          role: data.role,
          createdAt: data.createdAt,
          posts: data.posts?.length || 0,
          comments: data.comments?.length || 0,
          likes: data.likes?.length || 0,
          bio: data.bio || `${data.fullname} हमारे इस डिजिटल परिवार का एक अहम और अनमोल हिस्सा हैं।`,
          totalLikesReceived,
          totalCommentsReceived,
        })

       // setUserPosts(data.posts || [])
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  const handlePostUpdate = (updatedPost) => {
    setUserPosts((prevPosts) => prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
  }

  // Background Animation Component
  const BackgroundAnimation = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-300 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative">
        <BackgroundAnimation />
        <div className="relative z-10 flex justify-center items-center h-screen">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-gray-600 font-medium">Loading profile...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-ping h-24 w-24 rounded-full bg-emerald-100 opacity-75"></div>
              </div>
              <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white border-2 border-emerald-500 shadow-lg">
                <FiUser className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">कृपया जानकारी देखने के लिए लॉग इन करें</h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            इस पेज तक पहुँचने के लिए आपको अपना खाता बनाना होगा। हमारे समुदाय का हिस्सा बनें और विशेष सुविधाओं का लाभ उठाएं।
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors font-medium"
              >
                लॉग इन करें
              </motion.button>
            </Link>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
              >
                नया खाता बनाएं
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative">
      <BackgroundAnimation />

      <Head>
        <title>{profileData.fullName} | Nayta Patel Community</title>
        <meta name="description" content={`Profile of ${profileData.fullName} from ${profileData.village}`} />
        <meta property="og:title" content={`${profileData.fullName} | Nayta Patel Community`} />
        <meta property="og:description" content={`Community member from ${profileData.village}`} />
        <meta property="og:image" content={profileData.profilePic || `${siteUrl}/default-profile.jpg`} />
      </Head>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Profile Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Cover Photo with Gradient */}
          <div className="h-48 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 to-blue-500/50"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(16, 185, 129, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%)",
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.5) 0%, rgba(16, 185, 129, 0.5) 100%)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            {/* Floating Icons */}
            <div className="absolute inset-0 flex items-center justify-center text-white/20">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl"
              >
                <GiWheat />
              </motion.div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-6 pb-8 -mt-16">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <img
                  src={profileData.profilePic || "/user.avif"}
                  alt={profileData.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                />

                {profileData.role === "ambassador" && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full p-3 shadow-lg"
                  >
                    <FaCrown size={20} />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Name and Village */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-6"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{profileData.fullName}</h1>
              <div className="flex items-center justify-center text-emerald-600 text-lg">
                <FiMapPin className="mr-2" />
                <span>{profileData.village}</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              {profileData.bio}
            </motion.p>

            {/* Enhanced Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <FaSeedling className="text-emerald-600 text-3xl mx-auto mb-3" />
                <p className="text-2xl font-bold text-emerald-800">{userPosts?.length}</p>
                <p className="text-sm text-emerald-600 font-medium">Posts</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <FaComments className="text-blue-600 text-3xl mx-auto mb-3" />
                <p className="text-2xl font-bold text-blue-800">{allComment}</p>
                <p className="text-sm text-blue-600 font-medium">Comments Received</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <FaThumbsUp className="text-pink-600 text-3xl mx-auto mb-3" />
                <p className="text-2xl font-bold text-pink-800">{allLikes}</p>
                <p className="text-sm text-pink-600 font-medium">Likes Received</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <FiTrendingUp className="text-purple-600 text-3xl mx-auto mb-3" />
                <p className="text-2xl font-bold text-purple-800">{profileData.comments}</p>
                <p className="text-sm text-purple-600 font-medium">Comments Made</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Ambassador Card */}
     <AnimatePresence>
  {profileData.role === "ambassador" && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl text-white">
            <GiLaurelCrown />
          </div>
          <div className="absolute bottom-4 right-4 text-6xl text-white">
            <FaGem />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white">
            <FaMedal />
          </div>
        </div>

        <div className="relative z-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <FiShield className="text-white text-3xl" />
          </motion.div>

          <h3 className="text-3xl font-bold text-white mb-3">🏆 Village Ambassador</h3>
          <p className="text-yellow-100 text-lg leading-relaxed max-w-md mx-auto">
            <span className="font-semibold text-white">{profileData.fullName}</span> साहब, 
            <span className="font-semibold text-white"> {profileData.village}</span> के आधिकारिक 
            <span className="italic font-bold"> Ambassador</span> हैं। आप पूरी ईमानदारी और 
            मेहनत से हमारे समाज की खिदमत कर रहे हैं।
          </p>

          <div className="flex justify-center mt-6 space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white font-medium">✨ वेरीफाइड</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white font-medium">🌟 भरोसेमंद सदस्य</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-2 mb-8"
        >
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === "posts" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiGrid />
              <span>Posts ({userPosts?.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === "details" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiUser />
              <span>Details</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {userPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">No posts yet</h3>
                  <p className="text-gray-500">{profileData.fullName} hasn't shared anything yet.</p>
                </motion.div>
              ) : (
                userPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <PostCard
                      post={post}
                      user={user}
                      timeAgo={timeAgo}
                      allComments={allComments}
                      apiPath={path}
                      onPostUpdate={handlePostUpdate}
                      enableNavigation={true}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                  Personal Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl"
                  >
                    <div className="bg-emerald-600 p-3 rounded-full">
                      <FiUser className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-emerald-800 mb-1">Full Name</h3>
                      <p className="text-gray-900 font-semibold">{profileData.fullName}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl"
                  >
                    <div className="bg-blue-600 p-3 rounded-full">
                      <FiMapPin className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800 mb-1">Village</h3>
                      <p className="text-gray-900 font-semibold">{profileData.village}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl"
                  >
                    <div className="bg-purple-600 p-3 rounded-full">
                      <FiPhone className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-purple-800 mb-1">Mobile</h3>
                      <p className="text-gray-900 font-semibold">{profileData.mobile}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl"
                  >
                    <div className="bg-pink-600 p-3 rounded-full">
                      <FiMail className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-pink-800 mb-1">Email</h3>
                      <p className="text-gray-900 font-semibold">{profileData.email}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl md:col-span-2"
                  >
                    <div className="bg-yellow-600 p-3 rounded-full">
                      <FiCalendar className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800 mb-1">Member Since</h3>
                      <p className="text-gray-900 font-semibold">
                        {new Date(profileData.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PublicProfile
