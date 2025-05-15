"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiBell, FiLock, FiEye, FiToggleLeft, FiToggleRight } from "react-icons/fi"

const SettingsSection = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newPosts: true,
    newComments: true,
    mentions: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showVillage: true,
  })

  const toggleSetting = (section, setting) => {
    if (section === "notifications") {
      setNotifications((prev) => ({
        ...prev,
        [setting]: !prev[setting],
      }))
    } else if (section === "privacy") {
      setPrivacy((prev) => ({
        ...prev,
        [setting]: !prev[setting],
      }))
    }
  }

  const handleProfileVisibilityChange = (e) => {
    setPrivacy((prev) => ({
      ...prev,
      profileVisibility: e.target.value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiBell className="mr-2 text-emerald-500" /> Notification Settings
        </h3>
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <button
              onClick={() => toggleSetting("notifications", "emailNotifications")}
              className="text-2xl text-emerald-600"
            >
              {notifications.emailNotifications ? <FiToggleRight /> : <FiToggleLeft />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive notifications via SMS</p>
            </div>
            <button
              onClick={() => toggleSetting("notifications", "smsNotifications")}
              className="text-2xl text-emerald-600"
            >
              {notifications.smsNotifications ? <FiToggleRight /> : <FiToggleLeft />}
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-3">Notify me about:</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p>New posts in my village</p>
                <button
                  onClick={() => toggleSetting("notifications", "newPosts")}
                  className="text-2xl text-emerald-600"
                >
                  {notifications.newPosts ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p>Comments on my posts</p>
                <button
                  onClick={() => toggleSetting("notifications", "newComments")}
                  className="text-2xl text-emerald-600"
                >
                  {notifications.newComments ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p>Mentions and tags</p>
                <button
                  onClick={() => toggleSetting("notifications", "mentions")}
                  className="text-2xl text-emerald-600"
                >
                  {notifications.mentions ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiEye className="mr-2 text-emerald-500" /> Privacy Settings
        </h3>
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
          <div>
            <h4 className="font-medium mb-2">Profile Visibility</h4>
            <select
              value={privacy.profileVisibility}
              onChange={handleProfileVisibilityChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="public">Public - Anyone can view</option>
              <option value="village">Village Only - Only people from your village</option>
              <option value="private">Private - Only you</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-3">Information Visibility:</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p>Show email to others</p>
                <button onClick={() => toggleSetting("privacy", "showEmail")} className="text-2xl text-emerald-600">
                  {privacy.showEmail ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p>Show phone number to others</p>
                <button onClick={() => toggleSetting("privacy", "showPhone")} className="text-2xl text-emerald-600">
                  {privacy.showPhone ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p>Show village information</p>
                <button onClick={() => toggleSetting("privacy", "showVillage")} className="text-2xl text-emerald-600">
                  {privacy.showVillage ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiLock className="mr-2 text-emerald-500" /> Security Settings
        </h3>
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
          <div>
            <h4 className="font-medium mb-2">Change Password</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-3">Account Actions</h4>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Download My Data
              </button>
              <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsSection
