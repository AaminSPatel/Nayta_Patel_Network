"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, Mail, Phone, User } from "lucide-react"

export default function MemberForm({ onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Member",
    status: "Active",
    password: "",
    confirmPassword: "",
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    // In a real app, you would handle file upload here
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
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
        <h3 className="text-xl font-semibold">Add New Member</h3>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Enter full name"
                required
              />
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Enter email address"
                required
              />
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Enter phone number"
              />
              <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="form-input">
              <option value="Member">Member</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="form-input">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="form-label">
              Profile Image
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload size={24} className="text-gray-400" />
                <p className="text-sm text-gray-500">Drag & drop an image or click to browse</p>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("image").click()}
                  className="btn btn-outline text-sm py-1"
                >
                  Select Image
                </button>
                {formData.image && <p className="text-sm text-green-600">{formData.image.name}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Member
          </button>
        </div>
      </form>
    </motion.div>
  )
}
