"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload } from "lucide-react"
import { usePatel } from "./patelContext"

export default function BlogForm({ onCancel, currentUser }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    newTag: "",
    image: null,
  })

   const {path,user} = usePatel()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
  }

  const handleTagAdd = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ""
      }))
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('author', user._id);
      formDataToSend.append('tags', formData.tags.join(',')); // <- Fix here
  
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
  
      const response = await fetch(path + '/api/blogs/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type manually for FormData
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }
  
      const result = await response.json();
      console.log('Blog created successfully:', result);
      onCancel();
  
    } catch (error) {
      console.error('Error submitting blog post:', error);
      // Optional: show error to user
    }
  };
  
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add New Blog Post</h3>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-input min-h-[200px]"
            placeholder="Write your blog content here..."
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              id="newTag"
              name="newTag"
              value={formData.newTag}
              onChange={handleChange}
              className="form-input flex-1"
              placeholder="Add a tag"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="btn btn-outline"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                {tag}
                <button 
                  type="button" 
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="image" className="form-label">
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
              />
              <button
                type="button"
                onClick={() => document.getElementById("image").click()}
                className="btn btn-outline text-sm py-1"
              >
                Select Image
              </button>
              {formData.image && <p className="text-sm text-green-600">{formData.image.name}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Blog Post
          </button>
        </div>
      </form>
    </motion.div>
  )
}