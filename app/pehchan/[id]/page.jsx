"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiHeart,
  FiShare2,
  FiPhone,
  FiChevronLeft,
  FiChevronRight,
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiVolume2,
  FiEye,
  FiSend,
} from "react-icons/fi"
import { BiLogoWhatsapp, BiLogoYoutube, BiLogoFacebook, BiLogoTelegram, BiLogoInstagram } from "react-icons/bi"
import Link from "next/link"
import { useParams } from "next/navigation"
import { usePatel } from "../../../components/patelContext"

export default function StoryPage() {
  const params = useParams()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [relatedStories, setRelatedStories] = useState([])
  const [showShareOptions, setShowShareOptions] = useState(false)
  const { pehchans, formatDate, formatContent,path ,user} = usePatel()
  const story = pehchans.find((s) => s._id === params.id)
  const [currentUserId, setCurrentUserId] = useState(null) // Add this state
  // Initialize like state
   // Get current user ID when component mounts
   
  useEffect(() => {
    //const token = localStorage.getItem('token')
    if (user) {
      // You'll need to implement this function to decode the token and get user ID
      setCurrentUserId(user._id)
    }
  }, [user])
  // Initialize like state
  useEffect(() => {
    if (story && currentUserId) {
      setLikeCount(story.likes?.length || 0)
      setLiked(story.likes?.includes(currentUserId)) // Check if current user has liked
    }
  }, [story, currentUserId])

  // Get related stories
  useEffect(() => {
    if (pehchans.length > 0 && story) {
      if (pehchans.length > 10) {
        let stories = pehchans?.filter(
          (s) =>
            s._id !== story._id &&
            (s.village === story.village || s.profession === story.profession || s.category === story.category),
        ).slice(0, 7)
        setRelatedStories(stories)
      } else {
        let stories = pehchans?.filter((s) => s._id !== story._id).slice(0, 7)
        setRelatedStories(stories)
      }
    }
  }, [pehchans, story])

  // Auto-update view count after 5 seconds
  useEffect(() => {
    if (story?._id) {
      const timer = setTimeout(() => {
        updateViewCount(story._id)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [story?._id])

  // Update view count
  const updateViewCount = async (storyId) => {
    try {
      const response = await fetch(path+`/api/pehchan/${storyId}/views`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update view count')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error updating view count:', error)
      return null
    }
  }

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch(path+`/api/pehchan/${story._id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update like')
      }

      const result = await response.json()
      
      // Update local state
      setLiked(!liked)
      setLikeCount(result.likes.length)
      
      return result
    } catch (error) {
      console.error('Error updating like:', error)
      return null
    }
  }

  // Update share count
  const updateShareCount = async () => {
    try {
      const response = await fetch(path+`/api/pehchan/${story._id}/share`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update share count')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error updating share count:', error)
      return null
    }
  }

  // Share on specific platform
  const shareOnPlatform = async (platform) => {
    const message = `${story.name} की प्रेरणादायक कहानी देखें: ${story.story.slice(0,160)} ${window.location.origin}/pehchan/${story._id}`
    let url = ''
    
    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
        break
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`
        break
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll open the app
        url = `instagram://`
        break
      default:
        if (navigator.share) {
          await navigator.share({
            title: `${story.name} की कहानी`,
            text: message,
            url: window.location.href,
          })
        }
    }
    
    // Update share count after sharing
    if (url) {
      window.open(url, '_blank')
    }
    await updateShareCount()
    setShowShareOptions(false)
  }

  const handleCall = () => {
    window.open(`tel:${story.mobile}`)
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/91${story.whatsappNumber}`)
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">कहानी नहीं मिली</h1>
          <Link href="/pehchan">
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md">
              मुख्य पृष्ठ पर जाएं
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/pehchan">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
          >
            <FiArrowLeft />
            <span>वापस जाएं</span>
          </motion.button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-8 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 rounded-xl shadow-lg overflow-hidden border border-emerald-100"
        >
          <div>
            <img src={story.image.url} alt="Story" className="h-36 w-36 mx-auto mt-2 rounded-2xl shadow-2xl shadow-emerald-200"/>
          </div>
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
                >
                  {story.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 mb-6"
                >
                  <p className="text-gray-600">
                    <span className="font-semibold">पिता:</span> {story.father}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">गांव:</span> {story.village}
                  </p>
                  <p className="text-emerald-600 font-semibold text-lg">{story.profession}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex space-x-3 mb-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCall}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md"
                  >
                    <FiPhone />
                    <span>कॉल करें</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsApp}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
                  >
                    <BiLogoWhatsapp />
                    <span>WhatsApp</span>
                  </motion.button>
                </motion.div>
              </div>

              <div className="flex flex-col justify-center">
                <motion.blockquote
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl font-medium text-gray-700 italic border-l-4 border-emerald-500 pl-4 mb-6 yatra"
                >
                  "{story.quote}"
                </motion.blockquote>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-2 py-1 rounded-2xl transition-colors font-medium ${
                      liked
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <FiHeart className={liked ? "fill-current" : ""} />
                    <span>{likeCount}</span>
                  </motion.button>
 <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    
                    className={`flex items-center space-x-2 px-2 py-1 rounded-2xl transition-colors font-medium bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 `}
                  >
                    <FiEye />
                    <span>{story.views}</span>
                  </motion.div>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="flex items-center space-x-2 px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors font-medium"
                    >
                      <FiSend />
                      <span>{story.shareCount}</span>
                    </motion.button>

                    {/* Share Options Dropdown */}
                    {showShareOptions && (
                      <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="p-2">
                          <button
                            onClick={() => shareOnPlatform('whatsapp')}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <BiLogoWhatsapp className="mr-2 text-green-500" />
                            WhatsApp
                          </button>
                          <button
                            onClick={() => shareOnPlatform('facebook')}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <BiLogoFacebook className="mr-2 text-blue-600" />
                            Facebook
                          </button>
                          <button
                            onClick={() => shareOnPlatform('telegram')}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <BiLogoTelegram className="mr-2 text-blue-400" />
                            Telegram
                          </button>
                          <button
                            onClick={() => shareOnPlatform('instagram')}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <BiLogoInstagram className="mr-2 text-pink-500" />
                            Instagram
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Story Content */}
      <div className="container mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-emerald-100"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">मेरी कहानी</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg comforta">{formatContent(story.story)}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="font-medium ">प्रकाशित: {story.publisherName}</span>
              <span>{formatDate(story.createdAt)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">संबंधित कहानियाँ</h2>

            <div className="flex space-x-4 overflow-x-auto pb-4">
              {relatedStories.map((relatedStory, index) => (
                <motion.div
                  key={relatedStory._id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex-shrink-0  w-72"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden min-w-[280px] hover:shadow-lg transition-all duration-300 border border-emerald-100">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedStory.image.url || "/placeholder.svg"}
                        alt={relatedStory.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-emerald-800 mb-1">{relatedStory.name}</h4>
                      <p className="text-sm text-emerald-600 mb-2 font-medium  line-clamp-1">
                        {relatedStory.village} • {relatedStory.profession}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-3 mb-3">{relatedStory.story.replace(/\*/g, '')}</p>

                      <Link href={`/pehchan/${relatedStory._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md"
                        >
                          पूरी कहानी पढ़ें
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + relatedStories.length * 0.1 }}
                className="flex-shrink-0"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md overflow-hidden min-w-[280px] hover:shadow-lg transition-all duration-300 text-white">
                  <div className="h-40 flex items-center justify-center bg-black/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <p className="font-bold">और भी कहानियाँ</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold mb-2">मुख्य पृष्ठ पर जाएं</h4>
                    <p className="text-sm opacity-90 mb-3">और भी प्रेरणादायक कहानियाँ पढ़ें</p>

                    <Link href="/pehchan">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-white text-emerald-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-300"
                      >
                        सभी कहानियाँ देखें
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}