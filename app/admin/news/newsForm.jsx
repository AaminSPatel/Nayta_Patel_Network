'use client'
import { useState, useEffect } from "react"
import { usePatel } from "../../../components/patelContext"
import { motion } from "framer-motion"

export default function NewsForm({ 
  onSubmit, 
  onCancel, 
  onSuccess, 
  newsData, 
  isEditMode = false 
}) {
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const { path, user } = usePatel()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
    publisher_name: user?.fullname || "",
    verificationStatus: "pending"
  })

  useEffect(() => {
    console.log('newsData');
    
    if (newsData) {
      setFormData({
        title: newsData.title || "",
        content: newsData.content || "",
        category: newsData.category || "",
        location: newsData.location || "",
        publisher_name: newsData.publisher_name || user?.fullname || "",
        verificationStatus: newsData.verificationStatus || "pending"
      })
      
      if (newsData?.image?.url) {
        setPreviewImage(newsData.image.url)
      }
    }
  }, [newsData, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.location || !formData.category) {
      alert("Please fill all required fields")
      return
    }

    setIsUploading(true)

    try {
      const token = localStorage.getItem('token')
      const submitFormData = new FormData()
      
      // Append all form fields
      submitFormData.append("title", formData.title)
      submitFormData.append("content", formData.content)
      submitFormData.append("location", formData.location)
      submitFormData.append("publisher_name", formData.publisher_name)
      submitFormData.append("category", formData.category)
      submitFormData.append("verificationStatus", formData.verificationStatus)
      
      // Append image if exists
      if (imageFile) {
        submitFormData.append("image", imageFile)
      }

      const url = isEditMode 
        ? `${path}/api/news/${newsData._id}`
        : `${path}/api/news`

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitFormData,
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit news")
      }

      // Call callbacks
      if (onSubmit) await onSubmit(data)
      if (onSuccess) await onSuccess(data)
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        setFormData({
          title: "",
          content: "",
          category: "",
          location: "",
          publisher_name: user?.fullname || "",
          verificationStatus: "pending"
        })
        setImageFile(null)
        setPreviewImage(null)
      }

    } catch (error) {
      console.error("Error submitting news:", error)
      alert(error.message || "Error submitting news")
    } finally {
      setIsUploading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const categories = [
    { value: "Accident", label: "दुर्घटना" },
    { value: "Farming", label: "कृषि" },
    { value: "Weather", label: "मौसम" },
    { value: "Good", label: "अच्छी खबर" },
    { value: "Bad", label: "बुरी खबर" },
    { value: "Samaj", label: "समाज" },
    { value: "Technology", label: "तकनीक" },
    { value: "Market", label: "बाजार" },
    { value: "Education", label: "शिक्षा" },
    { value: "Health", label: "स्वास्थ्य" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          News Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter news title..."
        />
      </div>

      {/* Content Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          News Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter news content..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="City, State"
          />
        </div>

        {/* Publisher Name Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Publisher Name *
          </label>
          <input
            type="text"
            name="publisher_name"
            value={formData.publisher_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Your name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Field (visible only in edit mode) */}
        {isEditMode && (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Status
            </label>
            <select
              name="verificationStatus"
              value={formData.verificationStatus}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
      </div>

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          News Image
        </label>
        <div className="flex flex-col space-y-4">
          {previewImage && (
            <div className="w-full max-w-xs">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="rounded-lg border border-gray-200"
              />
              <p className="text-sm text-gray-500 mt-1">Current Image</p>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
              <span className="text-sm font-medium">
                {imageFile ? imageFile.name : "Choose image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {(imageFile || previewImage) && (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null)
                  setPreviewImage(null)
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <motion.button
          type="submit"
          disabled={isUploading}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-colors ${
            isUploading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          whileHover={{ scale: isUploading ? 1 : 1.02 }}
          whileTap={{ scale: isUploading ? 1 : 0.98 }}
        >
          {isUploading 
            ? (isEditMode ? "Updating..." : "Publishing...") 
            : (isEditMode ? "Update News" : "Publish News")}
        </motion.button>

        <motion.button
          type="button"
          onClick={onCancel}
          disabled={isUploading}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
      </div>
    </form>
  )
}