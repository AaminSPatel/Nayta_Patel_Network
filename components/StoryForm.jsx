"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { usePatel } from "./patelContext"

export default function StoryForm({ onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    title:'',
    content: "",
    status: "Draft",
    image: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const {path} = usePatel()
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
  const token = localStorage.getItem('token');
  
  try {
    const story = new FormData()

      story.append('content', formData.content)
      story.append('category', formData.category)
      story.append('status', formData.status)
      story.append('location', formData.location)
      story.append('title', formData.title)
      story.append('image', formData.image)    
    console.log('story',story);
      
      const response = await fetch(path+'/api/stories', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: story
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create story')
      } 

       await response.json()
      router.refresh() // Refresh the page to show new story
      onCancel() // Close the form
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
        <h3 className="text-xl font-semibold">Add New Story</h3>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title 
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full   border px-4 py-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Write your story title here..."
            required
          />
        </div><div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location 
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full   border px-4 py-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Write your story title here..."
            
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
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px]"
            placeholder="Write your story content here..."
            required
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
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          <div className="border border-dashed border-gray-300 rounded-lg px-4 py-2">
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
              />
              <button
                type="button"
                onClick={() => document.getElementById("image").click()}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Select Image
              </button>
              {formData.image && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {formData.image.name}
                </p>
              )}
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
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Story'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}