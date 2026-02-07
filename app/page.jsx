"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaHeart,
  FaArrowRight,
  FaArrowCircleRight,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
  FaHome,
  FaMapSigns,
  FaUsers,
  FaNewspaper,
  FaChartLine,
  FaBlog,
  FaCalendarAlt,
  FaBookOpen,
  FaTractor,
  FaEnvelope,
  FaEye,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import Head from "next/head";
import { usePatel } from "../components/patelContext.js";
import EventCubeSlider from "../components/eventSection.jsx";
import { FiBook, FiUser, FiMapPin, FiSend, FiLogIn, FiX } from "react-icons/fi";

import VillageSection from "../components/villageSection.jsx";
import WelcomeCard from "../components/welcomeCard.jsx";
import "swiper/css/effect-coverflow";
import AdSection from "../components/home/adSection";
import { MdLeaderboard } from "react-icons/md";
// Navigation items for the tile section

const navigationItems = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Villages", href: "/directory", icon: FaMapSigns },
  { name: "Posts", href: "/wall", icon: FaUsers },
  { name: "News", href: "/news", icon: FaNewspaper },
  { name: "Blogs", href: "/blog", icon: FaBlog },
  { name: "Rank", href: "/leaderboard", icon: MdLeaderboard },
  { name: "Events", href: "/events", icon: FaCalendarAlt },
  { name: "Stories", href: "/pehchan", icon: FaBookOpen },
  /*   { name: "Stories", href: "/stories", icon: FaBookOpen }, */
  { name: "Prices", href: "/prices", icon: FaChartLine },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const {
    blogs,
    formatDate,
    user,
    path,
    posts,
    users,
    siteUrl,
    news,
    prices,
    showWelcomeCard,
    setShowWelcomeCard,
    formatContent,
    pehchans,
    villages,
  } = usePatel();
  const [priceData, setPriceData] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredPehchans, setFeaturedPehchans] = useState([]);
  // Function to clean and extract Hindi/English name for better matching
  // Loading state check karein
  const isLoading = !mounted || (user && !user.village && news.length === 0);
  const cleanMatch = (str, target) => {
    if (!str || !target) return false;

    const normalize = (text) => {
      return (
        text
          .toLowerCase()
          .replace(/[()[\],]/g, "") // Brackets aur punctuation hatata hai
          // Hindi Normalization: Matra aur Bindi ka variation khatam karne ke liye
          .replace(/्/g, "") // Halant (aadhe akshar)
          .replace(/[ंँ]/g, "") // Bindi aur Chandrabindu
          .replace(/़/g, "") // Nuqta
          .replace(/[‌‍]/g, "") // Zero-width joiners (hidden characters)
          .replace(/\s+/g, "") // Saare spaces khatam (taki 'New Delhi' aur 'NewDelhi' match ho jaye)
          .trim()
      );
    };

    const cleanStr = normalize(str);
    const cleanTarget = normalize(target);

    // Dono taraf se check: Kya ek dusre ke andar maujood hai?
    return cleanStr.includes(cleanTarget) || cleanTarget.includes(cleanStr);
  };
  // Personalized Gallery Logic
  const userVillage = user?.village || "";

