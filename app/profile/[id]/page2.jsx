'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiUser, FiCalendar, FiAward } from 'react-icons/fi'
import { FaSeedling, FaComments, FaThumbsUp } from 'react-icons/fa'
import Head from 'next/head'
import { usePatel } from '../../../components/patelContext'
import { useParams, useRouter } from 'next/navigation'
import { GiFlowerEmblem, GiFlowerHat, GiFlowers, GiHighGrass, GiWheat } from 'react-icons/gi'
import Link from 'next/link'

const PublicProfile = () => {
  const { siteUrl,path, user} = usePatel()
  const {id} = useParams()
  const router = useRouter()
  const [profileData, setProfileData] = useState({
    fullName: '',
    village: '',
    mobile: '',
    email: '',
    profilePic: '',
    role: '',
    createdAt: '',
    posts: 0,
    comments: 0,
    likes: 0,
    bio: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
     if(user?._id === id && user){
         // Navigate to home after 2 seconds
        router.push("/profile");
    }
    
  },[user])
  useEffect(() => {
   
    
    const fetchProfile = async () => {
  const token =  localStorage.getItem("token");

      try {
        const res = await fetch(`${path}/api/users/${id}`, 
           {  method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }
        )
        const data = await res.json()
       console.log(data,  data.fullname);
       
        setProfileData({
          fullName: data.fullname,
          village: data.village,
          mobile: data?.mobile || '**** *** ***',
          email: data?.email || `*****@gmail.com`,
          profilePic: data.profilepic?.url,
          role: data.role,
          createdAt: data.createdAt,
          posts: data.posts?.length || 0,
          comments: data.comments?.length || 0,
          likes: data.likes?.length || 0,
          bio: data.bio || `${data.fullname} is a member of our community`
        })
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

 if (!user) {
    return (
     <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping h-24 w-24 rounded-full bg-emerald-100 opacity-75"></div>
            </div>
            <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white border-2 border-emerald-500 shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-emerald-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hindi Content */}
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
          कृपया {/* अपनी */} जानकारी देखने के लिए लॉग इन करें
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          इस पेज तक पहुँचने के लिए आपको अपना खाता बनाना होगा। हमारे समुदाय का हिस्सा बनें और विशेष सुविधाओं का लाभ उठाएं।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors font-medium"
            >
              लॉग इन करें
            </motion.button>
          </Link>
          
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
            >
              नया खाता बनाएं
            </motion.button>
          </Link>
        </div>

        {/* Additional Help */}
        <p className="mt-8 text-sm text-gray-500">
          क्या आपको मदद चाहिए?{' '}
          <Link href="/contact" className="text-emerald-600 hover:underline">
            हमसे संपर्क करें
          </Link>
        </p>
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Head>
        <title>{profileData.fullName} | Nayta Patel Community</title>
        <meta name="description" content={`Profile of ${profileData.fullName} from ${profileData.village}`} />
        <meta property="og:title" content={`${profileData.fullName} | Nayta Patel Community`} />
        <meta property="og:description" content={`Community member from ${profileData.village}`} />
        <meta property="og:image" content={profileData.profilePic || `${siteUrl}/default-profile.jpg`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r text-yellow-400 flex items-end text-5xl from-emerald-400 to-emerald-600">
          
          </div>
          
          {/* Profile Content */}
          <div className="relative px-6 pb-8 -mt-16">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={profileData.profilePic || '/default-profile.jpg'} 
                  alt={profileData.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {profileData.role === 'ambassador' && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-800 rounded-full p-2 shadow-md">
                    <FiAward size={20} />
                  </div>
                )}
              </div>
            </div>

            {/* Name and Village */}
            <div className="text-center mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{profileData.fullName}</h1>
              <div className="flex items-center justify-center mt-2 text-emerald-600">
                <FiMapPin className="mr-1" />
                <span>{profileData.village}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
              {profileData.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <FaSeedling className="text-emerald-600 text-2xl mx-auto mb-2" />
                <p className="text-xl font-bold">{profileData.posts}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <FaComments className="text-emerald-600 text-2xl mx-auto mb-2" />
                <p className="text-xl font-bold">{profileData.comments}</p>
                <p className="text-sm text-gray-500">Comments</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <FaThumbsUp className="text-emerald-600 text-2xl mx-auto mb-2" />
                <p className="text-xl font-bold">{profileData.likes}</p>
                <p className="text-sm text-gray-500">Likes</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <FiUser className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-900">{profileData.fullName}</p>
              </div>
            </div>

            {profileData.mobile && (
              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <FiPhone className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Mobile</h3>
                  <p className="text-gray-900">{profileData.mobile}</p>
                </div>
              </div>
            )}

            {profileData.email && (
              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <FiMail className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <FiMapPin className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Village</h3>
                <p className="text-gray-900">{profileData.village}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <FiCalendar className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="text-gray-900">
                  {new Date(profileData.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ambassador Badge (if applicable) */}
        {profileData.role === 'ambassador' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <FiAward className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Village Ambassador</h3>
            <p className="text-yellow-700">
              {profileData.fullName} is an official ambassador for {profileData.village}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PublicProfile