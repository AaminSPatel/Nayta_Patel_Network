"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiSettings, FiEdit2, FiUser, FiMapPin, FiMail, FiPhone, FiMessageSquare, FiFileText } from "react-icons/fi"
import { FaRegThumbsUp } from "react-icons/fa"
import ProfileHeader from "./profile-header"
import ActivitySection from "./activity-section.jsx"
import SettingsSection from "./settings-section"
import VillageDetails from "./village-details"
import { usePatel } from "../../components/patelContext"
import EditProfileModal from "./edit-profile-modal"
import Head from "next/head";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
const {user,siteUrl} = usePatel()
const [userData,setUserData] = useState({
    _id:'',
    fullName: "John Doe",
    email: "",
    role: "",
    mobile: "",
    village: "",
    profilePic: "",
    posts: 0,
    comments: 0,
    likes: 0,})

useEffect(()=>{
    if(user){
        setUserData({
    _id  : user._id   ,
    fullName  : user.fullname   ,
    email     : user.email      ,
    mobile    : user.mobile     ,
    village   : user.village    ,
    role   : user.role    ,
    profilePic: user.profilepic?.url ,
    posts     : user.posts.length      ,
    comments  : user.comments.length   ,
    likes     : user.likes.length      ,
  })
    }
},[user])


  // Mock village data
  const villageData = {
    name: "Green Valley",
    population: 5240,
    established: 1967,
    location: "Northern Region",
    mainCrops: ["Wheat", "Corn", "Barley"],
    climate: "Temperate",
  }
 const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  function handleUserUpdate(newuser){
    //console.log(newuser,'new user');
    
    setUserData({
      _id     : newuser._id   ,
    fullName  : newuser.fullname   ,
    email     : newuser.email      ,
    mobile    : newuser.mobile     ,
    village   : newuser.village    ,
    role   : newuser.role    ,
    profilePic: newuser.profilepic?.url ,
    posts     : newuser.posts.length      ,
    comments  : newuser.comments.length   ,
    likes     : newuser.likes.length      ,
    })

  }
  return (
   <div className="container mx-auto px-4 py-8">
    <Head>
        <title>
          Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP. User Profile Page.
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#4CAF50" />
        <meta
          name="description"
          content="A platform for daily mandi prices, village data, milk production updates, and rural development in Indore, Ujjain, Dhar, Dewas, Ratlam.Based on Nayata Patel samaj development, and youth growth in nayata patel samaj."
        />
        <meta
          name="keywords"
          content="farming, milk, mandi prices, rural development, Nayta Patel, Indore, Ujjain, Dhar, Dewas, Ratlam, kisan, kisani, kheti, gaon, samaj, Nayata patel , nayata patel samaj"
        />
        <meta name="author" content="Nayta Patel Network" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/profile`} />
        <meta
          property="og:title"
          content="Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP"
        />
        <meta
          property="og:description"
          content="Join 250+ villages in transforming agriculture and community life."
        />
        <meta property="og:image" content={`${userData?.profilePic}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/profile`} />
        <meta
          name="twitter:title"
          content="Nayta Patel Samaj | Farming & Rural Growth Platform"
        />
        <meta
          name="twitter:description"
          content="Stay updated with mandi prices, farming guides, and village empowerment programs."
        />
        <meta name="twitter:image" content={`${userData?.profilePic}`} />

        <link rel="canonical" href={`${siteUrl}/profile`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>
      <ProfileHeader userData={userData} onEditProfile={handleEditProfile} />
      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-6 py-4 text-sm font-medium ${
              activeTab === "profile"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            <FiUser className="mr-2" />
            Profile
          </button>
          
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center px-6 py-4 text-sm font-medium ${
              activeTab === "activity"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            <FiMessageSquare className="mr-2" />
            Activity
          </button>
          <button
            onClick={() => setActiveTab("village")}
            className={`flex items-center px-6 py-4 text-sm font-medium ${
              activeTab === "village"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            <FiMapPin className="mr-2" />
            Village
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center px-6 py-4 text-sm font-medium ${
              activeTab === "settings"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            <FiSettings className="mr-2" />
            Settings
          </button>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiUser className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{userData.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <p className="font-medium">{userData.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Village</p>
                        <p className="font-medium">{userData.village}</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 mt-4"
                    onClick={handleEditProfile}
                  >
                    <FiEdit2 className="mr-1" /> Edit Profile
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Activity Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <FiFileText className="text-emerald-500 text-xl" />
                      </div>
                      <p className="text-2xl font-bold">{userData.posts}</p>
                      <p className="text-sm text-gray-500">Posts</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <FiMessageSquare className="text-emerald-500 text-xl" />
                      </div>
                      <p className="text-2xl font-bold">{userData.comments}</p>
                      <p className="text-sm text-gray-500">Comments</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <FaRegThumbsUp className="text-emerald-500 text-xl" />
                      </div>
                      <p className="text-2xl font-bold">{userData.likes}</p>
                      <p className="text-sm text-gray-500">Likes</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && <ActivitySection userData={userData} />}
          {activeTab === "village" && <VillageDetails villageData={villageData} />}
          {activeTab === "settings" && <SettingsSection />}
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        userData={userData} 
        onUpdate= {(NewUser)=>handleUserUpdate(NewUser)}
      />
    </div>
  )
}

export default ProfileDashboard
