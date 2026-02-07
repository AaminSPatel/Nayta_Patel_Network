"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { usePatel } from "./patelContext";
import Image from "next/image";

const CompactVillageSlider = () => {
  const { villages } = usePatel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const [direction, setDirection] = useState(1); // Track navigation direction

  // Filter villages with images
  const villagesWithImages =
    villages?.filter((village) => village?.images?.length > 0) || [];

  // Auto-rotate villages
  useEffect(() => {
    if (villagesWithImages.length > 1 && !isHovered) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => {
          // If we're at the end, don't loop - stay at last item
          if (prev >= villagesWithImages.length - 1) {
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);

      return () => clearInterval(intervalRef.current);
    }
  }, [villagesWithImages.length, isHovered, currentIndex]); // Added currentIndex to dependencies

  const goToNext = () => {
    if (currentIndex < villagesWithImages.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      resetInterval();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      resetInterval();
    }
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    if (villagesWithImages.length > 1 && !isHovered) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => {
          if (prev >= villagesWithImages.length - 1) {
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
  };

  if (villagesWithImages.length === 0) {
    return null;
  }

  const currentVillage = villagesWithImages[currentIndex];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div className="w-full max-w-full mx-auto px-2 py-6">
      <h3 className="text-xl font-bold text-emerald-800 mb-3 text-center"></h3>
      <p></p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-4"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
        >
          हमारे गाँव
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-700">
          नायता पटेल समाज से जुड़े गाँवों की अनूठी पहचान, संस्कृति और प्रगति की
          कहानी यहाँ देखें।
        </motion.p>
      </motion.div>
      <div
        className="relative sm:h-[350px] h-[250px] w-full rounded-xl overflow-hidden shadow-xl shadow-sky-950"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Village Image */}
        {currentVillage?.images?.[0]?.url && (
          <Image
            src={currentVillage.images[0].url}
            alt={currentVillage.name}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Village Info */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-bold line-clamp-1">
                  {currentVillage.name}
                </h4>
                <div className="flex items-center text-sm mt-1">
                  <FaMapMarkerAlt className="mr-1 text-emerald-300" />
                  <span>{currentVillage.district || "इंदौर"}</span>
                </div>
              </div>
              <Link href={`/village/${currentVillage._id}`}>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-all">
                  देखें <FiArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {villagesWithImages.length > 1 && (
          <>
            <button
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full z-10 transition-all ${currentIndex === 0 ? "opacity-50 cursor-default" : "hover:bg-white/30"}`}
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full z-10 transition-all ${currentIndex === villagesWithImages.length - 1 ? "opacity-50 cursor-default" : "hover:bg-white/30"}`}
              onClick={goToNext}
              disabled={currentIndex === villagesWithImages.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {villagesWithImages.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {villagesWithImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-emerald-500 w-4" : "bg-gray-300"}`}
              aria-label={`Go to village ${index + 1}`}
            />
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link
          href="/directory"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          View All Villages
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default CompactVillageSlider;
