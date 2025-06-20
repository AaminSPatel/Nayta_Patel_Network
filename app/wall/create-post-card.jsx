"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiImage, FiVideo, FiMapPin, FiSmile, FiX } from "react-icons/fi"
import { usePatel } from "../../components/patelContext"

const MAX_CHARS = 600;

const CreatePostCard = ({ onAddPost, userData }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { path, tags } = usePatel()
  const [postContent, setPostContent] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(MAX_CHARS)

  useEffect(() => {
    setCharsRemaining(MAX_CHARS - postContent.length)
  }, [postContent])

  const handleContentChange = (e) => {
    if (e.target.value.length <= MAX_CHARS) {
      setPostContent(e.target.value)
    }
  }

  const handleFocus = () => setIsExpanded(true)

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
      const foundTags = tags.filter(tag => {
        const regex = new RegExp(`\\b${tag}\\b`, 'i')
        return regex.test(postContent)
      })

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
      setPostContent('')
      setIsExpanded(false)
      if (onAddPost) onAddPost(result.post)
      
    } catch (err) {
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
                onChange={handleContentChange}
                placeholder={`What's on your mind, ${userData.fullName.split(" ")[0]}?`}
                className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                autoFocus
              />
              <div className={`text-xs text-right ${charsRemaining < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                {charsRemaining} / {MAX_CHARS} characters remaining
              </div>

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
          >
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                {/* Media buttons can go here */}
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
                  disabled={!postContent.trim() || isSubmitting || charsRemaining < 0}
                  className={`px-4 py-2 rounded-md ${
                    !postContent.trim() || isSubmitting || charsRemaining < 0
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
    </motion.div>
  )
}

export default CreatePostCard