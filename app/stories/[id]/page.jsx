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

// Mock data - replace with your actual data source
const storiesData = [
  {
    id: "1",
    title: "From Zero to Hero: The Journey of Elon Musk",
    content: `*Elon Musk* started his journey with nothing but a dream and determination.

**Early Life**
Born in South Africa, Elon showed signs of brilliance from an early age. He taught himself computer programming and sold his first software at age 12.

*The PayPal Days*
- Co-founded Zip2 in 1995
- Sold it for $307 million
- Founded X.com which became PayPal
- Sold PayPal to eBay for $1.5 billion

**The Tesla Revolution**
Elon didn't just want to make cars; he wanted to *revolutionize transportation*. Tesla started as a small startup with a big vision.

*Key Milestones:*
- 2008: Tesla Roadster launched
- 2012: Model S changed everything
- 2020: Tesla became most valuable automaker
- 2023: Over 4 million cars delivered

**SpaceX: Reaching for the Stars**
While others said it was impossible, Elon believed in making life *multiplanetary*.

*SpaceX Achievements:*
- First private company to reach orbit
- First to dock with International Space Station
- First to land and reuse rockets
- Planning Mars missions

*"When something is important enough, you do it even if the odds are not in your favor."* - Elon Musk

**The Lesson**
Elon's story teaches us that with *persistence*, *innovation*, and *courage* to take risks, we can achieve the impossible.`,
    image: "/placeholder.svg?height=400&width=600",
    category: "Entrepreneur",
    location: "Austin, Texas",
    views: 15420,
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Oprah Winfrey: From Poverty to Media Empire",
    content: `*Oprah Winfrey* is living proof that your circumstances don't define your destiny.

**Humble Beginnings**
Born into poverty in rural Mississippi, Oprah faced numerous challenges in her early life. But she had something that money couldn't buy - *determination*.

*Early Career:*
- Started in radio at age 17
- Became youngest news anchor in Nashville
- Moved to Chicago for AM Chicago show
- Transformed it into The Oprah Winfrey Show

**Building an Empire**
Oprah didn't just host a show; she built a *media empire*.

*Business Ventures:*
- Harpo Productions
- O, The Oprah Magazine
- OWN Network
- Weight Watchers investment

**Philanthropy and Impact**
Oprah has donated over *$400 million* to educational causes.

*Major Contributions:*
- Oprah Winfrey Leadership Academy for Girls
- Scholarships for thousands of students
- Disaster relief efforts
- Supporting various charities

**The Oprah Effect**
Her book recommendations could make bestsellers overnight. Her influence extended far beyond television.

*"The biggest adventure you can take is to live the life of your dreams."* - Oprah Winfrey

**Key Lessons**
- *Education* is the key to breaking cycles
- *Authenticity* resonates with people
- *Giving back* multiplies success
- *Believing in yourself* is the first step`,
    image: "/placeholder.svg?height=400&width=600",
    category: "Media Mogul",
    location: "Chicago, Illinois",
    views: 12890,
    date: "2024-01-10",
  },
]

export default function StoryPage() {
  const params = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [viewsUpdated, setViewsUpdated] = useState(false)
  const {stories , path} = usePatel();

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

  const formatContent = (content) => {
    if (!content) return ""

    // Split content into lines
    const lines = content.split("\n")
    const formattedLines = []

    lines.forEach((line, index) => {
      if (line.trim() === "") {
        formattedLines.push(<br key={`br-${index}`} />)
        return
      }

      // Handle list items
      if (line.trim().startsWith("- ")) {
        const listItem = line.replace(/^- /, "")
        const formattedItem = formatTextStyles(listItem)
        formattedLines.push(
          <div key={index} className="flex items-start mb-2 ml-4">
            <span className="text-emerald-500 mr-2 mt-1">•</span>
            <span className="text-sm md:text-base leading-relaxed">{formattedItem}</span>
          </div>,
        )
        return
      }

      // Handle regular lines
      const formattedLine = formatTextStyles(line)
      formattedLines.push(
        <p key={index} className="mb-4 text-sm md:text-base leading-relaxed">
          {formattedLine}
        </p>,
      )
    })

    return formattedLines
  }

  const formatTextStyles = (text) => {
    const parts = []
    let currentIndex = 0

    // Handle **text** (highlighted)
    const doubleAsteriskRegex = /\*\*(.*?)\*\*/g
    let match

    while ((match = doubleAsteriskRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > currentIndex) {
        const beforeText = text.slice(currentIndex, match.index)
        parts.push(formatSingleAsterisk(beforeText))
      }

      // Add highlighted text
      parts.push(
        <span
          key={`highlight-${match.index}`}
          className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-semibold"
          id={`highlight-${match.index}`}
        >
          {match[1]}
        </span>,
      )

      currentIndex = match.index + match[0].length
    }

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.slice(currentIndex)
      parts.push(formatSingleAsterisk(remainingText))
    }

    return parts.length > 0 ? parts : formatSingleAsterisk(text)
  }

  const formatSingleAsterisk = (text) => {
    const parts = []
    const singleAsteriskRegex = /\*([^*]+?)\*/g
    let lastIndex = 0
    let match

    while ((match = singleAsteriskRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      // Add bold text
      parts.push(
        <strong key={`bold-${match.index}`} className="font-bold text-black">
          {match[1]}
        </strong>,
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : text
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
              className="w-full h-48 md:h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Story Content */}
          <div className="text-gray-800 leading-relaxed">{formatContent(story.content)}</div>
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
