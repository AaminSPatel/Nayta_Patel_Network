"use client"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Mail, Phone, MessageSquare, Heart, Save, Bookmark } from "lucide-react"
import { usePatel } from "./patelContext"
import { GiPostStamp, GiSave } from "react-icons/gi"

export default function MemberTable() {
  /* const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      role: "Admin",
      joinDate: "2023-01-15",
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      role: "Moderator",
      joinDate: "2023-02-20",
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 456-7890",
      role: "Member",
      joinDate: "2023-03-10",
      status: "Inactive",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 (555) 789-0123",
      role: "Member",
      joinDate: "2023-04-05",
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      phone: "+1 (555) 234-5678",
      role: "Moderator",
      joinDate: "2023-05-12",
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
  ] */

  const {users,formatDate} = usePatel()
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleClass = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800"
      case "Moderator":
        return "bg-blue-100 text-blue-800"
      case "Member":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <th scope="col">Member</th>
            <th scope="col">Contact</th>
            <th scope="col">Role</th>
            <th scope="col">Join Date</th>
            <th scope="col">Engagements</th>
            <th scope="col">Posts</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((member) => (
            <tr key={member._id}>
              <td className="flex items-center gap-3">
                <img
                  src={member?.profilepic?.url || "/placeholder.svg"}
                  alt={member?.fullname}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900">{member.fullname}</span>
              </td>
              <td>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1">
                    <Mail size={14} className="text-gray-400" />
                    {member.email}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Phone size={14} className="text-gray-400" />
                    {member.mobile}
                  </span>
                </div>
              </td>
              <td>
                <span className={`px-2 py-1 text-xs rounded-full ${getRoleClass(member.role)}`}>{member.role}</span>
              </td>
              <td>{formatDate(member.createdAt)}</td>
              <td>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-sm">
                    <MessageSquare size={14} className="text-gray-400" />
                    {member.comments.length}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Heart size={14} className="text-red-400" />
                    {member.likes.length}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Bookmark size={14} className="text-green-400" />
                    {member.savedItems.length}
                  </span>
                  
                </div>
              </td>
              <td>
              <span className="flex items-center gap-1 text-sm">
                    <GiPostStamp size={14} className="text-green-400" />
                    {member.savedItems.length}
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
