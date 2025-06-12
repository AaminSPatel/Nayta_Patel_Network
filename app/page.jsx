"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination  } from "swiper/modules";
import {
  FaHeart,
  FaArrowRight,
  FaArrowCircleRight,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import Head from "next/head";
import { usePatel } from "../components/patelContext.js";
import EventCubeSlider from "../components/eventSection.jsx";
import ComplimentCardsSlider from "../components/cardSlider.jsx";
import Poster from "../components/poster.jsx";
import AdvertisementVideo from "../components/PromotionalVideo.jsx";
import Posters from "../components/posters.jsx";
import VillageSection from "../components/villageSection.jsx";
import WelcomeCard from "../components/welcomeCard.jsx";
import "swiper/css/effect-coverflow";
import NayataPatelCard from "../components/poster.jsx";
import PromotionalPosters from "../components/posters.jsx";
import ResponsiveCommunityCards from "../components/cardSlider2.jsx";




// Sample data
 
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { blogs, formatDate, user, stories, posts, siteUrl,prices,showWelcomeCard,setShowWelcomeCard} =
    usePatel();
const [priceData,setPriceData] = useState([])
  useEffect(() => {
    setMounted(true);
  }, []);

   const [userData,setUserData] = useState({})
useEffect(()=>{
  if(user)
  setUserData(user)
}, [user])
useEffect(()=>{
  if(prices){
    
      if(!prices || !prices[0]?.prices?.grain){

      } 
      else{
        
      const result = []
      const categoryData = prices[0].prices.grain

      Object.entries(categoryData).forEach(([itemName,itemData])=>{
         if (typeof itemData === "object" && !itemData.currentPrice) {
        Object.entries(itemData).forEach(([subItemName, subItemData]) => {
          result.push({
            name: `${itemName} (${subItemName.replace(/_/g, " ")})`,
            ...subItemData,
          })
        })
      } else {
        // Handle simple items
        result.push({
          name: itemName.replace(/_/g, " "),
          ...itemData,
        })
      }
      })
      //console.log('Data of prices',result);
      
    setPriceData(result)
      }
      
  }

}, [prices])
  if (!mounted) return null;

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
    <div className="flex flex-col max-w-[96vw]">
      <Head>
        <title>
          Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP
        </title>
        <meta charset="UTF-8" />
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
   {/*    This is Logo section */}
{/* <section className="relative w-screen h-screen flex items-center justify-center flex-col">
  <img src="./tactor.png" className="h-44" alt="" />
  <h1 className="font-extrabold text-5xl pb-1 pt-2 text-emerald-900 pragati">
    नायता पटेल नेटवर्क
  </h1>
  <h3  className="font-semibold text-2xl pragati flex gap-1">

  शिक्षा, खेती और समाज का विकास <span className=" text-emerald-700"><GiWheat /></span>
  </h3>

</section> */}

      {/* Hero Section */}
      <section className="relative  h-[450px] flex items-center">
        <div className="absolute inset-0 z-0 sm:w-auto w-screen">
          <Image
            src="/prices.avif"
            alt="Rural farming landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
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
              – हमारी ग्रामीण शक्ति की डिजिटल आवाज़।
              {/* Apna Gaon – Digital Voice of Our Rural Power */}
            </h1>
            {user && <p className="text-md font-semibold md:text-xl mb-8 ">
              सच्ची खबरें, स्मार्ट तकनीक और सही बाज़ार की मदद से
              <span className="text-emerald-300 font-bold">
                {" "}
                नायता पटेल समाज
              </span>{" "}
              को आगे बढ़ाने की एक मजबूत शुरुआत।
            </p>}
         { !user &&  <p className="text-md font-semibold md:text-xl mb-8 glegoo">
              आपके लिए, आपके समाज के लिए। अब 
              <span className="text-emerald-300 font-bold">
                {" "}
                नायता पटेल समाज
              </span>{" "}
              की खबरें, भाव अपडेट और योजनाएं एक ही जगह। बस एक छोटा सा
              रजिस्ट्रेशन और आप हमारे अपने डिजिटल परिवार का हिस्सा बन जाएंगे।
            </p>}

            {!user && (
              <Link href="/signup">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-md text-base md:text-lg font-medium transition-colors">
                  Join Now
                </button>
              </Link>
            )}
          </motion.div>
        </div>
        <div className="w-68 hidden sm:block top-0 right-0">
          <EventCubeSlider />
        </div>
        
      </section>
      
     <section className="w-full h-full sm:hidden flex items-center justify-center py-12 p-12 flex-col">
    
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
              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-700"
              >
    सीखें, जुड़ें और एक साथ बढ़ें! कृषि प्रशिक्षण से लेकर समाज के कार्यक्रमों तक - हर किसी के लिए है खास आयोजन। </motion.p>
            </motion.div>
      <div className="w-76 sm:h-96 h-[430px] ">
          <EventCubeSlider />
          
        </div>
         <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              View All Events
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
     </section>
 {/*     <AdvertisementVideo /> 
     <NayataPatelCard /> */} 
     <PriceSection priceData={priceData}/>

      {/* Welcome Card */}
      {showWelcomeCard && (
        <WelcomeCard 
          user={userData} // Pass your user object
          onClose={() => {
            setShowWelcomeCard(false)
            localStorage.setItem('hasSeenWelcome', 'true')
          }}
        />
      )}
     <section className="container mx-auto px-4">

     <VillageSection priceData={priceData}/>
     </section>


      {/* Top Posts Carousel */}
      <section className="py-16 bg-gray-50">
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
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700"
          >
यहाँ आपकी आवाज़ सुनी जाती है! हमारे सदस्यों द्वारा लिखे गए विचार, सफलता की कहानियाँ और गाँव की प्रगति के समाचार देखें। अपनी राय साझा करें और समुदाय का हिस्सा बनें – क्योंकि साथ मिलकर हम अधिक मजबूत हैं!
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
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md p-6 h-full"
                  >
                    <div className="flex items-center mb-4">
                      <Image
                        src={post?.user?.profilepic?.url || "/placeholder.svg"}
                        alt={post.user?.fullname}
                        width={40}
                        height={40}
                        className="rounded-full bg-amber-500 h-10 w-10"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium">{post?.user?.fullname}</h3>
                        <p className="text-sm text-gray-500">{post?.village}</p>
                      </div>
                    </div>
                    <p className="mb-4 text-gray-700  line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex items-center text-gray-500">
                      <FaHeart className="text-red-500 mr-1" />
                      <span>{post?.likes?.length} likes</span>
                    </div>
                  </motion.div>
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
      <section className="py-16  bg-gray-50">
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
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700"
          >
ज्ञान का खजाना: जानिए आपके गाँव और समाज की ताज़ा खबरें, प्रेरक कहानियाँ और उपयोगी जानकारी!
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

                    <h3 className="text-xl  yatra font-semibold my-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 laila mb-4 line-clamp-4 mask-b-from-75%">
                      {blog.content}
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
                        blog.title
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
                        blog.title
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

      {/* Success Stories */}
      <section className="py-12 bg-gray-50">
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
            सफलता की प्रेरक कहानियाँ
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700"
          >
हमारे नायता पटेल समाज के सदस्यों के जीवन में आए वास्तविक बदलाव और प्रगति की गाथाएँ। ये कहानियाँ न सिर्फ प्रेरणा देती हैं, बल्कि सामूहिक प्रयासों से गाँवों में आए ऐतिहासिक परिवर्तन की मिसाल भी पेश करती हैं।          </motion.p>
        </motion.div>
          <div className="flex flex-wrap gap-8 justify-center">
            {stories.filter((item)=> item.status ==='Published').slice(0, 3).map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-4 py-6 w-full sm:w-72"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={story?.image?.url || "/placeholder.svg"}
                    alt={story?.title}
                    width={80}
                    height={80}
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium line-clamp-2">{story?.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {story?.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-6">
                  {story?.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/stories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            View All Stories
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
  
      
    </div>
  );
}

/* import { motion } from "framer-motion";
import Link from "next/link";
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      ease: "easeOut",
    },
  },
};

const PriceSection = ({ priceData }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Heading and Description */}
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
            आज के मंडी भाव
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700">
            संपूर्ण मंडी भाव: पूरे भारत की कृषि मंडियों के लाइव भाव, एक क्लिक में!
          </motion.p>
        </motion.div>

        {/* Swiper with Grab Cursor and Auto-scroll */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1} // Default for mobile
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            modules={[Autoplay, Pagination]}
            className="w-auto"
          >
            {priceData.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center pb-10 items-center px-10 max-w-full">
                <motion.div variants={itemVariants}>
                  <PriceCard item={item} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <Link href="/prices" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
            >
              View Price Charts
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const PriceCard = ({ item }) => {
  const priceChange =
    item.currentPrice && item.previousPrice
      ? (((item.currentPrice - item.previousPrice) / item.previousPrice) * 100)
      : null;

  // Get product icon based on name
  const getProductIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('soyabean')) return '🌱';
    if (lowerName.includes('wheat')) return '🌾';
    if (lowerName.includes('gram') || lowerName.includes('chana')) return '🟤';
    if (lowerName.includes('mungfali')) return '🥜';
    if (lowerName.includes('alsi')) return '🫘';
    return '🌿'; // Default icon
  };

  // Format name with proper capitalization
  const formatName = (name) => {
    let formatted = name.toLowerCase();
    formatted = formatted.replace(/\bgram\b/g, "चना");
    formatted = formatted.replace(/\bdaler\b/g, "डालर");
    formatted = formatted.replace(/\bbitki\b/g, "काबुली");
    formatted = formatted.replace(/\bkala\b/g, "काला");
    formatted = formatted.replace(/\bnew\b/g, "नया");
    formatted = formatted.replace(/\balsi\b/g, "अलसी");
    formatted = formatted.replace(/\bsarso\b/g, "सरसो");
    formatted = formatted.replace(/\bsoyabean\b/g, "सोयाबीन");
    formatted = formatted.replace(/\bwheat\b/g, "गेंहू");
    formatted = formatted.replace(/\bmungfali\b/g, "मुंगफली");
    // Capitalize first letter of each word
    return formatted.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="bg-white md:w-72 w-full h-32 py-6 min-w-48 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{getProductIcon(item.name)}</span>
        <h3 className="text-md font-semibold border-b-emerald-400 border-b pb-2 flex-1">
          {formatName(item.name)}
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Price:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">₹{item.currentPrice}</span>
            {priceChange && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  priceChange > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {priceChange > 0 ? `+${priceChange.toFixed(1)}%` : `${priceChange.toFixed(1)}%`}
              </span>
            )}
          </div>
        </div>

        {item.previousPrice && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Previous Price:</span>
            <span>₹{item.previousPrice}</span>
          </div>
        )}
      </div>
    </div>
  );
};