const dynamicGallery = useMemo(() => {
  if (isLoading) return [];

  // Sirf users ko reverse kar rahe hain taaki naye sadasya pehle dikhen
  const recentUsers = users ? [...users].reverse() : [];

  return [
    // 1. AAPKE GAON KI NEWS (Original order)
    ...(news
      ?.filter((item) =>
          item.verificationStatus === "verified" &&
          cleanMatch(item.location, userVillage),
      )
      .slice(0, 3)
      .map((item) => ({
        url: item.image?.url,
        label: item.title.slice(0, 40),
        category: "आपके गाँव की न्यूज़",
        id: item._id,
        link: `/news/${item._id}`,
      })) || []),

    // 2. AAPKE GAON KI IMAGE
    ...(villages
      ?.filter((v) => cleanMatch(v.name, userVillage))
      .slice(0, 1)
      .map((v) => ({
        url: v.images?.[0]?.url,
        label: v.name,
        category: "आपका गाँव",
        id: v._id,
        link: `/directory/${v._id}`,
      })) || []),

    // 3. GAON KE LOG (Sirf yahan recent users dikhenge)
    ...(recentUsers
      ?.filter((u) =>
          cleanMatch(u.village, userVillage) &&
          u.profilepic?.url &&
          u._id !== user?._id,
      )
      .slice(0, 6)
      .map((item) => ({
        url: item.profilepic.url,
        label: item.fullname,
        category: item.role === "ambassador" ? "गाँव एम्बेसडर" : "आपके गाँव से",
        id: item._id,
        link: `/profile/${item._id}`,
      })) || []),

    // 4. SAMAJ KI STORIES (Pehchan)
    ...(pehchans?.slice(0, 2).map((item) => ({
      url: item.image?.url,
      label: item.name,
      category: "प्रेरक कहानी",
      id: item._id,
      link: `/pehchan/${item._id}`,
    })) || []),

    // 5. DUSRE GAON KI JHALKIYAN
    ...(villages
      ?.filter((v) => !cleanMatch(v.name, userVillage))
      .slice(0, 4)
      .map((v) => ({
        url: v.images?.[0]?.url,
        label: v.name,
        category: "अपने समाज के गाँव",
        id: v._id,
        link: `/directory/${v._id}`,
      })) || []),

    // 6. BAKI NEWS (Original order, no reverse)
    ...(news
      ?.filter((item) =>
          item.verificationStatus === "verified" &&
          !cleanMatch(item.location, userVillage),
      )
      .slice(0, 4)
      .map((item) => ({
        url: item.image?.url,
        label: item.title.slice(0, 40),
        category: "समाचार",
        id: item._id,
        link: `/news/${item._id}`,
      })) || []),
  ].filter((item) => item.url);
}, [news, user, users, villages, pehchans, userVillage, isLoading]);

