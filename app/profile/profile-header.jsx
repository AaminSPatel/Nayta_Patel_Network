"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"

const ProfileHeader = ({ userData, onEditProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-700"></div>
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-4">
          <div className="relative">
            <img
              src={userData?.profilePic || "/placeholder.svg"}
              alt={userData.fullName}
              className="w-32 h-32 rounded-full border-4 border-white bg-white object-cover"
            />
            <button
              className="absolute bottom-2 right-2 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors"
              onClick={onEditProfile}
            >
              <FiEdit size={16} />
            </button>
          </div>
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl font-bold">{userData.fullName}</h1>
            <p className="text-gray-600 flex items-center justify-center gap-2 sm:flex-row flex-col">{userData.village} <br />{userData?.role === 'admin'? <Link href='/admin' className="px-2 text-white font-semibold p-1 bg-red-700 rounded-md my-1">Admin Panel</Link>:''}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 md:ml-auto">
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              onClick={onEditProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-start space-x-8 border-t border-gray-200 pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{userData?.posts?.length || 0}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userData.comments?.length || 0}</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userData.likes?.length || 0}</p>
            <p className="text-sm text-gray-500">Likes</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileHeader
