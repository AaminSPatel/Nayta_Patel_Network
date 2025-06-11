"use client"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, MessageCircle, Star } from "lucide-react"
import { usePatel } from "./patelContext"

export default function FeedbackTable() {
  const {feedbacks} = usePatel()
 /*  const feedbacks = [
    {
      id: 1,
      subject: "Website Navigation Improvement",
      type: "Suggestion",
      user: "John Doe",
      date: "2023-06-15",
      rating: 4,
      status: "New",
    },
    {
      id: 2,
      title: "Login Page Error",
      type: "Bug Report",
      user: "Jane Smith",
      date: "2023-06-14",
      rating: 2,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Great Customer Service",
      type: "Praise",
      user: "Mike Johnson",
      date: "2023-06-13",
      rating: 5,
      status: "Resolved",
    },
    {
      id: 4,
      title: "Billing Issue",
      type: "Complaint",
      user: "Sarah Williams",
      date: "2023-06-12",
      rating: 1,
      status: "In Progress",
    },
    {
      id: 5,
      title: "Feature Request: Dark Mode",
      type: "Suggestion",
      user: "Robert Brown",
      date: "2023-06-11",
      rating: 4,
      status: "New",
    },
  ]
 */
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

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} size={14} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
      ))
  }

  return (
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
            <th scope="col">Type</th>
            <th scope="col">User</th>
            <th scope="col">Date</th>
            <th scope="col">Rating</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {feedbacks.map((feedback) => (
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
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeClass(feedback.type)}`}>{feedback.type}</span>
              </td>
              <td>{feedback.name}</td>
              <td>{feedback.date}</td>
              <td>
                <div className="flex items-center gap-1">{feedback.mobile}</div>
              </td>
              <td>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(feedback.status)}`}>
                  {feedback.status}
                </span>
              </td>
              <td>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
