"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiBell, FiLock, FiEye, FiToggleLeft, FiToggleRight } from "react-icons/fi"
import { usePatel } from "../../components/patelContext"

const SettingsSection = (privacyStatus) => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newPosts: true,
    newComments: true,
    mentions: true,
  })

  const [privacy, setPrivacy] = useState(privacyStatus.privacyStatus)

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
  useEffect(()=>{
    console.log('visibilityStatus',privacy);
    
  },[privacy])
const {path} = usePatel()
  const handleProfileVisibilityChange = (e) => {
    setPrivacy((prev) => ({
      ...prev,
      profileVisibility: e.target.value,
    }))
  }
  const handleProfileVisibilityUpdate = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${path}/api/users/updateVisibility`, {
      method: "PUT", // Changed to match backend
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ visibilityStatus: privacy }), // Make sure 'privacy' is defined
    });

    const data = await response.json(); // Parse response

    if (!response.ok) {
      throw new Error(data.message || "Failed to update visibility");
    }

    console.log("Visibility updated successfully:", data);
    // Optionally update local state or show success message
  } catch (err) {
    console.error("Error updating visibility:", err.message);
    // Show error to user (e.g., using toast or alert)
  }
};
const {logOut}= usePatel()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiEye className="mr-2 text-emerald-500" /> Privacy Settings
        </h3>
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
          <div>
            <h4 className="font-medium mb-2">Profile Visibility</h4>
            <select
              value={privacy}
              onChange={(e)=>{setPrivacy(e.target.value)}}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={false}>Private - Only you</option>
{/*               <option value="village">Village Only - Only people from your village</option>
 */}              <option value={true}>Public - Anyone can view</option>
            </select>
          </div>
          <button onClick={handleProfileVisibilityUpdate} className="px-4 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">Save</button>
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
              <button onClick={logOut} className="cursor-pointer w-full px-4 py-2 border border-orange-300 text-orange-500 rounded-md hover:bg-gray-50 transition-colors">
               Log Out
              </button>
              {/* <button className="cursor-pointer w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Download My Data
              </button>
              <button className="cursor-pointer w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                Deactivate Account
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsSection
