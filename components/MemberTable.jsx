"use client"

import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Mail, Phone, MessageSquare, Heart, Bookmark, Filter, LayoutGrid, List } from "lucide-react"
import { usePatel } from "./patelContext"
import { GiCheckMark, GiCrossMark, GiPostStamp, GiSave } from "react-icons/gi"
import { useEffect, useState } from "react"
import { FaCross, FaTimes } from "react-icons/fa"

export default function MemberTable(prop) {
  const {  formatDate, path, setUsers } = usePatel()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const [filterUsers, setFilterUsers] = useState([...prop.users])
  const [view, setView] = useState(prop.view) // or "grid"

  useEffect(()=>{
   setFilterUsers(prop.users)
   setView(prop.view)
  },[prop])
  const getStatusClass = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "defaulter":
        return "bg-red-100 text-red-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "unknown":
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "ambassador":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const openEditModal = (member) => {
    setCurrentMember(member)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setCurrentMember(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentMember(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${path}/api/users/admin-update/${currentMember._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          role: currentMember.role,
          status: currentMember.status,
          achievement: currentMember.achievement
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      const updatedUsers = await response.json()
      
      closeEditModal()
      // Update the users list in state
      setUsers(updatedUsers)

    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

 /*  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullname.toLowerCase().includes(search.toLowerCase())
    const matchesVillage = filterVillage ? user.village === filterVillage : true
    const matchesRole = filterRole ? user.role === filterRole : true
    return matchesSearch && matchesVillage && matchesRole
  }) */

  return (
    <div className="relative">
      <motion.div
        className="table-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
       {view === "table" ?  (<table className="admin-table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col">Member</th>
              <th scope="col">Contact</th>
              <th scope="col">Role</th>
              <th scope="col">Join Date</th>
              <th scope="col">Village</th>
              <th scope="col">Engagements</th>
              <th scope="col">Posts</th>
              <th scope="col">Will Ambassador</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterUsers.map((member) => (
              <tr key={member._id}>
                <td className="flex items-center gap-2">
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
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleClass(member.role)}`}>
                    {member.role}
                  </span>
                </td>
                <td>{formatDate(member.createdAt)}</td>
                <td>{member.village}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm">
                      <MessageSquare size={14} className="text-gray-400" />
                      {member.comments?.length || 0}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <Heart size={14} className="text-red-400" />
                      {member.likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <Bookmark size={14} className="text-green-400" />
                      {member.savedItems?.length || 0}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="flex items-center gap-1 text-sm">
                    <GiPostStamp size={14} className="text-green-400" />
                    {member.posts?.length || 0}
                  </span>
                </td> 
                <td>
                  <span className={`flex items-center gap-1 text-sm ${member.ambassadorWill ? 'text-emerald-500' : 'text-red-500'}`}>
                    {member.ambassadorWill ? <GiCheckMark /> : <FaTimes />}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Eye size={16} />
                    </button>
                    <button 
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(member)}
                    >
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
        </table>) : (
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filterUsers.map(member => (
            <div key={member._id} className="p-4 bg-white rounded shadow space-y-2">
              <div className="flex items-center gap-3">
                <img src={member?.profilepic?.url || "/placeholder.svg"} className="h-10 w-10 rounded-full" />
                <div>
                  <div className="font-medium">{member.fullname}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </div>
              <div className="text-sm">Village: {member.village}</div>
              <div className="text-sm">Role: {member.role}</div>
              <div className="text-sm flex gap-3">Ambassador Will:
                 <span className={`flex items-center gap-1 text-sm ${member.ambassadorWill ? 'text-emerald-500' : 'text-red-500'}`}>
                    {member.ambassadorWill ? <GiCheckMark /> : <FaTimes />}
                  </span>
              </div>
              <div className="text-sm flex gap-3"> Status:
                 <span className={`flex capitalize items-center gap-1 text-sm ${member.status ==='verified' ? 'text-emerald-500' : member.status ==='defaulter' ?'text-red-500': member.status ==='unknown' ?'text-blue-500':  'text-orange-400'}`}>
                    {member.status}
                  </span>
              </div>
              <div className="text-sm">Posts: {member.posts?.length || 0}</div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => openEditModal(member)} className="text-blue-500"><Edit size={16} /></button>
                <button className="text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
       
 </motion.div>
      {/* Edit Modal */}
      {isEditModalOpen && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Member Details</h3>
                <button 
                  onClick={closeEditModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                 <FaTimes/>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={currentMember.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="ambassador">Ambassador</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={currentMember.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="unverified">Unverified</option>
                      <option value="unknown">Unknown</option>
                      <option value="verified">Verified</option>
                      <option value="defaulter">Defaulter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Achievement
                    </label>
                    <input
                      type="text"
                      name="achievement"
                      value={currentMember.achievement || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter achievement"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}