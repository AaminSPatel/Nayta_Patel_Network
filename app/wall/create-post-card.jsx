"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { FiImage, FiVideo, FiMapPin, FiSmile, FiX } from "react-icons/fi"
import { usePatel } from "../../components/patelContext"

const CreatePostCard = ({ onAddPost, userData }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { path, tags } = usePatel()
  
  const [postContent, setPostContent] = useState('')

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleCancel = () => {
    setIsExpanded(false)
    setPostContent('')
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!postContent.trim()) {
      setError("Post content cannot be empty")
      return
    }

    setIsSubmitting(true)
    setLoading(true)
    setError(null)
    
    const token = localStorage.getItem('token')
    if (!token) {
      setError("Authentication token not found")
      setIsSubmitting(false)
      setLoading(false)
      return
    }

    try {
      // Extract auto-tags from content
      const foundTags = tags.filter(tag => {
        const regex = new RegExp(`\\b${tag}\\b`, 'i')
        return regex.test(postContent)
      })

      // Limit to a reasonable number of tags
      const selectedTags = foundTags.slice(0, 10)

      const response = await fetch(path + '/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: postContent.trim(),
          tags: selectedTags
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create post')
      }

      const result = await response.json()
      console.log("Post created successfully:", result)
      
      // Reset form
      setPostContent('')
      setIsExpanded(false)
      
      // Call success callback if provided
      if (onAddPost) onAddPost(result.post)
      
    } catch (err) {
      console.error('Submission error:', err)
      setError(err.message || 'Failed to save post')
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={userData.profilePic?.url || "/placeholder.svg"}
            alt={userData.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div
            className={`flex-1 bg-gray-100 rounded-full px-4 py-2 cursor-text ${isExpanded ? "hidden" : "block"}`}
            onClick={handleFocus}
          >
            <p className="text-gray-500">What's on your mind, {userData.fullName.split(" ")[0]}?</p>
          </div>

          {isExpanded && (
            <div className="flex-1 space-y-3">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={`What's on your mind, ${userData.fullName.split(" ")[0]}?`}
                className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                autoFocus
              />

              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center text-sm">
                  <FiX className="mr-2" size={18} />
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
          >
     {/*        <div className="mt-4 flex flex-wrap gap-2">
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm flex items-center">
                <FiMapPin className="mr-1" />
                {userData.village}
              </div>
            </div> */}

            <div className="mt-4 flex justify-between items-center">
             <div className="flex space-x-2">
               {/*    <button type="button" className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full">
                  <FiImage />
                </button>
               <button type="button" className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full">
                  <FiVideo />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full">
                  <FiSmile />
                </button> */}
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!postContent.trim() || isSubmitting}
                  className={`px-4 py-2 rounded-md ${
                    !postContent.trim() || isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : 'Post'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

   {/*    {!isExpanded && (
        <div className="border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <button type="button" className="flex-1 py-1 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-md">
              <FiImage className="mr-2" />
              <span>Photo</span>
            </button>
            <button type="button" className="flex-1 py-1 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-md">
              <FiVideo className="mr-2" />
              <span>Video</span>
            </button>
            <button type="button" className="flex-1 py-1 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-md">
              <FiMapPin className="mr-2" />
              <span>Location</span>
            </button>
          </div>
        </div>
      )} */}
    </motion.div>
  )
}

export default CreatePostCard