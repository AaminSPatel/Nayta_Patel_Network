"use client"
import { useParams, useRouter } from 'next/navigation';
import { FaTimes, FaChevronLeft, FaChevronRight, FaShare, FaEye, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePatel } from '../../../components/patelContext';
import Head from 'next/head';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
//import moment from "moment"; // for formatting date


export default function NewsDetail() {
  const params = useParams();
  const router = useRouter();
  const newsId = params?.id ? params.id : null;
  const [showShareOptions, setShowShareOptions] = useState(false);
const {news, path,formatContent} = usePatel()
  const selectedNews = news.find(news => news._id === newsId);
const similarNews = news.filter(
  item =>
    item._id !== selectedNews?._id &&
    (item.category === selectedNews?.category ||
     item.location === selectedNews?.location)
);

 useEffect(() => {
    if (!newsId && path === 'http://localhost:5000') return;
    // Create a unique identifier for this view attempt
    //const viewKey = `news-view-${newsId}`;
    // Check if we've already tried to count this view
   // if (sessionStorage.getItem(viewKey)) return;
    const timer = setTimeout(async () => {
      try {
        // Mark this view attempt as started
        //sessionStorage.setItem(viewKey, 'true');
        
        // Send the view update request
        const response = await fetch(path + `/api/news/viewUpdate/${newsId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          // No need to send IP from client - get it from the server
        });

        if (!response.ok) {
          // If failed, remove the marker so we can try again
          //sessionStorage.removeItem(viewKey);
          console.log('not good');
          
        }
        console.log('good');
        

      } catch (error) {
        console.error('Error updating view count:', error);
       //sessionStorage.removeItem(viewKey);
      }
    }, 5000); // 5 second delay

    // Cleanup function to cancel the timer if component unmounts
    return () => clearTimeout(timer);
  }, [newsId]);

  const handleShare = (platform) => {
    const shareUrl = `${window.location.origin}/news/${newsId}`;
    const message = `Check out this news: ${selectedNews?.title} : ${selectedNews?.content?.substring(0, 190)}...`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
    }
    setShowShareOptions(false);
  };

  if (!selectedNews) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">News not found!</p>
      </div>
    );
  }
  const pageTitle = `${selectedNews?.title} - नायता पटेल नेटवर्क | Nayta Patel Network`;
  const metaDescription = `${selectedNews?.content?.substring(0, 160)}...`; // First 160 chars of content
  const canonicalUrl = `${path}/news/${selectedNews._id}`;
  const imageUrl = selectedNews?.image?.url;

  return (
    <div className=" mb-12 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 ">
       <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${selectedNews.title} | नायता पटेल समाज`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Nayta Patel Network" />
      <meta property="article:published_time" content={new Date(selectedNews?.publish_date).toISOString()} />
      <meta property="article:author" content={selectedNews?.publisher?.fullname || "Nayta Patel Samaj"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={selectedNews?.publisher?.fullname || "Nayta Patel Samaj"} />
      <meta name="twitter:label2" content="Views" />
      <meta name="twitter:data2" content={selectedNews?.views?.toString() || "100+"} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": selectedNews.title,
          "description": metaDescription,
          "image": imageUrl,
          "datePublished": new Date(selectedNews?.publish_date).toISOString(),
          "dateModified": new Date(selectedNews?.publish_date).toISOString(),
          "author": {
            "@type": "Person",
            "name": selectedNews?.publisher?.fullname || "Nayta Patel Samaj"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Nayta Patel Network",
            "logo": {
              "@type": "ImageObject",
              "url": `${path}/logo1.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        })}
      </script>

      {/* Additional SEO Tags */}
      <meta name="keywords" content={`${selectedNews.title}, नायता पटेल समाज, Nayta Patel news, ${selectedNews?.publisher?.fullname}, Patel community updates`} />
      <meta name="news_keywords" content={`Nayta Patel, ${selectedNews.title}, Patel Samaj news`} />
      <meta name="robots" content="index, follow" />
    </Head>
      <motion.div
        className="bg-white  rounded-xl shadow-2xl max-w-4xl w-full overflow-y-auto relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        {/* Close Button */}
        <button
          onClick={() => router.push('/news')}
          className="absolute top-0 right-4 bg-red-500 text-white p-2 rounded-full z-10 hover:bg-red-600 transition"
        >
          <FaTimes />
        </button>


        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          {selectedNews?.category}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-8">
          <img
            src={selectedNews?.image?.url}
            alt={selectedNews?.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <div className="flex  justify-between gap-4 sm:text-sm text-xs text-gray-500  mb-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{selectedNews?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>{new Date(selectedNews?.publish_date).toLocaleDateString('en-IN')}</span>
            </div>
            </div>
            <div className="flex items-center gap-2  bg-orange-300 px-3 py-1 rounded-full">
              <FaUser />
              <span>{selectedNews?.publisher?.fullname}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-6">
            {selectedNews?.title}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-3 sm:mb-8">
            {formatContent(selectedNews?.content)}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200 ">
            <div className="flex items-center gap-2 text-gray-500 ">
              <FaEye />
              <span>{selectedNews?.views} views</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
              >
                <FaShare />
                <span>Share</span>
              </button>

              {showShareOptions && (
                <motion.div
                  className="absolute bottom-full right-0 mb-2 bg-white  shadow-lg rounded-lg p-2 z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center gap-2 p-2 hover:bg-green-50  rounded"
                    >
                    <FaWhatsapp />
                      {/* <span>WhatsApp</span> */}
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 p-2 hover:bg-blue-50  rounded"
                    >
                        <FaFacebook/>
                      {/* <span>Facebook</span> */}
                    </button>
                    <button
                      onClick={() => handleShare('telegram')}
                      className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded"
                    >
                        <FaTelegram/>
                      {/* <span>Telegram</span> */}
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded"
                    >
                        <FaTwitter />
                     {/*  <span>Twitter</span> */}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
     {similarNews.length > 0 && (
  <RecommendedNews news={news} currentId={params.id} />
)}


      </motion.div>
      
    </div>
  );
}

const RecommendedNews = ({ news, currentId }) => {
  const router = useRouter();
 const {formatDate} = usePatel()
  const selectedNews = news.find((n) => n._id === currentId);
  const similarNews = news.filter(
    (item) =>
      item._id !== currentId &&
      (item.category === selectedNews?.category ||
        item.location === selectedNews?.location)
  );

  if (!similarNews.length) return null;

  return (
    <div className="mt-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔁 सिफारिश की गई खबरें
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {similarNews.map((item) => (
          <SwiperSlide key={item._id}>
            <div
              onClick={() => router.push(`/news/${item._id}`)}
              className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={item.image?.url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600">📍 {item.location}</p>
                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide >
            <div
              onClick={() => router.push(`/news`)}
              className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
             
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    All News
                  </span>
                  <span>Everyday</span>
                </div>
                <p className="text-sm text-gray-600"> Nayta Patel Network Par Sabhi News Padiye.</p>
                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                 📍 Nayta Patel Network
                </h3>
              </div>
            </div>
          </SwiperSlide>
      </Swiper>
    </div>
  );
};

