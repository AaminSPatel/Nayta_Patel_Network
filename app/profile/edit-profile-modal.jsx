"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiX } from "react-icons/fi"
import { usePatel } from "../../components/patelContext"

const EditProfileModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    village: "",
    image: null, // Changed to null for file handling
  })

  const [previewImage, setPreviewImage] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { path } = usePatel()

  useEffect(() => {
    if (userData) {
      setFormData({
        _id:userData._id,
        fullName: userData.fullName || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        village: userData.village || "",
        image: null, // Reset image file on open
      })
      setPreviewImage(userData.profilePic || "")
    }
  }, [userData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB')
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)

    setFormData(prev => ({ ...prev, image: file }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Authentication token not found')

      const formDataToSend = new FormData()
      formDataToSend.append('fullname', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('mobile', formData.mobile)
      formDataToSend.append('village', formData.village)
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await fetch(`${path}/api/users`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update profile')
      }

      const updatedUser = await response.json()
      onUpdate(updatedUser) // Call parent callback with updated data
      onClose() // Close modal on success
    } catch (err) {
      console.error('Update error:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Edit Profile</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Profile Image Preview and Upload */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img
                        src={previewImage || "/placeholder.svg"}
                        alt="Profile preview"
                        className="w-22 h-22 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">JPEG, PNG (Max 5MB)</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      pattern="[0-9]{10}"
                      title="10 digit mobile number"
                    />
                  </div>

                  {!showCustomInput&&<div>
                    <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                      Village
                    </label>
                    <select
                      id="village"
                      name="village"
                      value={formData.village}
                      onClick={()=>{setShowInput(true)}}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="" onClick={()=>{setShowCustomInput(true)}}>
                       {!showInput ?'Select your village' : 'Select to type here...'}
                        </option>
                      <option value="Green Valley">Green Valley</option>
                      <option value="Blue Ridge">Blue Ridge</option>
                      <option value="Sunny Hills">Sunny Hills</option>
                      <option value="Maple Woods">Maple Woods</option>
                    </select>
                  </div>}
                  {showCustomInput && (
        <div className="mt-2">
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder="Enter your village name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            autoFocus
          />
          <button onClick={()=>{setShowCustomInput(false); setShowInput(false)}} className="p-1 bg-emerald-400 rounded-md m-1 cursor-pointer">Select village</button>
        </div>
      )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center min-w-24"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EditProfileModal