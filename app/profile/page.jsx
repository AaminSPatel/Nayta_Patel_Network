"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiEdit2,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiFileText,
  FiStar,
  FiHeart,
  FiChevronDown,
  FiChevronUp,
  FiCalendar,
  FiEye,
} from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import ProfileHeader from "./profile-header";
import SettingsSection from "./settings-section";
import VillageDetails from "./village-details";
import { usePatel } from "../../components/patelContext";
import AmbassadorPortal from "../../components/AmbassadorPortal";
import EditProfileModal from "./edit-profile-modal";
import Head from "next/head";
import Link from "next/link";
import PostCard from "../../components/postCard";

// Posts Section Component
const PostsSection = ({ userData, posts, comments, likes }) => {
  const [expandedComments, setExpandedComments] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});

  // Filter posts by current user
  const userPosts =
    posts?.filter((post) => post.user._id === userData._id) || [];

  const { timeAgo, setPosts, user, path } = usePatel();
  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (userPosts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="mb-4">
          <FiFileText className="mx-auto text-6xl text-gray-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Posts Yet
        </h3>
        <p className="text-gray-500">
          Start sharing your thoughts with the community!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          My Posts ({userPosts.length})
        </h3>
        <div className="text-sm text-gray-500">
          Total engagement:{" "}
          {userPosts.reduce((acc, post) => acc + (post.likes?.length || 0), 0)}{" "}
          likes
        </div>
      </div>

      <div className="space-y-6">
        {userPosts.map((post, index) => {
          /*      const postComments = getPostComments(post._id)
          const postLikes = getPostLikes(post._id)
          const isCommentsExpanded = expandedComments[post._id]
          const isPostExpanded = expandedPosts[post._id]
          const shouldTruncate = post.content.length > 200
 */
          return (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard
                post={post}
                user={user}
                timeAgo={timeAgo}
                allComments={comments}
                apiPath={path}
                onPostUpdate={handlePostUpdate}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, siteUrl, villages, likes, posts, comments } = usePatel();
  const [loading, setLoading] = useState(true);
  const [villageData, setVillageData] = useState({});
  const [userData, setUserData] = useState({
    _id: "",
    fullName: "John Doe",
    email: "",
    visibilityStatus: null,
    role: "",
    mobile: "",
    village: "",
    profilePic: "",
    posts: 0,
    comments: 0,
    likes: 0,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        _id: user._id,
        fullName: user.fullname,
        email: user.email,
        mobile: user.mobile,
        village: user.village,
        createdAt: user.createdAt,
        visibilityStatus: user.visibilityStatus,
        role: user.role,
        profilePic: user.profilepic?.url,
        posts: 0,
        comments: 0,
        likes: 0,
      });

      if (likes && posts && comments) {
        setUserData((prev) => ({
          ...prev,
          posts: posts.filter((item) => item.user._id === user._id).length,
          comments: comments.filter((item) => item?.user?._id === user._id)
            .length,
          likes: posts
            .filter((post) => post.user._id === user._id)
            .reduce(
              (totalLikes, post) => totalLikes + (post.likes?.length || 0),
              0
            ),
        }));
        console.log(comments, "Comments");
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user, likes, comments, posts]);

  useEffect(() => {
    if (villages && user) {
      const filterVillage = villages.filter(
        (item) => item.name === user.village
      );
      setVillageData(filterVillage[0]);
    }
  }, [villages, user]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  function handleUserUpdate(newuser) {
    setUserData({
      _id: newuser._id,
      fullName: newuser.fullname,
      createdAt: newuser.createdAt,
      email: newuser.email,
      mobile: newuser.mobile,
      village: newuser.village,
      role: newuser.role,
      profilePic: newuser.profilepic?.url,
      posts: newuser.posts.length,
      comments: newuser.comments.length,
      likes: newuser.likes.length,
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-ping h-24 w-24 rounded-full bg-emerald-100 opacity-75"></div>
              </div>
              <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white border-2 border-emerald-500 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
            कृपया अपनी जानकारी देखने के लिए लॉग इन करें
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            इस पेज तक पहुँचने के लिए आपको अपना खाता बनाना होगा। हमारे समुदाय का
            हिस्सा बनें और विशेष सुविधाओं का लाभ उठाएं।
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors font-medium"
              >
                लॉग इन करें
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
              >
                नया खाता बनाएं
              </motion.button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            क्या आपको मदद चाहिए?{" "}
            <Link href="/contact" className="text-emerald-600 hover:underline">
              हमसे संपर्क करें
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>
          Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP. User
          Profile Page.
        </title>
        <meta charSet="UTF-8" />
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
        <meta property="og:url" content={`${siteUrl}/profile`} />
        <meta
          property="og:title"
          content="Nayta Patel Samaj | Empowering Farmers & Rural Communities in MP"
        />
        <meta
          property="og:description"
          content="Join 250+ villages in transforming agriculture and community life."
        />
        <meta property="og:image" content={`${userData?.profilePic}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/profile`} />
        <meta
          name="twitter:title"
          content="Nayta Patel Samaj | Farming & Rural Growth Platform"
        />
        <meta
          name="twitter:description"
          content="Stay updated with mandi prices, farming guides, and village empowerment programs."
        />
        <meta name="twitter:image" content={`${userData?.profilePic}`} />
        <link rel="canonical" href={`${siteUrl}/profile`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <ProfileHeader userData={userData} onEditProfile={handleEditProfile} />

      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
       <div className="flex border-b border-gray-200">
  <div className="flex flex-1 justify-between md:justify-start space-x-0 md:space-x-2">
    <button
      onClick={() => setActiveTab("profile")}
      className={`flex-1 md:flex-none flex flex-col md:flex-row items-center px-2 py-3 text-sm font-medium ${
        activeTab === "profile"
          ? "text-emerald-600 border-b-2 border-emerald-600"
          : "text-gray-500 hover:text-emerald-500"
      }`}
    >
      <FiUser className="md:mr-2" />
      <span className={`${activeTab !== "profile" ? 'hidden md:inline' : ''} mt-1 md:mt-0`}>
        Profile
      </span>
    </button>

    <button
      onClick={() => setActiveTab("posts")}
      className={`flex-1 md:flex-none flex flex-col md:flex-row items-center px-2 py-3 text-sm font-medium ${
        activeTab === "posts"
          ? "text-emerald-600 border-b-2 border-emerald-600"
          : "text-gray-500 hover:text-emerald-500"
      }`}
    >
      <FiFileText className="md:mr-2" />
      <span className={`${activeTab !== "posts" ? 'hidden md:inline' : ''} mt-1 md:mt-0`}>
        Posts {userData.posts > 0 && <span className="md:inline">({userData.posts})</span>}
      </span>
    </button>

    <button
      onClick={() => setActiveTab("village")}
      className={`flex-1 md:flex-none flex flex-col md:flex-row items-center px-2 py-3 text-sm font-medium ${
        activeTab === "village"
          ? "text-emerald-600 border-b-2 border-emerald-600"
          : "text-gray-500 hover:text-emerald-500"
      }`}
    >
      <FiMapPin className="md:mr-2" />
      <span className={`${activeTab !== "village" ? 'hidden md:inline' : ''} mt-1 md:mt-0`}>
        Village
      </span>
    </button>

    <button
      onClick={() => setActiveTab("settings")}
      className={`flex-1 md:flex-none flex flex-col md:flex-row items-center px-2 py-3 text-sm font-medium ${
        activeTab === "settings"
          ? "text-emerald-600 border-b-2 border-emerald-600"
          : "text-gray-500 hover:text-emerald-500"
      }`}
    >
      <FiSettings className="md:mr-2" />
      <span className={`${activeTab !== "settings" ? 'hidden md:inline' : ''} mt-1 md:mt-0`}>
        Settings
      </span>
    </button>

    {(userData.role === "ambassador" || userData.role === "admin") && (
      <button
        onClick={() => setActiveTab("ambassador")}
        className={`flex-1 md:flex-none flex flex-col md:flex-row items-center px-2 py-3 text-sm font-medium ${
          activeTab === "ambassador"
            ? "text-emerald-600 border-b-2 border-emerald-600"
            : "text-gray-500 hover:text-emerald-500"
        }`}
      >
        <FiStar className="md:mr-2" />
        <span className={`${activeTab !== "ambassador" ? 'hidden md:inline' : ''} mt-1 md:mt-0`}>
          Ambassador
        </span>
      </button>
    )}
  </div>
</div>

        <div className="sm:p-6 p-3">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiUser className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{userData.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <p className="font-medium">{userData.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="text-emerald-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Village</p>
                        <p className="font-medium">{userData.village}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 mt-4"
                    onClick={handleEditProfile}
                  >
                    <FiEdit2 className="mr-1" /> Edit Profile
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Activity Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <FiFileText className="text-emerald-500 text-xl" />
                      </div>
                      <p className="text-2xl font-bold">{userData.posts}</p>
                      <p className="text-sm text-gray-500">Posts</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <FiMessageSquare className="text-emerald-500 text-xl" />
                      </div>
                      <p className="text-2xl font-bold">{userData.comments}</p>
                      <p className="text-sm text-gray-500">Comments</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <FaRegThumbsUp className="text-emerald-500 text-xl" />
                      </div>
                      <p className="text-2xl font-bold">{userData.likes}</p>
                      <p className="text-sm text-gray-500">Likes</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "posts" && (
            <PostsSection
              userData={userData}
              posts={posts}
              comments={comments}
              likes={likes}
            />
          )}

          {activeTab === "village" && (
            <VillageDetails villageData={villageData} />
          )}

          {activeTab === "settings" && (
            <SettingsSection privacyStatus={userData?.visibilityStatus} />
          )}

          {activeTab === "ambassador" &&
            (userData?.role === "ambassador" || userData?.role === "admin") && (
              <AmbassadorPortal user={userData} />
            )}
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onUpdate={(NewUser) => handleUserUpdate(NewUser)}
      />
    </div>
  );
};

export default ProfileDashboard;
