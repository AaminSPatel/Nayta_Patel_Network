"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { FiEdit, FiUser, FiMessageSquare, FiHeart, FiMapPin } from "react-icons/fi"
import { GiWheat, GiCorn, GiFlowers } from "react-icons/gi"
import { usePatel } from "../../components/patelContext"
import { FaNewspaper } from "react-icons/fa"

const ProfileHeader = ({ userData, onEditProfile }) => {
  // Decorative animated elements variants
  const decorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    })
  }
const {users , villages, news, posts} = usePatel()
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Decorative background with animated elements */}
      <div className="relative h-40 bg-gradient-to-r from-emerald-500 to-emerald-700 overflow-hidden">
        {/* Animated decorative icons */}
        <motion.div
          custom={0}
          variants={decorVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-4 left-4 text-white/20"
        >
          <GiWheat size={48} />
        </motion.div>
        <motion.div
          custom={1}
          variants={decorVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-4 right-4 text-white/20"
        >
          <GiCorn size={48} />
        </motion.div>
        <motion.div
          custom={2}
          variants={decorVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/10"
        >
          <GiFlowers size={72} />
        </motion.div>
      </div>

      <div className="px-6 pb-6 relative">
        {/* Profile section */}
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-4 gap-4">
          {/* Profile picture with edit button */}
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={userData?.profilePic || "/placeholder.svg"}
                alt={userData.fullName}
                className="w-32 h-32 rounded-full border-4 border-white bg-white object-cover shadow-md"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-2 right-2 bg-emerald-600 text-white p-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
                onClick={onEditProfile}
              >
                <FiEdit size={16} />
              </motion.button>
            </motion.div>
          </div>

          {/* Name and village */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              className="text-2xl font-bold text-gray-800"
              whileHover={{ x: 2 }}
            >
              {userData.fullName}
            </motion.h1>
            <p className="text-gray-600 mt-1">{userData.village}</p>
            
            {/* Admin panel button - only shown for admins */}
            {(userData?.role === 'admin' || userData.role === 'semi-admin') && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 inline-block"
              >
                <Link 
                  href='/admin' 
                  className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-1 text-sm"
                >
                  <FiUser size={14} />
                  Admin Panel
                </Link>
              </motion.div>
            )}
          </div>

          {/* Edit profile button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 md:mt-0"
          >
            <button
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              onClick={onEditProfile}
            >
              <FiEdit size={16} />
              Edit Profile
            </button>
          </motion.div>
        </div>

        {/* Stats section */}
        {userData.role === 'admin' ?<div className="flex justify-center md:justify-start sm:gap-6 gap-1 border-t border-gray-100 pt-4 mt-4">
         <Link href={'/admin/members'} >  <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FiUser className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{users?.length || 0}</p>
              <p className="text-xs text-gray-500">Users</p>
            </div>
          </motion.div></Link>
          
          <Link href={'/admin/villages'} >

          <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FiMapPin className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{villages?.length || 0}</p>
              <p className="text-xs text-gray-500">Villages</p>
            </div>
          </motion.div></Link>
          
          <Link href={'/admin/news'} >

          <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FaNewspaper className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{news?.length || 0}</p>
              <p className="text-xs text-gray-500">News</p>
            </div>
          </motion.div></Link>
          
          <Link href={'/admin/posts'} >
          <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FiMessageSquare className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{posts?.length || 0}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
          </motion.div></Link>
        </div>
        :
         <div className="flex justify-center md:justify-start gap-6 border-t border-gray-100 pt-4 mt-4">
          <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FiUser className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{userData?.posts || 0}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FiMessageSquare className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{userData?.comments || 0}</p>
              <p className="text-xs text-gray-500">Comments</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="text-center flex-1 max-w-[100px]"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <FiHeart className="mx-auto text-emerald-600 mb-1" size={20} />
              <p className="text-xl font-bold text-gray-800">{userData?.likes?.length || 0}</p>
              <p className="text-xs text-gray-500">Likes</p>
            </div>
          </motion.div>
        </div>}
      </div>
    </motion.div>
  )
}

export default ProfileHeader