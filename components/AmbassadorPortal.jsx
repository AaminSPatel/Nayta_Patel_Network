'use client'

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { usePatel } from './patelContext';
import { FaCrown, FaMosque, FaSchool, FaStar } from 'react-icons/fa';

const AmbassadorPortal = (ambassador) => {

//console.log('Ambassador Data',ambassador);
const {formatDate,villages,user,siteUrl,siteBrand} = usePatel()
  // Village details state
    const [villageDetails, setVillageDetails] = useState({
    population: '',
    intro: '',
    landmarks:'',
    mosque: [],
    schools: [],
    contactNumber: '+1234567890',
  });

  useEffect(()=>{
if(villages && user.role === 'admin' || user.role === 'ambassador'){
  const filteredVillage = villages.filter((item)=> item.ambassador?._id === user._id || item.name.toLowerCase().includes(user?.village?.toLowerCase()))
  console.log('filteredVillage',filteredVillage);
  if(filteredVillage.length){
    setVillageDetails({
    population: filteredVillage[0]?.population,
    intro: filteredVillage[0]?.intro,
    landmarks: filteredVillage[0]?.name,
    mosque: filteredVillage[0]?.mosque,
    schools: filteredVillage[0]?.schools,
   
  })
  }
     
}
  },[villages,user])

  // Form edit mode
  const [isEditing, setIsEditing] = useState(false);
  const cardRef = useRef(null);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Handle form input changes
  const handleVillageChange = (e) => {
    const { name, value } = e.target;
    setVillageDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send data to your backend
  };

  // Capture card as image
  const captureCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${ambassador.user.village}-ambassador-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  // Share to social media
  const shareToSocial = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${ambassador.user.fullname}, ${ambassador.user.village}'s Ambassador`,
        text: `Check out our community ambassador program at ${window.location.hostname}`,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Web Share API not supported in your browser. Please use the download option.');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Ambassador Portal</h1>
        <p className="text-emerald-500 text-center mb-8">Representing {ambassador.user.village}</p>
        
        {/* Ambassador Card */}
        <motion.div 
          ref={cardRef}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-emerald-100"
        >
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <img 
                className="h-64 w-full object-cover md:h-full" 
                src={ambassador.user?.profilePic} 
                alt={ambassador.user.fullName}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{ambassador.user.fullName}</h2>
                <p className="text-emerald-300">Village Ambassador</p>
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                    {ambassador.user.village}
                  </span>
                  <p className="text-gray-500 text-sm mt-1">Member since {formatDate(ambassador.user?.createdAt)}</p>
                </div>
                <div className="bg-emerald-500 text-yellow-300 text-xs px-2 py-1 rounded-full flex gap-1">
                  <FaStar/> <FaStar/> <FaStar />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Ambassador</h3>
              <p className="text-gray-600 mb-4">Organized 5 community events, planted 100 trees</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Village Highlights</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="font-medium">{villageDetails.population}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{ambassador.user.village}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Masjid</p>
                  <p className="font-medium">{villageDetails?.mosque.join(',')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">School</p>
                  <p className="font-medium">{villageDetails?.schools.join(',')}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500"><a href={siteUrl}>{siteBrand}</a></p>
                <div className="flex space-x-2">
                  <button 
                    onClick={captureCard}
                    className="text-emerald-500 hover:text-emerald-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={shareToSocial}
                    className="text-emerald-500 hover:text-emerald-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Village Details'}
          </button>
         {/*  <button
            onClick={captureCard}
            className="px-4 py-2 bg-white text-emerald-500 border border-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Download Card
          </button>
          <button
            onClick={shareToSocial}
            className="px-4 py-2 bg-white text-emerald-500 border border-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Share Card
          </button> */}
        </div>
        
        {/* Village Details Form */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-md border border-emerald-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Village Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Village Population</label>
                  <input
                    type="number"
                    name="population"
                    value={villageDetails.population}
                    onChange={handleVillageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notable Landmarks</label>
                  <input
                    type="text"
                    name="landmarks"
                    value={villageDetails.landmarks}
                    onChange={handleVillageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Features</label>
                  <input
                    type="text"
                    name="specialFeatures"
                    value={villageDetails.specialFeatures}
                    onChange={handleVillageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={villageDetails.contactPerson}
                    onChange={handleVillageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={villageDetails.contactNumber}
                    onChange={handleVillageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Village Summary Card */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="mt-8 bg-gradient-to-r from-emerald-50 to-white p-6 rounded-xl shadow-sm border border-emerald-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">{ambassador.user?.village} at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-xs border border-emerald-50">
              <p className="text-sm text-gray-500">Population</p>
              <p className="text-2xl font-bold text-emerald-600">{villageDetails.population}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-xs border border-emerald-50">
              <p className="text-sm text-gray-500">Landmarks</p>
              <p className="text-lg font-semibold text-gray-800 line-clamp-1">{villageDetails.landmarks}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-xs border border-emerald-50">
              <p className="text-sm text-gray-500">Specialties</p>
              <p className="text-lg font-semibold text-gray-800 line-clamp-1 flex items-center gap-2"><FaMosque/>{villageDetails.mosque?.length}</p>
              <p className="text-lg font-semibold text-gray-800 line-clamp-1 flex items-center gap-2"><FaSchool/>{villageDetails.schools?.length}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-xs border border-emerald-50">
              <p className="text-sm text-gray-500">Sarpanch</p>
              <p className="text-sm font-semibold text-gray-800 line-clamp-1 flex items-center gap-2"><FaCrown size={19}/>{villageDetails.headOfVillage}</p>
            </div>
          </div>
          {/* <div className="mt-4 pt-4 border-t border-emerald-100">
            <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
            <p className="text-gray-600">{villageDetails.contactPerson}</p>
            <p className="text-emerald-500">{villageDetails.contactNumber}</p>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default AmbassadorPortal;