const doubledGallery = [...dynamicGallery, ...dynamicGallery];

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    village: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      // path aapke usePatel context se aa raha hai
      const response = await fetch(`${path}/api/stories/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", story: "", village: "" });
        // 3 second baad modal apne aap band ho jaye (Optional)
        setTimeout(() => {
          setIsSuccess(false);
          setIsStoryModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting story:", error);
      alert("Kuch error aaya, please fir se koshish karein");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  // Filter news for homepage
  useEffect(() => {
    if (news && news.length > 0) {
      // Get verified news only
      const verifiedNews = news.filter(
        (item) => item.verificationStatus === "verified",
      );

      // Get breaking news (marked as important or recent)
      const breaking = verifiedNews
        .filter(
          (item) =>
            item.category === "Breaking" ||
            new Date(item.publish_date) >
              new Date(Date.now() - 24 * 60 * 60 * 1000),
        )
        .slice(0, 3);

      // Get featured news
      const featured = verifiedNews
        .filter((item) => !breaking.includes(item))
        .slice(0, 3);

      setBreakingNews(breaking);
      setFeaturedNews(featured);
    }
  }, [news]);

  // Filter Pehchan stories for homepage
  useEffect(() => {
    if (pehchans && pehchans.length > 0) {
      // Get featured Pehchan stories (limit to 6)
      const featured = pehchans.slice(0, 6);
      setFeaturedPehchans(featured);
    }
  }, [pehchans]);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  useEffect(() => {
    if (prices) {
      if (!prices || !prices[0]?.prices?.grain) {
      } else {
        const result = [];
        const categoryData = prices[0].prices.grain;

        Object.entries(categoryData).forEach(([itemName, itemData]) => {
          if (typeof itemData === "object" && !itemData.currentPrice) {
            Object.entries(itemData).forEach(([subItemName, subItemData]) => {
              result.push({
                name: `${itemName} (${subItemName.replace(/_/g, " ")})`,
                ...subItemData,
              });
            });
          } else {
            // Handle simple items
            result.push({
              name: itemName.replace(/_/g, " "),
              ...itemData,
            });
          }
        });
        setPriceData(result);
      }
    }
  }, [prices]);

  if (!mounted) return null;

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
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>
          Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
        <meta property="og:url" content={`${siteUrl}`} />
        <meta
          property="og:title"
          content="Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP"
        />
        <meta
          property="og:description"
          content="Join 250+ villages in transforming agriculture and community life."
        />
        <meta property="og:image" content={`${siteUrl}/hom2.jpeg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}`} />
        <meta
          name="twitter:title"
          content="Nayta Patel Samaj | Farming & Rural Growth Platform"
        />
        <meta
          name="twitter:description"
          content="Stay updated with mandi prices, farming guides, and village empowerment programs."
        />
        <meta name="twitter:image" content={`${siteUrl}/home.png`} />

        <link rel="canonical" href={`${siteUrl}`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

     {/* Hero Section */}
{/* Hero Section */}
<section className="relative h-[460px] flex items-center">
  <div className="absolute inset-0 z-0 sm:w-auto w-screen">
    <Image
      src="/about1.avif"
      alt="Rural farming landscape"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/60" />
  </div>

  <div className="container mx-auto px-4 z-10 mt-14 relative">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl text-white"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-4 glegoo">
        <span className="text-emerald-300 font-bold text-4xl md:text-4xl ">
          नायता पटेल नेटवर्क{" "}
        </span>{" "}
        – इत्तेहाद, तरक्की और खुशहाली की डिजिटल आवाज़।
      </h1>
      
      {user && (
        <p className="text-md font-semibold md:text-xl mb-8 ">
          अस्सलाम अलैकुम, <span className="text-emerald-300 font-bold">{user.fullname}</span> साहब! 
          अल्लाह आपके काम में बरकत दे। समाज की मजबूती और तरक्की के लिए हम सब साथ हैं।
        </p>
      )}
      
      {!user && (
        <p className="text-md font-semibold md:text-xl mb-8 glegoo">

                आपके लिए, आपके समाज के लिए। अब

                <span className="text-emerald-300 font-bold">

                  {" "}

                  नायता पटेल समाज

                </span>{" "}

                की खबरें, भाव अपडेट और योजनाएं एक ही जगह। बस एक छोटा सा

                रजिस्ट्रेशन और आप हमारे अपने डिजिटल परिवार का हिस्सा बन जाएंगे। </p>
      )}

      {!user ? (
       <Link href="/signup">
            <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-emerald-900/20 transition-all active:scale-95">
              अभी जुड़ें (Sign Up)
            </button>
          </Link>
      ) : (
        <div className="flex flex-col gap-3">
         <Link href="https://chat.whatsapp.com/IABp5obYWKEIMcHLVTDkNs" className="w-full sm:w-auto">
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-900/20 transition-all animate-bounce-subtle">
              <FaWhatsapp size={24} /> 
              WhatsApp ग्रुप ज्वाइन करें
            </button>
          </Link>
          <p className="text-sm text-green-400 font-medium">
            *इंशाअल्लाह, हर अपडेट मिलेगी सीधा आपके WhatsApp पर।
          </p>
        </div>
      )}
    </motion.div>
  </div>
  <div className="w-68 hidden sm:block top-0 right-0">
    <EventCubeSlider />
  </div>
</section>
      <CommunityCarousel doubledGallery={doubledGallery} />
      {/* --- Compact Community Section --- */}
      <section className="py-8 bg-emerald-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <div className="text-left">
              <h2 className="text-2xl font-bold">समाज के लिए योगदान</h2>
              <p className="text-emerald-200 text-sm">
                अपनी आवाज़ और अनुभव साझा करें
              </p>
            </div>

            {/* Horizontal Scrollable Grid for Mobile */}
            <div className="flex flex-wrap justify-center gap-4 pb-4 no-scrollbar -mx-4 px-4">
              {[
                {
                  title: "सुधार विचार",
                  desc: "वॉल पर पोस्ट करें",
                  icon: FaUsers,
                  link: "/wall",
                  color: "bg-emerald-500",
                },
                {
                  title: "सफलता की कहानी",
                  desc: "अपनी कहानी बताएं",
                  icon: FaBookOpen,
                  action: () => setIsStoryModalOpen(true),
                  color: "bg-blue-500",
                },
                {
                  title: "गाँव के एम्बेसडर",
                  desc: "मदद के लिए जुड़ें",
                  icon: FaMapMarkerAlt,
                  link: "/contact",
                  color: "bg-amber-500",
                },
                {
                  title: "शिक्षा मुहिम",
                  desc: "युवाओं को जोड़ें",
                  icon: FaCalendarAlt,
                  link: "/blog",
                  color: "bg-purple-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={item.action ? item.action : null}
                  className="flex-shrink-0 w-40 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm active:scale-95 transition-all"
                >
                  <div
                    className={`${item.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-emerald-200">{item.desc}</p>
                  {!item.action && (
                    <Link
                      href={item.link}
                      className="absolute inset-0 z-10"
                      aria-label={item.title}
                    ></Link>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaWhatsapp className="text-green-600" size={24} />
                </div>
                <p className="text-gray-800 font-bold text-sm">मैसेज भेजें</p>
              </div>
              <Link
                href="https://wa.me/917747074810"
                className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-bold active:bg-green-600"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tiles Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
            >
              हमारे प्लेटफ़ॉर्म को जानें
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              आपके लिए उपलब्ध हर फीचर और मददगार संसाधन एक्सप्लोर करें।
            </motion.p>
          </motion.div>

          {/* Two rows of scrollable tiles */}
          <div className="space-y-6">
            {/* First row */}
            <div className="overflow-x-auto flex md:flex-row flex-col pb-4 gap-4">
              <div className="flex space-x-4 min-w-max ">
                {navigationItems.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex-shrink-0"
                  >
                    <Link href={item.href}>
                      <div className="bg-white rounded-xl shadow-md  p-3 w-20 h-20 flex flex-col items-center justify-center border border-emerald-100 hover:shadow-lg transition-all duration-300">
                        <item.icon className="text-emerald-600 text-xl mb-1" />
                        <span className="text-black font-medium text-center">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex space-x-4 min-w-max">
                {navigationItems.slice(5).map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex-shrink-0"
                  >
                    <Link href={item.href}>
                      <div className="bg-white rounded-xl shadow-md p-3 w-20 h-20 flex flex-col items-center justify-center border border-emerald-100 hover:shadow-lg transition-all duration-300">
                        <item.icon className="text-emerald-600 text-xl mb-1" />
                        <span className="text-black font-medium text-center">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Second row */}
            {/* <div className="overflow-x-auto hidden pb-4">
              <div className="flex space-x-4 min-w-max">
                {navigationItems.slice(5).map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex-shrink-0"
                  >
                    <Link href={item.href}>
                      <div className="bg-white rounded-xl shadow-md p-6 w-40 h-40 flex flex-col items-center justify-center border border-emerald-100 hover:shadow-lg transition-all duration-300">
                        <item.icon className="text-emerald-600 text-3xl mb-3" />
                        <span className="text-black font-medium text-center">{item.name}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>
     <section className="container mx-auto px-4">
        <VillageSection priceData={priceData} />
      </section>

      {/* News Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
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
              ताज़ा समाचार
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              नायता पटेल समाज और आसपास के क्षेत्रों की नवीनतम खबरें और अपडेट्स
            </motion.p>
          </motion.div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((newsItem, index) => (
              <motion.div
                key={newsItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/news/${newsItem._id}`}>
                  <div className="relative h-48 w-full">
                    {newsItem.image?.url ? (
                      <Image
                        src={newsItem.image.url}
                        alt={newsItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                        <FaNewspaper className="text-emerald-400 text-4xl" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {newsItem.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <FaEye className="mr-1" />
                      <span>{newsItem?.views || 0}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <div className="flex items-center mr-3">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{newsItem?.location}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>
                          {new Date(newsItem?.publish_date).toLocaleDateString(
                            "hi-IN",
                          )}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                      {newsItem?.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {newsItem?.content?.replace(/\*/g, "")}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-600 font-medium">
                        और पढ़ें
                      </span>
                      {newsItem.publisher?.fullname && (
                        <span className="text-xs text-gray-500">
                          {newsItem.publisher.fullname}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All News Button */}
          <div className="text-center mt-10">
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              View All News
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

 
      {/* Event section */}
      <section className="relative w-full h-full sm:hidden flex items-center justify-center py-12 p-12 flex-col">
        <div className="absolute inset w-full h-28 shidden z-0 bottom-0 left-0">
          <img src="./bg2.jpg" alt="" />
        </div>
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
            आगामी कार्यक्रम
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700">
            सीखें, जुड़ें और एक साथ बढ़ें! कृषि प्रशिक्षण से लेकर समाज के
            कार्यक्रमों तक - हर किसी के लिए है खास आयोजन।{" "}
          </motion.p>
        </motion.div>
        <div className="w-76 sm:h-96 h-[430px] ">
          <EventCubeSlider />
        </div>
        <div className="text-center mt-10 z-20">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            View All Events
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Welcome Card */}
      {showWelcomeCard && user?.status === "verified" && (
        <WelcomeCard
          user={userData}
          onClose={() => {
            setShowWelcomeCard(false);
            localStorage.setItem("hasSeenWelcome", "true");
          }}
        />
      )}
      <AdSection />
      {/* Top Posts Carousel */}
      <section className="py-16 mt-6 bg-gray-50">
        <div className="container mx-auto px-4">
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
              समाज की आवाज़
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              यहाँ आपकी आवाज़ सुनी जाती है! हमारे सदस्यों द्वारा लिखे गए विचार,
              सफलता की कहानियाँ और गाँव की प्रगति के समाचार देखें। अपनी राय साझा
              करें और समुदाय का हिस्सा बनें – क्योंकि साथ मिलकर हम अधिक मजबूत
              हैं!
            </motion.p>
          </motion.div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {posts
              .filter((item) => item.verificationStatus === "verified")
              .slice(0, 6)
              .map((post) => (
                <SwiperSlide key={post._id} className="pb-4 mb-6">
                  <Link href={`/wall/${post._id}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg shadow-md p-6 h-full"
                    >
                      <div className="flex items-center mb-4">
                        <Image
                          src={
                            post?.user?.profilepic?.url || "/placeholder.svg"
                          }
                          alt={post.user?.fullname}
                          width={40}
                          height={40}
                          className="rounded-full bg-amber-500 h-10 w-10"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">
                            {post?.user?.fullname}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {post?.village}
                          </p>
                        </div>
                      </div>
                      <p className="mb-4 text-gray-700 line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex items-center text-gray-500">
                        <FaHeart className="text-red-500 mr-1" />
                        <span>{post?.likes?.length} likes</span>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/wall"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            View All Posts
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
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
              हमारे समाज के लिए ब्लॉग
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              ज्ञान का खजाना: जानिए आपके गाँव और समाज की ताज़ा खबरें, प्रेरक
              कहानियाँ और उपयोगी जानकारी!
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <Link href={`/blog/${blog._id}`} className="flex-grow">
                  <div className="relative h-48 w-full ">
                    <Image
                      src={blog?.image?.url || "/blog-placeholder.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20" />
                  </div>

                  <div className="px-3 py-4">
                    <div className="flex items-center text-sm text-gray-500 mb-5">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="line-clamp-1">
                        {formatDate(blog.date)}
                      </span>
                    </div>

                    <h3 className="text-xl yatra font-semibold my-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 laila mb-4 line-clamp-4 mask-b-from-75%">
                      {formatContent(blog.content)}
                    </p>

                    <div className="flex items-center text-emerald-600 font-medium">
                      Read more
                      <FaArrowCircleRight className="ml-2" size={14} />
                    </div>
                  </div>
                </Link>

                {/* Social Sharing Buttons */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Share:</span>
                  <div className="flex space-x-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=Check out this blog: ${blog.title} ${window.location.origin}/blog/${blog._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-600 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp size={20} />
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blog/${blog._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebook size={20} />
                    </a>

                    {/* Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        blog.title,
                      )}&url=${window.location.origin}/blog/${blog._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${
                        window.location.origin
                      }/blog/${blog._id}&title=${encodeURIComponent(
                        blog.title,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              View All Blogs
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* Pehchan Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
              अपने काम से चमकते नाम
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              हमारे समाज के प्रेरणादायक लोगों की कहानियाँ जो अपने काम से अपनी
              पहचान बना रहे हैं
            </motion.p>
          </motion.div>

          {/* Scrollable Pehchan Cards */}
          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-6 min-w-max px-4">
              {featuredPehchans.map((pehchan, index) => (
                <motion.div
                  key={pehchan._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex-shrink-0 w-72"
                >
                  <Link href={`/pehchan/${pehchan._id}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative h-48 w-full">
                        {pehchan.image?.url ? (
                          <Image
                            src={pehchan.image.url}
                            alt={pehchan.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                            <FaTractor className="text-emerald-400 text-4xl" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {pehchan.category}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-xl font-bold text-emerald-800 mb-2 line-clamp-1">
                          {pehchan.name}
                        </h3>
                        <p className="text-emerald-600 font-semibold mb-3">
                          {pehchan.profession}
                        </p>

                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <div className="flex items-center mr-3">
                            <FaMapMarkerAlt className="mr-1" />
                            <span>{pehchan.village}</span>
                          </div>
                          {pehchan.views && (
                            <div className="flex items-center">
                              <FaEye className="mr-1" />
                              <span>{pehchan.views}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {pehchan.story?.replace(/\*/g, "")}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-600 font-medium">
                            पूरी कहानी पढ़ें
                          </span>
                          {pehchan.likes && (
                            <div className="flex items-center text-xs text-gray-500">
                              <FaHeart className="text-red-500 mr-1" />
                              <span>{pehchan.likes.length || 0}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All Pehchan Button */}
          <div className="text-center mt-10">
            <Link
              href="/pehchan"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              View All Stories
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* Success Stories */}

      {/* --- Story Modal Component --- */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10">
              <h3 className="text-lg font-bold text-emerald-800">
                सफलता की कहानी
              </h3>
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6">
              {!user ? (
                <div className="text-center py-8">
                  <FiBook className="mx-auto text-5xl text-emerald-200 mb-4" />
                  <p className="text-gray-600 mb-6 font-medium">
                    कहानी साझा करने के लिए लॉग इन आवश्यक है
                  </p>
                  <Link
                    href="/signup"
                    className="block w-full bg-emerald-600 text-white py-3 rounded-xl font-bold"
                  >
                    Log In
                  </Link>
                </div>
              ) : isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    सबमिट हो गया!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    आपकी प्रेरक कहानी की समीक्षा के बाद प्रकाशित की जाएगी।
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setIsStoryModalOpen(false);
                    }}
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-bold"
                  >
                    बंद करें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      आपका नाम
                    </label>
                    <div className="relative mt-1">
                      <FiUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      आपका गाँव
                    </label>
                    <div className="relative mt-1">
                      <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.village}
                        onChange={(e) =>
                          setFormData({ ...formData, village: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="Village Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      कहानी (विस्तार में)
                    </label>
                    <textarea
                      required
                      rows={5}
                      minLength={100}
                      value={formData.story}
                      onChange={(e) =>
                        setFormData({ ...formData, story: e.target.value })
                      }
                      className="w-full mt-1 p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-black"
                      placeholder="हमें बताएं कि आपने कैसे सफलता हासिल की... (कम से कम 100 शब्द)"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "सबमिट हो रहा है..."
                    ) : (
                      <>
                        <FiSend /> सबमिट करें
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const CommunityCarousel = ({ doubledGallery }) => {
  const getTagColor = (cat) => {
    // Apne categories ke matching names yahan check karein
    if (
      cat?.includes("Gaon") ||
      cat?.includes("आपका गाँव") ||
      cat?.includes("गाँव")
    )
      return "bg-amber-500/20";
    if (cat === "News" || cat === "समाचार") return "bg-red-500/20";
    if (cat === "Ambassador" || cat === "एम्बेसडर") return "bg-purple-500/20";
    if (cat === "Story" || cat === "कहानी") return "bg-blue-500/20";
    return "bg-emerald-600/20";
  };

  return (
    <div className="py-8 bg-white overflow-hidden relative border-y border-gray-100">
      {/* Header Section */}
      <div className="px-6 mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-black font-bold text-xl glegoo">
            समाज की झलकियां
          </h3>
          <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1"></div>
        </div>
        <span className="text-amber-500 text-xs font-medium animate-pulse">
          ● Live Feed
        </span>
      </div>

      {/* Animation Container */}
      <div className="flex relative w-full">
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {doubledGallery?.map((item, index) => (
            <Link href={item.link || "#"} key={index}>
              <div className="flex-shrink-0 w-44 h-56 rounded-3xl overflow-hidden relative group border border-gray-200 shadow-xl active:scale-95 transition-transform bg-gray-100">
                {/* --- Simple HTML Image Tag --- */}
                <img
                  src={item.url}
                  alt={item.label}
                  loading="lazy" // Sirf screen ke paas aane par load hogi (Data save karega)
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Top Category Tag */}
                <div className="absolute top-3 left-3 z-20">
                  <span
                    className={`${getTagColor(item.category)} text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-lg shadow-lg backdrop-blur-sm`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 z-20 flex items-end p-4">
                  <p className="text-white text-xs font-semibold leading-tight line-clamp-2 drop-shadow-md">
                    {item.label}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Fades - White background ke liye from-white use kiya he */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-white via-white/50 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-white via-white/50 to-transparent z-30 pointer-events-none" />
      </div>
    </div>
  );
};
