"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, Tag, Plus, XCircle } from "lucide-react"
import { usePatel } from "./patelContext"

export default function PostForm({ onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    content: "",
    tags: []
  })
  const [tagInput, setTagInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
 const {path} = usePatel()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTagInput = (e) => {
    setTagInput(e.target.value)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(path + '/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(formData)
      })

      /* if (!response.) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create post')
      } */
      const result = await response.json()
      onSuccess(result)
      onCancel()
    } catch (err) {
      console.error('Submission error:', err)
      setError(err.message || 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-3xl mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Create New Post</h3>
        <button 
          onClick={onCancel} 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
          <XCircle className="mr-2" size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[200px]"
            placeholder="Write your post content here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData?.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-emerald-800 text-sm"
              >
                {tag}
                <button 
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-emerald-600 hover:text-emerald-800"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInput}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              placeholder="Add tags (press Enter)"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-700 transition flex items-center"
              aria-label="Add tag"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        

        <div className="flex justify-end gap-3 pt-6 ">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition flex items-center disabled:bg-emerald-400"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Post'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}