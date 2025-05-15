"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, MessageSquare, Heart } from "lucide-react"
import { usePatel } from "./patelContext"
import axios from "axios"

export default function PostTable() {
  const { posts, formatDate, fetchPosts,path } = usePatel()
  const [selectedPost, setSelectedPost] = useState(null)
  const [newStatus, setNewStatus] = useState("")
  const [showModal, setShowModal] = useState(false)

  const getStatusClass = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-orange-400 text-gray-100"
    }
  }

  const handleEditClick = (post) => {
    setSelectedPost(post)
    setNewStatus(post.verificationStatus)
    setShowModal(true)
  }

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(path +`/api/posts/${selectedPost._id}`, {
        verificationStatus: newStatus,
        
      },{Authorization: `Bearer ${token}`})
      setShowModal(false)
      fetchPosts()
    } catch (err) {
      console.error("Failed to update post:", err)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      await axios.delete(path+ `/api/posts/${id}`,
        {
          Authorization: `Bearer ${token}`
        }
      )
      fetchPosts()
    } catch (err) {
      console.error("Failed to delete post:", err)
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
        <table className="admin-table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Engagement</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts?.map((post) => (
              <tr key={post._id}>
                <td className="font-medium max-w-32 overflow-hidden">{post.content}</td>
                <td className="capitalize">{post?.tags[0]}</td>
                <td>{post.user.fullname}</td>
                <td>{formatDate(post.dateOfCreation)}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm">
                      <MessageSquare size={14} className="text-gray-400" />
                      {post.comments.length}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <Heart size={14} className="text-red-400" />
                      {post.likes.length}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`px-2 py-1 text-xs capitalize rounded-full ${getStatusClass(post.verificationStatus)}`}>
                    {post.verificationStatus}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(post)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(post._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Update Status Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Status</h2>
            <select
              className="w-full border p-2 rounded mb-4"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
