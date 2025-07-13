"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Trash2, Eye, MessageCircle, X, User, Calendar, Phone, Mail, Bell, Send } from "lucide-react"
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa"
import { usePatel } from "./patelContext"
import Link from "next/link"

// AdminNotificationForm Component
function AdminNotificationForm({ id, onCancel }) {
  const [formData, setFormData] = useState({
    type: "account",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { path ,formatDate} = usePatel()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${path}/api/users/notification/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(await response.text())
      }
      alert("Notification sent successfully!")
      setFormData({
        type: "account",
        message: "",
      })
      onCancel() // Close the modal after successful submission
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        {/* Close Button */}
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
          <FaTimes size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Notification</h2>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="system">System</option>
                <option value="account">Account</option>
                <option value="order">Order</option>
                <option value="promotion">Promotion</option>
                <option value="social">Social</option>
                <option value="alert">Alert</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                rows="4"
                maxLength="500"
                placeholder="Enter your notification message..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Notification"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FeedbackTable() {
  const { feedbacks, users ,formatDate} = usePatel()
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback)
    setIsModalOpen(true)
  }

  const closeFeedbackModal = () => {
    setSelectedFeedback(null)
    setIsModalOpen(false)
  }

  const openNotificationModal = (userId) => {
    setSelectedUserId(userId)
    setIsNotificationModalOpen(true)
  }

  const closeNotificationModal = () => {
    setSelectedUserId(null)
    setIsNotificationModalOpen(false)
  }

  // Function to find user by email
  const findUserByEmail = (email) => {
    if (!email || !users) return null
    return users.find((user) => user.email && user.email.toLowerCase() === email.toLowerCase())
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeClass = (type) => {
    switch (type) {
      case "Suggestion":
        return "bg-purple-100 text-purple-800"
      case "Bug Report":
        return "bg-red-100 text-red-800"
      case "Complaint":
        return "bg-orange-100 text-orange-800"
      case "Praise":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <motion.div
        className="table-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className="admin-table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col">Subject</th>
              
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => {
              const foundUser = findUserByEmail(feedback.email)
              return (
                <tr key={feedback._id}>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="flex items-start gap-2">
                      <MessageCircle size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-900 whitespace-pre-wrap break-words line-clamp-3 hover:line-clamp-none transition-all">
                          {feedback.message || feedback.title}
                        </p>
                      </div>
                    </div>
                  </td>
                 
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{feedback.name}</span>
                      {foundUser && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" title="User found in database" />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{feedback.email || "N/A"}</span>
                    </div>
                  </td>
                  <td>{formatDate(feedback.date)}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(feedback.status)}`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => openFeedbackModal(feedback)}
                        title="View feedback details"
                      >
                        <Eye size={16} />
                      </button>
                      {foundUser && (
                        <button
                          className="p-1 text-emerald-500 hover:text-emerald-700 transition-colors"
                          onClick={() => openNotificationModal(foundUser._id)}
                          title="Send notification to user"
                        >
                          <Bell size={16} />
                        </button>
                      )}
                      <button className="p-1 text-blue-500 hover:text-blue-700 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Feedback Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedFeedback && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFeedbackModal}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
               {/*  <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${getTypeClass(selectedFeedback.type).replace("text-", "text-").replace("bg-", "bg-")}`}
                  >
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Feedback Details</h2>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeClass(selectedFeedback.type)}`}>
                      {selectedFeedback.type}
                    </span>
                  </div>
                </div> */}
                <button
                  onClick={closeFeedbackModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <User size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedFeedback.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Mobile</p>
                      <p className="font-medium text-gray-900">{selectedFeedback.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedFeedback.date)}</p>
                    </div>
                  </div>

                  {selectedFeedback.email && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail size={18} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{selectedFeedback.email}</p>
                        {findUserByEmail(selectedFeedback.email) && (
                          <p className="text-xs text-green-600 mt-1">✓ User found in database <Link href={`/profile/${findUserByEmail(selectedFeedback.email)?._id}`} > <span className="text-red-400 text-xl"><FaExternalLinkAlt /></span></Link> </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusClass(selectedFeedback.status)}`}>
                    {selectedFeedback.status}
                  </span>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">Message</p>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-emerald-500">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                      {selectedFeedback.message || selectedFeedback.title || "No message provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div>
                  {findUserByEmail(selectedFeedback.email) && (
                    <button
                      onClick={() => {
                        const user = findUserByEmail(selectedFeedback.email)
                        openNotificationModal(user._id)
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                    >
                      <Send size={16} />
                      Send Notification
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeFeedbackModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <Edit size={16} />
                    Edit Feedback
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Modal */}
      <AnimatePresence>
        {isNotificationModalOpen && selectedUserId && (
          <AdminNotificationForm id={selectedUserId} onCancel={closeNotificationModal} />
        )}
      </AnimatePresence>
    </>
  )
}
