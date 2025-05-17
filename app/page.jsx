"use client";
import { useState, useEffect } from "react";
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
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import { usePatel } from "../components/patelContext";
import Head from "next/head";

// Sample data

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { blogs, formatDate, user, stories, posts, siteUrl } =
    usePatel();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        <meta property="og:image" content={`${siteUrl}/v2.avif`} />

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
        <meta name="twitter:image" content={`${siteUrl}/v2.avif`} />

        <link rel="canonical" href={`${siteUrl}`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0 z-0 sm:w-auto w-screen">
          <Image
            src="/hom4.jpeg"
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
      </section>

      {/* Top Posts Carousel */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Community Posts
          </h2>

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
            className="pb-12 mb-6"
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
                    <p className="mb-4 text-gray-700  line-clamp-4">
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
      </section>

      {/* Upcoming Events */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What's Happening in Our Gaon?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    {event.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    <FaMapMarkerAlt className="inline mr-2" />
                    {event.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 */}
      {/* Featured Blogs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Blogs for Our Community
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest news, stories, and updates from our community
            </p>
          </div>

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
          <div className="mb-5 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center ">
              Stories From Our Nayata Patel Community
            </h2>
            <p className="text-gray-600 text-center  max-w-2xl mx-auto">
              Discover the latest stories from our community
            </p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {stories.slice(0, 3).map((story, index) => (
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

      {/*      
<section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">Latest Mandi Prices</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Real-time agricultural commodity prices from major mandis across India
      </p>
    </div>

    <div className="flex overflow-x-auto pb-2 mb-6 justify-center">
      {['ujjain', 'indore', 'bhopal', 'neemuch', 'mandsaur','dhar'].map((mandi) => (
        <button
          key={mandi}
          className={`px-4 py-2 mx-1 rounded-lg capitalize font-medium ${
            activeMandi === mandi
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setMandi(mandi)}
        >
          {mandi}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay:  0.1 }}
          whileHover={{ y: -5 }}
          className="relative bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-xl mb-1 hidden capitalize">
                
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {activeMandi?.mandiName}, {activeMandi?.state}
              </p>
            </div>
            <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
              Grain
            </div>
          </div>
          {['gram','wheat','soyabean','alsi','sarso','mungfali'].map((name,index)=>(
            <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current:</span>
              <span className="text-lg font-bold">₹{activeMandi?.prices?.grain[name].currentPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Min:</span>
              <span>₹{activeMandi?.prices?.grain[name].minPrice || 'NA'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Max:</span>
              <span>₹{activeMandi?.prices?.grain[name].maxPrice || 'NA'}</span>
            </div>
            <div className="absolute top-4 right-4">
            {getCommodityIcon(activeMandi?.prices?.grain[name])}
          </div>
          </div>

          ))}
          
          
        </motion.div>
    </div>

    <div className="text-center mt-8">
      <Link href="/prices">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          View All Prices
        </motion.button>
      </Link>
    </div>
  </div>
</section> */}
    </div>
  );
}
