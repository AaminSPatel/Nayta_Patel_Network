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

 const shareStory = async (platform) => {
  try {
    const url = window.location.href;
    const title = story?.title || "Amazing Story";

    // Use Web Share API if available (especially for mobile)
    if (navigator.share && (platform === 'facebook' || platform === 'twitter' || platform === 'whatsapp')) {
      await navigator.share({
        title: title,
        url: url
      });
      setShowShareMenu(false);
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    };

    if (platform === "copy") {
      await navigator.clipboard.writeText(url);
     // alert("Link copied to clipboard!");
    } else {
      // Open in new tab instead of popup for better compatibility
      window.open(shareUrls[platform], "_blank");
    }
  } catch (error) {
    console.error("Sharing failed:", error);
    //alert("Sharing failed. Please try again.");
  } finally {
    setShowShareMenu(false);
  }
};


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
       
          
          <div className="relative">
  <button
    onClick={() => setShowShareMenu(!showShareMenu)}
    className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors text-sm"
  >
    <FaShare className="text-xs" />
    Share This Story
  </button>

  {showShareMenu && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute left-0 top-12 bg-white rounded-lg shadow-lg border p-2 min-w-[150px] z-50"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          shareStory("facebook");
        }}
        className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded text-sm cursor-pointer"
      >
        <FaFacebook className="text-blue-600" />
        Facebook
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          shareStory("twitter");
        }}
        className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded text-sm cursor-pointer"
      >
        <FaTwitter className="text-blue-400" />
        Twitter
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          shareStory("whatsapp");
        }}
        className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded text-sm cursor-pointer"
      >
        <FaWhatsapp className="text-green-500" />
        WhatsApp
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          shareStory("copy");
        }}
        className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded text-sm cursor-pointer"
      >
        <FaCopy className="text-gray-600" />
        Copy Link
      </button>
    </motion.div>
  )}
</div>
        </motion.div>
        
      </main>

      {/* Click outside to close share menu */}
      {showShareMenu && <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />}
    </div>
  )
}
