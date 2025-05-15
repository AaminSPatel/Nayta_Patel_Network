"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaUsers, 
  FaUserTie, 
  FaInfoCircle, 
  FaMosque, 
  FaSchool, 
  FaCalendarAlt, 
  FaAngleLeft, 
  FaAngleRight, 
  FaChevronDown, 
  FaChevronUp,
  FaUserShield
} from 'react-icons/fa';
import { usePatel } from '../../../components/patelContext';

const VillageDetailPage = () => {
  const {villageId} = useParams();
  //const { villageId } = router.query;
  const [village, setVillage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
const {villages} = usePatel();
  // Simulate fetching data from API

  useEffect(() => {
    console.log(villageId);
    
    if (villageId) {
      
      // In a real app, you would fetch this data from an API
      const foundVillage = villages.find(v => v._id === villageId);
      setVillage(foundVillage);
      setLoading(false);
    }
  }, [villageId,villages]);
  // Carousel navigation
  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === (village?.images.length - 1) ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (village?.images.length - 1) : prevIndex - 1
    );
  };

  // AutoPlay for carousel
  useEffect(() => {
    if (!village) return;
    
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [village, currentImageIndex]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-lg text-gray-600">Loading village details...</p>
      </div>
    );
  }

  if (!village) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Village not found!</h1>
        <p className="mt-4">The village you're looking for doesn't exist or has been removed.</p>
        <button 
          /* onClick={() => router.push('/villages')} */
          className="mt-6 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Go back to villages
        </button>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate description to show
  const shortDescription = village.info.length > 150 
    ? `${village.info.substring(0, 150)}...` 
    : village.info;
  
  const descriptionToShow = showFullDescription ? village.info : shortDescription;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Image Carousel */}
      <div className="relative h-[60vh] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={village.images[currentImageIndex].url || "/placeholder.svg"}
              alt={`${village.name} image ${currentImageIndex + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm text-white transition-all z-10"
          aria-label="Previous image"
        >
          <FaAngleLeft size={24} />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm text-white transition-all z-10"
          aria-label="Next image"
        >
          <FaAngleRight size={24} />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {village.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Village Name Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute bottom-10 left-10 text-white z-10 max-w-3xl"
        >
          <h1 className="text-5xl font-bold mb-2">{village.name}</h1>
          {/* <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <p className="text-lg">{village.location}</p>
          </div> */}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Village Details */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex border-b mb-6 overflow-x-auto">
              <TabButton 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')}
                icon={<FaInfoCircle />}
                label="Overview"
              />
              <TabButton 
                active={activeTab === 'facilities'} 
                onClick={() => setActiveTab('facilities')}
                icon={<FaSchool />}
                label="Facilities"
              />
              <TabButton 
                active={activeTab === 'leadership'} 
                onClick={() => setActiveTab('leadership')}
                icon={<FaUserTie />}
                label="Leadership"
              />
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                        <FaInfoCircle className="mr-2 text-emerald-500" />
                        About {village.name}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">{descriptionToShow}</p>
                      
                      {village.info.length > 150 && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="mt-2 text-emerald-600 font-medium flex items-center"
                        >
                          {showFullDescription ? 'Show less' : 'Read more'} 
                          {showFullDescription ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                        </button>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                        <FaUsers className="mr-2 text-emerald-500" />
                        Demographics
                      </h2>
                      <div className="flex items-center justify-center p-6 bg-emerald-50 rounded-xl">
                        <div className="text-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="text-5xl font-bold text-emerald-600"
                          >
                            {village.population.toLocaleString()}
                          </motion.div>
                          <p className="text-gray-600 mt-1">Total Population</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                        <FaCalendarAlt className="mr-2 text-emerald-500" />
                        History
                      </h2>
                      <p className="text-gray-700">
                        {village.name} was established on {formatDate(village.createdAt)}. 
                        It has grown significantly over the years and has become a landmark location in the region.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'facilities' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                        <FaSchool className="mr-2 text-emerald-500" />
                        Educational Institutions
                      </h2>
                      <ul className="space-y-3">
                        {village.schools?.map((school, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="h-10 w-10 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full mr-3">
                              <FaSchool />
                            </div>
                            <span className="text-gray-700">{school}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                        <FaMosque className="mr-2 text-emerald-500" />
                        Religious Institutions
                      </h2>
                      <ul className="space-y-3">
                        {village.mosque.map((mosque, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="h-10 w-10 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full mr-3">
                              <FaMosque />
                            </div>
                            <span className="text-gray-700">{mosque}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'leadership' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                        <FaUserTie className="mr-2 text-emerald-500" />
                        Village Administration
                      </h2>
                      
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center bg-gray-50 p-6 rounded-lg mb-4"
                      >
                        <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                          {village.headOfVillage.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-gray-800">{village.headOfVillage}</h3>
                          <p className="text-gray-600">Head of Village</p>
                        </div>
                      </motion.div>

                      {village.ambassador && (
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center bg-gray-50 p-6 rounded-lg"
                        >
                          <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                            <FaUserShield />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-gray-800">{village.ambassador.name}</h3>
                            <p className="text-gray-600">{village.ambassador.role}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Map and Quick Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-4 space-y-6"
            >
              {/* Location Map */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                  Location
                </h2>
                <div className="rounded-lg overflow-hidden border border-gray-100">
                  <iframe
                    src={village.location}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${village.name}`}
                  ></iframe>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-emerald-500 p-6 rounded-2xl shadow-sm text-white">
                <h2 className="text-xl font-semibold mb-4">Village Overview</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-emerald-400">
                    <span className="flex items-center">
                      <FaUsers className="mr-2" /> Population
                    </span>
                    <span className="font-medium">{village.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-emerald-400">
                    <span className="flex items-center">
                      <FaSchool className="mr-2" /> Schools
                    </span>
                    <span className="font-medium">{village.schools.length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-emerald-400">
                    <span className="flex items-center">
                      <FaMosque className="mr-2" /> Mosques
                    </span>
                    <span className="font-medium">{village.mosque.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-2" /> Established
                    </span>
                    <span className="font-medium">{new Date(village.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => router.push('/villages')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FaAngleLeft className="mr-1" /> Back
                </button>
                <button 
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(village.location)}`, '_blank')}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FaMapMarkerAlt className="mr-1" /> Directions
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 border-b-2 whitespace-nowrap ${
        active 
          ? "border-emerald-500 text-emerald-600" 
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default VillageDetailPage;