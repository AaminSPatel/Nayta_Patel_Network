"use client"

import { useState, useEffect } from "react"
import { useRouter , useParams } from "next/navigation"
import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import { FiArrowLeft, FiHome, FiUser } from "react-icons/fi"
import { usePatel } from "../../../components/patelContext"
import PostCard from "../../../components/postCard"

const PostPage = () => {
  const router = useRouter()
  const { id } = useParams()
  const { user, timeAgo, path, comments, siteUrl ,posts} = usePatel()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id,posts])

  const fetchPost = async () => {
    try {
      setLoading(true)
     
      let postt = await posts.filter((item)=>item._id === id)
      setPost(postt[0])
      setError(null)
    } catch (err) {
      console.error("Error fetching post:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
//const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-500"></div>
        {/* You can replace this with your custom loader */}
      </div>
    );
  }

  const handlePostUpdate = (updatedPost) => {
    setPost(updatedPost)
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  // Animated background particles
  const BackgroundAnimation = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-200 rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Subtle wave animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/30"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
              "linear-gradient(45deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative">
        <BackgroundAnimation />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-gray-600 font-medium">Loading post...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative">
        <BackgroundAnimation />
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-20"
          >
            <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={handleGoBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            </div>
          </motion.div>

          <div className="flex items-center justify-center min-h-[80vh] px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Post not found</h2>
              <p className="text-gray-500 mb-6">The post you're looking for doesn't exist or has been removed.</p>
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
                >
                  <FiHome className="w-4 h-4" />
                  <span>Go Home</span>
                </Link>
                <button
                  onClick={handleGoBack}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative">
      <Head>
        <title>{`${post.user.fullname}'s Post | Community`}</title>
        <meta name="description" content={post.content.substring(0, 160)} />
        <meta property="og:title" content={`${post.user.fullname}'s Post`} />
        <meta property="og:description" content={post.content.substring(0, 160)} />
        <meta property="og:url" content={`${siteUrl}/post/${post._id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${post.user.fullname}'s Post`} />
        <meta name="twitter:description" content={post.content.substring(0, 160)} />
      </Head>

      <BackgroundAnimation />

      <div className="relative z-10">
        {/* Sticky Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-20"
        >
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center space-x-2">
              <Link
                href={`/profile/${post.user._id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
              >
                <img
                  src={post.user.profilepic?.url || "/placeholder.svg?height=24&width=24"}
                  alt={post.user.fullname}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-medium text-sm">{post.user.fullname}</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PostCard
              post={post}
              user={user}
              timeAgo={timeAgo}
              allComments={comments}
              apiPath={path}
              onPostUpdate={handlePostUpdate}
              isDetailView={true}
            />
          </motion.div>

          {/* Related Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center space-x-4"
          >
            <Link
              href={`/profile/${post.user._id}`}
              className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm text-emerald-600 px-6 py-3 rounded-full hover:bg-white/80 transition-all shadow-sm hover:shadow-md"
            >
              <FiUser className="w-4 h-4" />
              <span className="font-medium">View Profile</span>
            </Link>

            <Link
              href="/"
              className="flex items-center space-x-2 bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
            >
              <FiHome className="w-4 h-4" />
              <span className="font-medium">Home Feed</span>
            </Link>
          </motion.div>

          {/* Floating Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="fixed bottom-8 right-8 z-30"
          >
            <button
              onClick={handleGoBack}
              className="bg-white/90 backdrop-blur-sm text-gray-700 p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-white"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PostPage
