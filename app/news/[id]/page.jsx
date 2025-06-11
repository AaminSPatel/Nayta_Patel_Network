"use client"
import { useParams, useRouter } from 'next/navigation';
import { FaTimes, FaChevronLeft, FaChevronRight, FaShare, FaEye, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePatel } from '../../../components/patelContext';

// Demo News Data
const demoNews = [
  {
    id: 1,
    title: "How AI is Transforming Agriculture in Rural India",
    category: "Technology",
    location: "Mumbai, India",
    date: "2024-05-15",
    publisher: "John Doe",
    views: 1245,
    image: "/ai-farming.jpg",
    fullContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    title: "New Education Policy: What Students Need to Know",
    category: "Education",
    location: "Delhi, India",
    date: "2024-05-10",
    publisher: "Jane Smith",
    views: 892,
    image: "/education-policy.jpg",
    fullContent: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 3,
    title: "Sustainable Farming Practices for Small Farmers",
    category: "Agriculture",
    location: "Pune, India",
    date: "2024-04-28",
    publisher: "Ramesh Patel",
    views: 1567,
    image: "/sustainable-farming.jpg",
    fullContent: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  },
  {
    id: 4,
    title: "Rural Healthcare: Challenges and Solutions",
    category: "Health",
    location: "Bangalore, India",
    date: "2024-04-20",
    publisher: "Dr. Anjali Rao",
    views: 2043,
    image: "/rural-healthcare.jpg",
    fullContent: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
  }
];

export default function NewsDetail() {
  const params = useParams();
  const router = useRouter();
  const newsId = params?.id ? params.id : null;
  const [showShareOptions, setShowShareOptions] = useState(false);
const {news, path} = usePatel()
  const selectedNews = news.find(news => news._id === newsId);

 useEffect(() => {
    if (!newsId) return;

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
    const message = `Check out this news: ${selectedNews?.title}`;

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

  return (
    <div className=" mb-12 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 ">
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
          {selectedNews.category}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-8">
          <img
            src={selectedNews.image}
            alt={selectedNews.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <div className="flex  justify-between gap-4 sm:text-sm text-xs text-gray-500  mb-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{selectedNews.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>{new Date(selectedNews.publish_date).toLocaleDateString('en-IN')}</span>
            </div>
            </div>
            <div className="flex items-center gap-2  bg-orange-300 px-3 py-1 rounded-full">
              <FaUser />
              <span>{selectedNews?.publisher?.fullname}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-6">
            {selectedNews.title}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-3 sm:mb-8">
            {selectedNews.content}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200 ">
            <div className="flex items-center gap-2 text-gray-500 ">
              <FaEye />
              <span>{selectedNews.views} views</span>
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
      </motion.div>
    </div>
  );
}