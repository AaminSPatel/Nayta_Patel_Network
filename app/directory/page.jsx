'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePatel } from "../../components/patelContext";
import { FaMosque, FaSchool, FaUsers, FaUserTie } from "react-icons/fa";
import Head from "next/head"
import {motion} from 'framer-motion'
import { FiArrowRight, FiShare2 } from "react-icons/fi";

const DirectoryPage = () => {
  const {villages, siteUrl} = usePatel();
  const [filter, setFilter] = useState("");
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState("all"); // New state for district filter
  
    const [districts, setDistricts] = useState([]);

     useEffect(()=>{
      if(villages){
        let dists =  ["all", ...new Set(villages.map(village => village.district).filter(Boolean))]
      setDistricts(dists)
      }
     }, [villages])


useEffect(() => {
    let result = villages;
    
    // Apply district filter if not "all"
    if (selectedDistrict !== "all") {
      result = result.filter(village => village.district === selectedDistrict);
    }
    
    // Apply search filter
    if (filter) {
      setSelectedDistrict("all")
      result = villages.filter(village => 
        village.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    setFilteredVillages(result);
    
    // Initialize image indices
    const initialIndices = {};
    result.forEach(village => {
      initialIndices[village._id] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, [villages,  selectedDistrict , filter]);

  // Set up intervals for image rotation
  useEffect(() => {
    const intervals = filteredVillages.map(village => {
      return setInterval(() => {
        setCurrentImageIndices(prev => {
          const currentIndex = prev[village._id] || 0;
          const nextIndex = (currentIndex + 1) % (village.images?.length || 1);
          return {...prev, [village._id]: nextIndex};
        });
      }, 5000);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [filteredVillages]);

/*   const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilteredVillages(
      villages.filter((village) =>
        village.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }; */
const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDistrictFilter = (district) => {
    setSelectedDistrict(district);
    setFilter(""); // Clear search filter when selecting district
  };

  const shareVillage = (village) => {
    if (navigator.share) {
      navigator.share({
        title: `${village.name} गाँव - नायता पटेल नेटवर्क`,
        text: `नायता पटेल नेटवर्क के माध्यम से ${village.name} गाँव की खोज करें। ${village.info}`,
        url: `${window.location.origin}/village/${village._id}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('इस गाँव को सोशल मीडिया पर शेयर करें!');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="text-center mb-8 md:mb-12"
      >
        <motion.h2 
          variants={{ 
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.5 }
            }
          }}
          className="text-2xl md:text-4xl font-bold text-emerald-800 mb-3 md:mb-4"
        >
          हमारे गाँवों की गौरवशाली विरासत
        </motion.h2>
        <motion.p 
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.5 }
            }
          }}
          className="text-sm md:text-lg text-gray-700"
        >
          नायता पटेल समाज से जुड़े गाँवों की अनूठी पहचान, संस्कृति और प्रगति की कहानी यहाँ देखें।
        </motion.p>
      </motion.div>

      <Head>
        <title>गाँव निर्देशिका | 250+ गाँवों की जानकारी - नायता पटेल नेटवर्क</title>
        <meta name="description" content="इंदौर, उज्जैन, देवास, रतलाम और धार के 250+ गाँवों की कृषि, दुग्ध उत्पादन और सामुदायिक जानकारी" />
        {/* Other meta tags remain same */}
      </Head>

     {/* District Filter Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {districts.map(district => (
          <button
            key={district}
            onClick={() => handleDistrictFilter(district)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedDistrict === district
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {district === "all" ? "सभी जिले" : district}
          </button>
        ))}
      </div>

      {/* Search Filter */}
      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="गाँव खोजें..."
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-center text-lg"
        />
      </div>


      {/* Village List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
        {filteredVillages.map((village) => (
          <motion.div
            key={village._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 relative group border border-gray-100"
          >
            {/* Village Image with Gradient Overlay */}
            <div className="relative h-64 md:h-72 overflow-hidden">
              {village?.images?.length > 0 && (
                <Image
                  src={village.images[currentImageIndices[village._id] || 0]?.url}
                  alt={village.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  priority
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Village Name with Beautiful Typography */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 font-serif tracking-tight drop-shadow-lg">
                  {village.name}
                </h3>
                <div className="w-16 h-1 bg-emerald-400 mb-2 md:mb-3"></div>
                <p className="text-white/90 text-xs md:text-sm line-clamp-2">{village.info}</p>
              </div>
              
              {/* Share Button (Top Right) */}
              <button 
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                onClick={() => shareVillage(village)}
                aria-label="इस गाँव को शेयर करें"
              >
                <FiShare2 className="text-gray-800" />
              </button>

              {/* Image Counter */}
              {village?.images?.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {`${(currentImageIndices[village._id] || 0) + 1}/${village.images.length}`}
                </div>
              )}
            </div>

            {/* Village Stats */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                    <FaMosque />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">मस्जिद</p>
                    <p className="font-medium">{village?.mosque?.length || "1"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <FaSchool />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">विद्यालय</p>
                    <p className="font-medium">{village?.schools?.length || "3"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <FaUsers />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">जनसंख्या</p>
                    <p className="font-medium">{village?.population || "2,500"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <FaUserTie />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">सरपंच</p>
                    <p className="font-medium line-clamp-1">{village.headOfVillage || "जानकारी उपलब्ध नहीं"}</p>
                  </div>
                </div>
              </div>

              {/* Brand Watermark */}
              <div className="text-center text-xs text-gray-400 mt-3 md:mt-4 border-t pt-2 md:pt-3 border-gray-100">
                <span className="text-emerald-600 font-medium">नायता पटेल नेटवर्क</span> द्वारा संचालित
              </div>

              {/* View Details Button */}
              <Link href={`/village/${village._id}`}>
                <button className="mt-3 md:mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                  और जानकारी <FiArrowRight />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DirectoryPage;