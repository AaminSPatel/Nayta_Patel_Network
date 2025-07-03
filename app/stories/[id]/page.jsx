"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaShare,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaCopy,
  FaEye,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTags,
  FaInstagram,
} from "react-icons/fa"
import Image from "next/image"
import { usePatel } from "../../../components/patelContext"
import Link from "next/link"


export default function StoryPage() {
  const params = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [viewsUpdated, setViewsUpdated] = useState(false)
  const {stories , path,formatContent} = usePatel();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        // Find story by ID
        const foundStory = stories.find((s) => s._id === params.id)

        if (foundStory && !viewsUpdated) {
          // Update views count
         // await updateViews(foundStory.id)
        // foundStory.views += 1
        //  setViewsUpdated(true)
        }

        setStory(foundStory)
      } catch (error) {
        console.error("Error fetching story:", error)
      } finally {
        setLoading(false)
      }
    }
if(stories){
 fetchStory()
}
  }, [params.id, stories])

   useEffect(() => {
    if (!params.id && path === 'http://localhost:5000') return;
    // Create a unique identifier for this view attempt
    //const viewKey = `news-view-${newsId}`;
    // Check if we've already tried to count this view
   // if (sessionStorage.getItem(viewKey)) return;
    const timer = setTimeout(async () => {
      try {
        // Mark this view attempt as started
        //sessionStorage.setItem(viewKey, 'true');
        
        // Send the view update request
        const response = await fetch(path + `/api/stories/viewUpdate/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          // No need to send IP from client - get it from the server
        });

       // console.log(response);
        if(
          response.success
        ){
        //  console.log('View updated');
        }
        

      } catch (error) {
        console.error('Error updating view count:', error);
       //sessionStorage.removeItem(viewKey);
      }
    }, 5000); // 5 second delay

    // Cleanup function to cancel the timer if component unmounts
    return () => clearTimeout(timer);
  }, [params.id]);

  const updateViews = async (storyId) => {
    try {
      // Replace with your actual API endpoint
      await fetch(path+`/api/stories/${storyId}/views`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("Error updating views:", error)
    }
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  const shareViaPlatform = (platform) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(story?.title || "Amazing Story")
    const text = encodeURIComponent(story?.content?.substring(0, 190) || "Check this out!")

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}%20${text}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      instagram : `https://www.instagram.com/?url=${url}&title=${text}`
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(window.location.href)
      return
    }

    window.open(shareUrls[platform], "_blank", "noopener,noreferrer")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Story Not Found</h1>
          <p className="text-gray-600">The story you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => window.history.back()} className="text-black hover:text-emerald-600 transition-colors">
            ← Back
          </button>

        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Story Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-6 leading-tight">{story.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <FaTags className="text-emerald-500" />
              <span>{story.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-emerald-500" />
              <span>{story.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-emerald-500" />
              <span>{formatDate(story.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-emerald-500" />
              <span>{story.views.toLocaleString()} views</span>
            </div>
          </div>
        </motion.div>

        {/* Story Content with Image */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Featured Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={story?.image?.url || "/placeholder.svg"}
              alt={story.title}
              width={800}
              height={400}
              className="w-full h-56 md:h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Story Content */}
          <div className="text-gray-800 leading-relaxed">{formatContent(story.content)}</div>
          <p className=" py-1">लेखक: <Link href={`/profile/${story.publisher._id}`} className=" text-white bg-emerald-500 px-3 py-2 text-sm rounded-2xl whitespace-nowrap  max-w-20 overflow-hidden"> {story?.publisher?.fullname}</Link></p>
        </motion.article>

        {/* Call to Action */}
         <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 p-6 bg-emerald-50 rounded-xl border border-emerald-100"
      >
        <h3 className="text-lg md:text-xl font-bold text-black mb-3">Inspired by this story?</h3>
        <p className="text-sm md:text-base text-gray-700 mb-4">
          Share it with others who need motivation and inspiration to chase their dreams.
        </p>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => shareViaPlatform("facebook")}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Share on Facebook"
          >
            <FaFacebook className="text-lg" />
          </button>
          
          <button
            onClick={() => shareViaPlatform("twitter")}
            className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
            aria-label="Share on Twitter"
          >
            <FaTwitter className="text-lg" />
          </button>
          
          <button
            onClick={() => shareViaPlatform("whatsapp")}
            className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="text-lg" />
          </button>
          
          <button
            onClick={() => shareViaPlatform("instagram")}
            className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <FaInstagram className="text-lg" />
          </button>
          
          <button
            onClick={() => shareViaPlatform("copy")}
            className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Copy link"
          >
            <FaCopy className="text-lg" />
          </button>
        </div>
      </motion.div>
      </main>

      {/* Click outside to close share menu */}
      {showShareMenu && <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />}
    </div>
  )
}
