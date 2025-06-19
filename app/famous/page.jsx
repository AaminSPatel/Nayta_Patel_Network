"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Sample data - replace with your actual data
const famousPeople = [
  {
    id: 1,
    name: "Sarah Johnson",
    job: "Tech Entrepreneur",
    mobile: "+1 234 567 8900",
    facebook: "https://facebook.com/sarahjohnson",
    insta: "https://instagram.com/sarahjohnson",
    whatsapp: "https://wa.me/1234567890",
    intro:
      "Leading innovation in the tech industry with over 15 years of experience. Founded three successful startups and mentored hundreds of entrepreneurs.",
    quote: "Innovation distinguishes between a leader and a follower.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Michael Chen",
    job: "Award-Winning Chef",
    mobile: "+1 234 567 8901",
    facebook: "https://facebook.com/michaelchen",
    insta: "https://instagram.com/michaelchen",
    whatsapp: "https://wa.me/1234567891",
    intro:
      "Michelin-starred chef with restaurants across three continents. Passionate about sustainable cooking and community development through culinary arts.",
    quote: "Cooking is not about convenience. It's about love.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    job: "Medical Researcher",
    mobile: "+1 234 567 8902",
    facebook: "https://facebook.com/aishapateldoc",
    insta: "https://instagram.com/aishapateldoc",
    whatsapp: "https://wa.me/1234567892",
    intro:
      "Pioneering research in cancer treatment and immunotherapy. Published over 100 research papers and holds multiple patents in medical technology.",
    quote:
      "Science is the key to our future, and if you don't believe in science, then you're holding everybody back.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "James Rodriguez",
    job: "Olympic Athlete",
    mobile: "+1 234 567 8903",
    facebook: "https://facebook.com/jamesrodriguez",
    insta: "https://instagram.com/jamesrodriguez",
    whatsapp: "https://wa.me/1234567893",
    intro:
      "Three-time Olympic gold medalist in swimming. Currently coaching young athletes and promoting water safety programs in underserved communities.",
    quote:
      "Champions aren't made in the gyms. Champions are made from something deep inside them - a desire, a dream, a vision.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    name: "Emma Thompson",
    job: "Environmental Activist",
    mobile: "+1 234 567 8904",
    facebook: "https://facebook.com/emmathompson",
    insta: "https://instagram.com/emmathompson",
    whatsapp: "https://wa.me/1234567894",
    intro:
      "Leading global climate change initiatives and sustainable development projects. Founder of Green Future Foundation with projects in 50+ countries.",
    quote: "The Earth does not belong to us; we belong to the Earth.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    name: "David Kim",
    job: "AI Research Scientist",
    mobile: "+1 234 567 8905",
    facebook: "https://facebook.com/davidkim",
    insta: "https://instagram.com/davidkim",
    whatsapp: "https://wa.me/1234567895",
    intro:
      "Leading artificial intelligence research at top tech companies. Specializing in machine learning and neural networks with focus on ethical AI development.",
    quote:
      "The future belongs to those who understand that technology should serve humanity.",
    image: "/placeholder.svg?height=400&width=400",
  },
];

const ITEMS_PER_PAGE = 6;

export default function FamousPeoplePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(famousPeople.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPeople = famousPeople.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header Section */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="text-center my-8 px-6"
      >
        <motion.h2
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }}
          className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
        >
          समाज के चर्चित चेहरे{" "}
        </motion.h2>
        <motion.p
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }}
          className="text-lg text-gray-700"
        >
          हमारे नायता पटेल समाज में ऐसे कई लोग हैं जिन्होंने अपनी मेहनत, लगन और
          सोच से न सिर्फ सफलता प्राप्त की है, बल्कि समाज के लिए भी एक मिसाल कायम
          की है। ये वे चेहरे हैं जो आज हमारे समुदाय की पहचान बन चुके हैं –
          जिन्होंने समाज में नई दिशा दी, प्रेरणा दी और अगली पीढ़ियों के लिए
          मार्ग प्रशस्त किया। हम इन चर्चित चेहरों का सम्मान करते हैं, जो आज समाज
          के सितारे बन चुके हैं। इनकी उपलब्धियाँ सिर्फ व्यक्तिगत नहीं, बल्कि
          पूरे समाज की गरिमा को बढ़ाती हैं।
        </motion.p>
      </motion.div>
      {/* Cards Grid */}
      <div className="container mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPeople.map((person, index) => (
              <PersonCard key={person.id} person={person} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center mt-16 space-x-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaChevronLeft />
            </motion.button>

            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i + 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-emerald-50 shadow-md hover:shadow-lg"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaChevronRight />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function PersonCard({ person, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
      }}
      className="group relative bg-gradient-to-br from-white via-slate-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-slate-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Golden Border Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-emerald-400/30 to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ padding: "2px" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-white via-slate-50 to-emerald-50 rounded-3xl" />
      </div>

      <div className="relative z-10 p-6">
        {/* Image Section */}
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <motion.div
            whileHover={{
              scale: 1.15,
              rotateX: 10,
              rotateY: 10,
              z: 50,
            }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={person.image?.url || "/placeholder.svg"}
              alt={person.name}
              className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Quote Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          >
            "{person.quote || "Hi Nayta Patel"}"
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
              {person.name}
            </h3>
            <p className="text-emerald-600 font-semibold text-lg">
              {person.job}
            </p>
          </div>

          {/* Introduction */}
          <p className="text-slate-600 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {person.intro}
          </p>

          {/* Contact Info */}
          {person.mobile && (
            <div className="flex items-center space-x-2 text-slate-700">
              <FaPhone className="text-emerald-500" />
              <span className="font-medium">{person.mobile}</span>
            </div>
          )}

          {/* Social Links */}
          <div className="flex space-x-4">
            {person.whatsapp && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={person.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaWhatsapp size={20} />
              </motion.a>
            )}
            {person.insta && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href={person.insta}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaInstagram size={20} />
              </motion.a>
            )}
            {person.facebook && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={person.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaFacebook size={20} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Premium Badge */}
      <div className="absolute top-4 z-10 right-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        ⭐ VIP
      </div>
    </motion.div>
  );
}
