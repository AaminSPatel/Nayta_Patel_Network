"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Upload, Clock, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { usePatel } from "./patelContext"

export default function StoryForm({ onCancel, storyToEdit }) {
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    title: "",
    content: "",
    status: "Draft",
    image: null,
    existingImage: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const { path } = usePatel()

  // Initialize form with story data if editing
  useEffect(() => {
    if (storyToEdit) {
      setFormData({
        category: storyToEdit.category || "",
        location: storyToEdit.location || "",
        title: storyToEdit.title || "",
        content: storyToEdit.content || "",
        status: storyToEdit.status || "Draft",
        image: null,
        existingImage: storyToEdit.image?.url || null
      })
    }
  }, [storyToEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB")
      return
    }
    setFormData((prev) => ({ ...prev, image: file }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")
    
    const token = localStorage.getItem('token')
    if (!token) {
      setError("Authentication required")
      setIsSubmitting(false)
      return
    }

    try {
      const formPayload = new FormData()
      formPayload.append('title', formData.title)
      formPayload.append('content', formData.content)
      formPayload.append('category', formData.category)
      formPayload.append('status', formData.status)
      formPayload.append('location', formData.location)
      if (formData.image) {
        formPayload.append('image', formData.image)
      }

      const url = storyToEdit 
        ? `${path}/api/stories/${storyToEdit._id}`
        : `${path}/api/stories`

      const method = storyToEdit ? 'PUT' : 'POST'
 console.log(storyToEdit? 'updating' :"Posting");
 
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formPayload
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save story')
      }

      const result = await response.json()
      setSuccess(storyToEdit ? 'Story updated successfully!' : 'Story created successfully!')
      
      // Refresh and close after 1.5 seconds
      setTimeout(() => {
        router.refresh()
        onCancel()
      }, 1500)

    } catch (err) {
      setError(err.message || 'Failed to save story')
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {storyToEdit ? 'Edit Story' : 'Add New Story'}
        </h3>
        <button 
          onClick={onCancel} 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Story title"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Story location"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            <option value="Success Stories">Success Stories</option>
            <option value="Community Stories">Community Stories</option>
            <option value="Member Stories">Member Stories</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[150px]"
            placeholder="Write your story..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isSubmitting}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image
          </label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload size={24} className="text-gray-400" />
              <p className="text-sm text-gray-500">Drag & drop an image or click to browse</p>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => document.getElementById("image").click()}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Select Image
              </button>
              
              {formData.existingImage && !formData.image && (
                <div className="mt-2 text-sm text-gray-600">
                  Current image: {formData.existingImage}
                </div>
              )}
              
              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  New image selected: {formData.image.name}
                </p>
              )}
              
              <p className="text-xs text-gray-500 mt-2">Max size: 5MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Saving...
              </>
            ) : storyToEdit ? 'Update Story' : 'Save Story'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}