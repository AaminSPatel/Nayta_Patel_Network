"use client"

import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Mail, Phone, MessageSquare, Heart, Bookmark, Filter, LayoutGrid, List } from "lucide-react"
import { usePatel } from "./patelContext"
import { GiCheckMark, GiCrossMark, GiPostStamp, GiSave } from "react-icons/gi"
import { useEffect, useState,useRef } from "react"
import { FaBell, FaCross, FaTimes } from "react-icons/fa"
import { ArrowDown, ArrowUp } from "lucide-react"; // use any icon library you like

export default function MemberTable(prop) {
  const {  formatDate, path, setUsers , villages} = usePatel()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const allVillages = villages.map(item => item.name)

  const [filterUsers, setFilterUsers] = useState([...prop.users])
  const [view, setView] = useState(prop.view) // or "grid"

const topRef = useRef(null);
const bottomRef = useRef(null);

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
      case "semi-admin":
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

  const openNotificationModal = (member) => {
    setCurrentMember(member)
    setIsNotificationModalOpen(true)
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
          village: currentMember.village,
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
       {view === "table" ?  (<table className="admin-table" ref={topRef}>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col">Member</th>
              <th scope="col">Contact</th>
              <th scope="col">Role</th>
              <th scope="col">Date / Not.</th>
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
                  <div className="flex flex-col items-center gap-1">

                  <span className="font-medium text-gray-900">{member.fullname}</span>
                  <div><CopyableUserId id={member._id} />
</div>
                  </div>
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
                <td className="flex  items-center justify-center">
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
                    <button
                    onClick={()=>openNotificationModal(member)}
                    className="p-1 text-gray-500 hover:text-gray-700">
                      <FaBell size={16} />
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
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"    ref={topRef}>
          {filterUsers.map(member => (
            <div key={member._id} className="p-4 relative bg-white rounded shadow space-y-2">
              <div className="flex items-center gap-3">
                <img src={member?.profilepic?.url || "/placeholder.svg"} className="h-10 w-10 rounded-full" />
                <div>
                  <div className="font-medium">{member.fullname}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </div>
              <div className="flex gap-1 items-center">UserId:<CopyableUserId id={member._id} />
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
              
              <div className="text-sm">Mobile: {member.mobile}</div>
              <div className="flex gap-2 justify-end">
                {/* <div className="flex">
                  Posts 
                </div> */}
                <div className="flex gap-2">
<button
                    onClick={()=>openNotificationModal(member)}
                    className=" text-gray-500 hover:text-gray-700">
                      <FaBell size={16} />
                    </button>
                <button onClick={() => openEditModal(member)} className="text-blue-500"><Edit size={16} /></button>
                <button className="text-red-500"><Trash2 size={16} /></button>
              
                </div>
                 </div>
            </div>
          ))}
        </motion.div>
      )}
       {/* Scroll buttons */}
<div className="fixed left-3 sm:left-55 bottom-10 flex flex-col gap-3 z-50">
  <button
    onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
    className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
    title="Go to Top"
  >
    <ArrowUp className="w-5 h-5 text-gray-700" />
  </button>
  <button
    onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
    className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
    title="Go to Bottom"
  >
    <ArrowDown className="w-5 h-5 text-gray-700" />
  </button>
</div>
 </motion.div>
      {/* Notification Edit modal */}
{isNotificationModalOpen && currentMember && (
  <AdminNotificationForm
    id={currentMember._id}
    onCancel={() => setIsNotificationModalOpen(false)} 
  />
)}
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
                      <option value="semi-admin">Sub Admin</option>
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
                      Village
                    </label>
                    <select
                      name="village"
                      value={currentMember.village}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
<option value="unknown">Unknown</option>
                      {
                        allVillages.map((village)=>(
                                           <option value={village}>{village}</option>
   ))
                      }
                      
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
      <div ref={bottomRef}></div>
    </div>
  )
}
function CopyableUserId({ id }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className="text-sm cursor-pointer text-blue-900 hover:underline"
      onClick={handleCopy}
      title="Click to copy"
    >
      {id}
      {copied && <span className="text-green-500 ml-2">Copied!</span>}
    </div>
  );
}


function AdminNotificationForm({ id, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'account',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { path } = usePatel()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${path}/api/users/notification/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      alert('Notification sent successfully!')
      setFormData({
        type: 'account',
        message: '',
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
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Notification</h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notification Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
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
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Notification'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}