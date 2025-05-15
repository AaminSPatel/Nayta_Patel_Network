"use client"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye } from "lucide-react"

export default function RecentTable() {
  const entries = [
    { id: 1, title: "Summer Festival Announcement", type: "Event", date: "2023-06-15", status: "Published" },
    { id: 2, title: "New Membership Program", type: "Member", date: "2023-06-14", status: "Draft" },
    { id: 3, title: "Village Development Update", type: "Village", date: "2023-06-13", status: "Published" },
    { id: 4, title: "Price Changes for Services", type: "Price", date: "2023-06-12", status: "Published" },
    { id: 5, title: "Community Feedback Results", type: "Feedback", date: "2023-06-11", status: "Draft" },
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <table className="admin-table">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="font-medium text-gray-900">{entry.title}</td>
              <td>{entry.type}</td>
              <td>{entry.date}</td>
              <td>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(entry.status)}`}>{entry.status}</span>
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
