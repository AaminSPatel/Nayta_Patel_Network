'use client'

import { useState } from "react";
import { FaQuoteLeft, FaSearch, FaFilter } from "react-icons/fa";
import { usePatel } from "../../components/patelContext";
import Head from "next/head"
import {motion } from 'framer-motion'
//import { useSession, signIn } from 'next-auth/react'
import { FiBook, FiSend, FiUser, FiLogIn, FiMapPin } from 'react-icons/fi'


export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedStory, setExpandedStory] = useState(null);
 const {stories,siteUrl,user}  = usePatel()
   const categories = [...new Set(stories.map((story) => story.category))];
const villages = [...new Set(stories.map((story) => story.location))];

  const filteredStories = stories.filter((story) => {
    return (
      (selectedCategory === "" || story.category === selectedCategory) &&
      (selectedVillage === "" || story.location === selectedVillage) &&
      (searchTerm === "" ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.content.toLowerCase().includes(searchTerm.toLowerCase())) && story.status ==='Published'
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
  <title>Success Stories | Farmers & Villages Transforming Together</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="theme-color" content="#4CAF50" />
  <meta name="description" content="Read real stories from farmers and villages empowered through better farming, milk production, and samaj unity in MP." />
  <meta name="keywords" content="success stories, farmer progress, village case studies, kisano ki kahani, gaon ki safalta, Nayta Patel Samaj" />
  <meta name="author" content="Nayta Patel Network" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/success-stories`} />
  <meta property="og:title" content="Success Stories | Empowering Villages Through Agriculture" />
  <meta property="og:description" content="Stories of transformation from the fields of Madhya Pradesh." />
  <meta property="og:image" content={`${siteUrl}/success.jpg`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`${siteUrl}/success-stories`} />
  <meta name="twitter:title" content="Real Success Stories | Farming & Rural Growth" />
  <meta name="twitter:description" content="Learn how farmers changed their lives through our platform." />
  <meta name="twitter:image" content={`${siteUrl}/success.jpg`} />

  <link rel="canonical" href={`${siteUrl}/success-stories`} />
  <link rel="icon" href={`${siteUrl}/favicon.ico`} />
</Head>
<motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
          >
            सफलता की प्रेरक कहानियाँ
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700"
          >
हमारे नायता पटेल समाज के सदस्यों के जीवन में आए वास्तविक बदलाव और प्रगति की गाथाएँ। ये कहानियाँ न सिर्फ प्रेरणा देती हैं, बल्कि सामूहिक प्रयासों से गाँवों में आए ऐतिहासिक परिवर्तन की मिसाल भी पेश करती हैं।          </motion.p>
        </motion.div>

     {/*  <h1 className="text-3xl font-bold mb-2">सफलता की प्रेरक कहानियाँ</h1>
      <p className="text-gray-600 mb-8">
         
      </p>*/}
{/* Filters */}
<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <div className="flex items-center mb-6">
    <FaFilter className="text-emerald-500 mr-3 text-2xl" />
    <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
      <select
        value={selectedVillage}
        onChange={(e) => setSelectedVillage(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Villages</option>
        {villages.map((village) => (
          <option key={village} value={village}>
            {village}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stories..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 pl-10 p-3"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  </div>
</div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <div
              key={story._id}
              className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all transform"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image?.url || "/placeholder.svg"}
                  alt={story.title}
                  className="object-cover w-full h-full hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {story.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  {/* <div className="flex items-start mb-4">
                    <FaQuoteLeft className="text-emerald-500 text-2xl mr-2 mt-1" />
                    <p className="italic text-gray-700">{story.quote}</p>
                  </div> */}
                  <h3 className="font-bold text-xl mb-1">{story.title}</h3>
                </div>
                <div className="flex justify-between mt-4">
                
                  <p className="text-gray-500 text-sm hidden">Age: {story.age}</p>
                </div>
                {expandedStory === story._id ? (
                  <div className="mt-4 p-4 border-t border-gray-200">
                    <p>{story.content}</p>
                  </div>
                ): (
                  <div classname='flex items-center justify-center h-full'><p className="text-gray-700 line-clamp-6">{story.content}</p></div>
                )}  
                <button
                    onClick={() =>
                      setExpandedStory(expandedStory === story._id ? null : story._id)
                    }
                    className="text-emerald-500 hover:underline"
                  >
                    {expandedStory === story._id ? "Collapse" : "Read more"}
                  </button>
              </div>
              
            </div>
            
          ))}
          
        </div>
      ) : (
        <p>No stories found.</p>
      )}
      <div className="w-full h-auto flex items-center justify-center py-12">

      <SuccessStories/>
      </div>
    </div>
  );
}


const SuccessStories = () => {
   // const { data: session } = useSession()
const [formData, setFormData] = useState({
    name: '',
    story: '',
    village: ''
  })
  const {user,path} = usePatel();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(path +'/api/stories/apply', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          formData
        ),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', story: '', village: '' })
      }
    } catch (error) {
      console.error('Error submitting story:', error)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto">
        
        {!user ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <FiBook className="mx-auto text-5xl text-emerald-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              अपनी सफलता की कहानी साझा करें!
            </h3>
            <p className="text-gray-600 mb-6">
              क्या आपने कोई अनोखी सफलता हासिल की है? हमारे समुदाय के साथ बाँटें और सैकड़ों किसानों को प्रेरित करें!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium flex items-center justify-center mx-auto gap-2"
            >
              <FiLogIn /> लॉग इन करके शुरू करें
            </motion.button>
            <p className="mt-4 text-sm text-gray-500">
              केवल पंजीकृत सदस्य ही कहानियाँ साझा कर सकते हैं
            </p>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <div className="text-emerald-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              धन्यवाद! आपकी कहानी सबमिट हो गई है
            </h3>
            <p className="text-gray-600 mb-6">
              हमारी टीम आपकी प्रेरक कहानी की समीक्षा करेगी और जल्द ही इसे हमारे समुदाय के साथ साझा करेगी।
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg font-medium"
            >
              एक और कहानी साझा करें
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                अपनी सफलता की कहानी लिखें
              </h3>
              <p className="text-gray-600">
                आपकी कहानी हजारों किसान भाइयों को नई राह दिखा सकती है!
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  <FiUser className="text-emerald-600" /> आपका नाम
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  <FiMapPin className="text-emerald-600" /> आपका गाँव
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  <FiBook className="text-emerald-600" /> आपकी सफलता की कहानी
                </label>
                <textarea
                  value={formData.story}
                  onChange={(e) => setFormData({...formData, story: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="हमें बताएं कि आपने कैसे सफलता हासिल की... (कम से कम 200 शब्द)"
                  required
                  minLength={200}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    सबमिट कर रहे हैं...
                  </>
                ) : (
                  <>
                    <FiSend /> अपनी कहानी साझा करें
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
