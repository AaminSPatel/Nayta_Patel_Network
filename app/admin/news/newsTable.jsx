"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, EyeIcon } from "lucide-react"
import axios from "axios"
import { usePatel } from "../../../components/patelContext"
import NewsForm from "./newsForm"
//import NewsForm from "./NewsForm" // We'll create this component

export default function NewsTable() {
  const { formatDate, fetchNews, path, news } = usePatel()
  const [selectedNews, setSelectedNews] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  const handleEditClick = (newsItem) => {
    setSelectedNews(newsItem)
    setShowEditModal(true)
  }

  const handleStatusClick = (newsItem) => {
    setSelectedNews(newsItem)
    setNewStatus(newsItem.verificationStatus)
    setShowStatusModal(true)
  }

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.put(`${path}/api/news/${selectedNews._id}`, 
        { verificationStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setShowStatusModal(false)
      fetchNews()
    } catch (err) {
      console.error("Failed to update status:", err)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!confirm("Are you sure you want to delete this news?")) return
    try {
      await axios.delete(`${path}/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchNews()
    } catch (err) {
      console.error("Failed to delete news:", err)
    }
  }

  const handleUpdateSuccess = () => {
    setShowEditModal(false)
    fetchNews()
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
              <th>Publisher</th>
              <th>Date</th>
              <th>Views</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news?.map((newsItem) => (
              <tr key={newsItem._id}>
                <td className="font-medium max-w-32 overflow-hidden">{newsItem.title}</td>
                <td className="capitalize">{newsItem?.category}</td>
                <td>{newsItem?.publisher?.fullname || newsItem.publisher_name}</td>
                <td>{formatDate(newsItem.publish_date)}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm">
                      <EyeIcon size={14} className="text-gray-400" />
                      {newsItem.views}
                    </span>
                  </div>
                </td>
                <td>
                  <span 
                    className={`px-2 py-1 text-xs capitalize rounded-full ${
                      newsItem.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                      newsItem.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                    onClick={() => handleStatusClick(newsItem)}
                  >
                    {newsItem.verificationStatus}
                  </span>
                </td>
                <td>
                  <span className={`px-2 py-1 text-xs capitalize rounded-full`}>
                    {newsItem.location}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(newsItem)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(newsItem._id)}
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

      {/* Status Update Modal */}
      {showStatusModal && (
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
                onClick={() => setShowStatusModal(false)}
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

      {/* Edit News Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit News</h2>
            <NewsForm 
              newsData={selectedNews} 
              onSuccess={handleUpdateSuccess}
              onCancel={() => setShowEditModal(false)}
              isEditMode={true}
            />
          </div>
        </div>
      )}
    </>
  )
}