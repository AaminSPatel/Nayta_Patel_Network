"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Star } from "lucide-react"

export default function FeedbackForm({ onCancel }) {
  const [formData, setFormData] = useState({
    subject: "",
    type: "",
    message: "",
    rating: 0,
    status: "New",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Form submitted:", formData)
    onCancel()
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add New Feedback</h3>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter feedback subject"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select id="type" name="type" value={formData.type} onChange={handleChange} className="form-input" required>
              <option value="">Select a type</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Complaint">Complaint</option>
              <option value="Praise">Praise</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-input min-h-[150px]"
            placeholder="Write feedback message here..."
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={
                      star <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 hover:text-yellow-200"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="form-input">
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Feedback
          </button>
        </div>
      </form>
    </motion.div>
  )
}
