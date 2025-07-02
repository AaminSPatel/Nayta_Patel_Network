"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import {
  FaCrown,
  FaMosque,
  FaSchool,
  FaStar,
  FaUserPlus,
  FaShareAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaNewspaper,
  FaAward,
  FaMapPin,
} from "react-icons/fa"
import { FiEdit, FiSave, FiDownload } from "react-icons/fi"
import { usePatel } from "./patelContext"

const AmbassadorPortal = ({ ambassador }) => {
  const cardRef = useRef(null)
 const {user, villages,fetchVillages , path} = usePatel();

  // Village details state
  const [villageDetails, setVillageDetails] = useState({})

  useEffect(()=>{
    if (villages && user) {
      let Village = villages.filter((item)=> item.ambassador?.email === user.email)
      if(Village.length > 0)
      //  console.log(villageDetails);
        
      setVillageDetails(Village[0])
    }
  },[villages , user])
  const [isEditing, setIsEditing] = useState(false)

  const handleVillageChange = (e) => {
    const { name, value } = e.target
    setVillageDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Submit to backend here
  }

  const captureCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a")
        link.download = `${user.village}-ambassador-card.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
      })
    }
  }

  const shareToSocial = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.fullname} - ${user.village} के राजदूत`,
        text: `नायता पटेल नेटवर्क के माध्यम से हमारे गाँव को जोड़ें`,
        url: window.location.href,
      })
    } else {
      alert("सोशल मीडिया पर शेयर करने के लिए डाउनलोड बटन का उपयोग करें")
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  // Debug: Log the raw data before creating FormData
  console.log("Raw data being sent:", villageDetails);

  const data = new FormData();

  // Append all fields
  data.append("name", villageDetails.name);
  data.append("info", villageDetails.info);
  data.append("population", villageDetails.population);
  data.append("headOfVillage", villageDetails.headOfVillage);
  data.append("district", villageDetails.district);

  // Append arrays as JSON strings (or loop as you were doing)
  data.append("mosque", JSON.stringify(villageDetails.mosque));
  data.append("schools", JSON.stringify(villageDetails.schools));

  // Debug: Log FormData contents
 /*  for (let [key, value] of data.entries()) {
    console.log(key, value);
  }
 */
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${path}/api/villages/ambassadorUpdate/${villageDetails._id}`, {
      method: "PUT",
      body: JSON.stringify(villageDetails),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // DON'T set Content-Type - let the browser handle it for FormData
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update village");
    }

    const result = await res.json();
    //console.log("Success:", result);
    setIsEditing(false);
    fetchVillages();
  } catch (err) {
    console.error("Error:", err.message);
    // Add user-facing error message here
  }
};
  const handleArrayChange = (e, fieldName) => {
    const values = e.target.value.split(",").map((v) => v.trim())
    setVillageDetails((prev) => ({ ...prev, [fieldName]: values }))
  }

  return (
    <div className="min-h-screen relative sm:py-8 sm:px-4">
      {/* Decorative Background Elements */}
     {villageDetails ? <> <div className="absolute inset-0 overflow-hidden hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-50 rounded-full opacity-25"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-emerald-300 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Ambassador Pride Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent"></div>
            <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white rounded-full opacity-15"></div>
          </div>

          <div className="relative z-10 p-3 sm:p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
                  <img
                    className="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl transform hover:scale-105 transition-transform duration-300"
                    src={user?.profilepic?.url || "/placeholder.svg?height=120&width=120"}
                    alt={user?.fullname}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full sm:p-3 p-2 shadow-lg">
                    <FaCrown className="text-emerald-800 sm:text-2xl text-xl" />
                  </div>
                </div>
              </div>

              <h1 className="sm:text-4xl text-2xl font-bold mb-2 text-white drop-shadow-lg">{user?.fullname}</h1>
              <h2 className="sm:text-3xl text-xl font-bold mb-4 text-yellow-300 drop-shadow-md">{villageDetails?.name}</h2>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 px-6 py-3 rounded-full sm:text-lg text-md font-bold shadow-lg">
                <FaAward className="sm:text-xl text-md" />
                गाँव के आधिकारिक एंबेसडर
              </div>
              <div className="flex line-clamp-3 bg-emerald-500 text-white backdrop-blur-sm backdrop-opacity-90 rounded-xl p-2 mt-4">
                <p className="text-sm sm:text-md">"{user?.achievement }"</p>
              </div>
            </div>

            {/* Ambassador Privileges */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:p-6 p-4 mb-6 border border-white/20">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">🎖️ एंबेसडर के विशेष अधिकार</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-white">
                <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <FaEdit className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">गाँव की जानकारी अपडेट करें</h4>
                    <p className="text-sm opacity-90">जनसंख्या, स्कूल, मस्जिद की जानकारी अपडेट करें</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <FaNewspaper className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">समाचार पोस्ट करें</h4>
                    <p className="text-sm opacity-90">गाँव की खबरें और अपडेट साझा करें</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <FaStar className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">विशेष सम्मान</h4>
                    <p className="text-sm opacity-90">आपकी प्रोफाइल गाँव के पेज पर दिखेगी</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <FaUsers className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">समुदाय निर्माण</h4>
                    <p className="text-sm opacity-90">नए सदस्य जोड़कर नेटवर्क बढ़ाएं</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 rounded-xl p-4 font-semibold">
                  🏆 10+ नए सदस्य जोड़कर विशेष पुरस्कार पाएं!
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className=" hidden flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToSocial}
                className="flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaShareAlt /> शेयर करें
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={captureCard}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FiDownload /> डाउनलोड
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaUserPlus /> नया सदस्य जोड़ें
              </motion.button>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="bg-black/30 backdrop-blur-sm text-center py-4 border-t border-white/20">
            <p className="text-yellow-300 font-bold text-lg tracking-wide">
              🌐 Powered by <span className="text-white">Nayta Patel Network</span>
            </p>
          </div>
        </motion.div>

        {/* Village Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-emerald-100"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 sm:p-6 p-4">
            <div className="flex justify-between items-center">
              <h2 className="sm:text-2xl text-md font-bold text-white flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-400 h-6 w-10" />
                {villageDetails?.name} गाँव की जानकारी
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-emerald-700 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
              >
                {isEditing ? (
                  <>
                    <FiSave /> Save
                  </>
                ) : (
                  <>
                    <FiEdit /> Edit
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="sm:p-8 p-4">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">जनसंख्या</label>
                    <input
                      type="text"
                      name="population"
                      value={villageDetails?.population}
                      onChange={handleVillageChange}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">सरपंच</label>
                    <input
                      type="text"
                      name="headOfVillage"
                      value={villageDetails?.headOfVillage}
                      onChange={handleVillageChange}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">जिला</label>
                    <input
                      type="text"
                      name="district"
                      value={villageDetails?.district}
                      onChange={handleVillageChange}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">मस्जिद</label>
                    <input
                      type="text"
                      name="mosque"
                      value={villageDetails?.mosque?.join(", ")}
                      onChange={(e) => handleArrayChange(e, "mosque")}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">मस्जिद</label>
                    <input
                      type="text"
                      name="schools"
                      value={villageDetails?.schools?.join(", ")}
                      onChange={(e) => handleArrayChange(e, "schools")}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">गाँव की विशेषताएँ</label>
                  <textarea
                    name="info"
                    value={villageDetails?.info}
                    onChange={handleVillageChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  ></textarea>
                </div>
                <div className="flex items-center justify-center gap-3">

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="text-emerald-500 sm:px-8 px-3 sm:py-4 py-2 rounded-xl outline-1 outline-emerald-200 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                 Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white sm:px-8 px-3 sm:py-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                   Update Details
                </motion.button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-2">
                      <FaUsers className="text-emerald-600 text-xl" />
                      <p className="text-sm font-semibold text-emerald-700">जनसंख्या</p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-800">{villageDetails?.population}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <FaMosque className="text-blue-600 text-xl" />
                      <p className="text-sm font-semibold text-blue-700">मस्जिद</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-800">{villageDetails?.mosque?.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <FaSchool className="text-purple-600 text-xl" />
                      <p className="text-sm font-semibold text-purple-700">विद्यालय</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-800">{villageDetails?.schools?.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-2">
                      <FaMapPin className="text-orange-600 text-xl" />
                      <p className="text-sm font-semibold text-orange-700">जिला</p>
                    </div>
                    <p className="text-lg font-bold text-orange-800">{villageDetails?.district}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">सरपंच जी</h3>
                  <p className="text-gray-700 text-xl font-semibold">{villageDetails?.headOfVillage}</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
                  <h3 className="font-bold text-emerald-800 mb-3 text-lg">गाँव की विशेषताएँ</h3>
                  <p className="text-emerald-700 leading-relaxed">{villageDetails?.info}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Community Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-black via-gray-900 to-black rounded-3xl p-8 text-center shadow-2xl border border-gray-800"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-4">🚀 समुदाय को मजबूत बनाएं</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              आपके नेतृत्व में हमारा नायता पटेल नेटवर्क दिन-प्रतिदिन बढ़ रहा है। अपने गाँव के और सदस्यों को जोड़कर इस मजबूत समुदाय का हिस्सा
              बनाएं।
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <FaUserPlus className="text-2xl" />
            Add New Members
          </motion.button>
        </motion.div>
      </div>
      </>:
      <div className="flex justify-center items-center h-32">
        <h2 className="text-3xl text-center text-amber-500 font-semibold capitalize">You are not appointed as ambassador now</h2>
      </div>}
    </div>
  )
}

export default AmbassadorPortal
