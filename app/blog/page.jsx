"use client";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";
import { usePatel } from "../../components/patelContext";
import Link from "next/link";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPost, setExpandedPost] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const { blogs,siteUrl,formatContent } = usePatel();

  const categories = [...new Set(blogs.map((post) => post.category))];

  const filteredPosts = blogs.filter((post) => {
    return (
      (selectedCategory === "" || post.category === selectedCategory) &&
      (searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const toggleExpandPost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const toggleShareOptions = (postId) => {
    setShowShareOptions(showShareOptions === postId ? null : postId);
  };

  const handleCopyLink = (postId) => {
    navigator.clipboard.writeText(`${siteUrl}/blog/${postId}`);
    alert("Link copied to clipboard!");
  };

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  //console.log(filteredPosts, "all blogs");

  return (
    <>
      <Head>
        <title>
          Knowledge Hub | Articles on Agriculture, Technology & Rural
          Development
        </title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Explore our collection of articles, guides, and insights on agriculture, milk production, rural awareness, and community development in Indore, Ujjain, Dhar, Dewas, and Ratlam."
        />
        <meta
          name="keywords"
          content="agriculture, farming, kisani, kisan, kheti, rural development, village data, mandi bhav, milk production, crop yield, Nayta Patel, Nayata Patel Network, Nayata Patel Samaj, Nayata Patel, Indore, Ujjain, Dewas, Dhar, Ratlam, sabji, paidawar, khetiwadi, samaj vikas, community building"
        />
        <meta name="author" content="Nayta Patel Network" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <meta
          property="og:title"
          content="Knowledge Hub | Articles on Agriculture, Technology & Rural Development"
        />
        <meta
          property="og:description"
          content="Explore articles on farming, rural tech, and community development. Stay informed about mandi prices, crop yield, and village progress."
        />
        <meta
          property="og:image"
          content={`${siteUrl}/images/blog-social-share.jpg`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/blog`} />
        <meta
          name="twitter:title"
          content="Knowledge Hub | Agriculture, Milk Production & Rural Awareness"
        />
        <meta
          name="twitter:description"
          content="Insights on farming, community building, mandi rates, village data, and Nayta Patel community work in MP."
        />
        <meta
          name="twitter:image"
          content={`${siteUrl}/images/blog-social-share.jpg`}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={`${siteUrl}/blog`} />

        {/* Favicon */}
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         
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
          className="text-center mb-12"
        >
          <motion.h2 
            variants={{ hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }}}
            className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
          >
          ज्ञान का खजाना
          </motion.h2>
          <motion.p 
            variants={{
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }}
            className="text-lg text-gray-700"
          >
ज्ञान का खजाना: कृषि, तकनीक और ग्रामीण विकास पर नवीनतम लेख, मार्गदर्शिकाएँ और विशेष जानकारियाँ एक ही स्थान पर! </motion.p>
        </motion.div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
            <div className="flex items-center mb-6">
              <FaFilter className="text-emerald-500 mr-4 text-2xl" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Filter Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
                >
                  <option value="">All Categories</option>
                  {categories.map((category,index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 pl-12 p-3"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                    <Image
                      src={
                        featuredPost?.image?.url ||
                        "/images/blog-placeholder.jpg"
                      }
                      alt={featuredPost?.title || "Image of a blog"}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-gray-100 rounded-full px-2 py-1">
                        {featuredPost.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(
                          featuredPost.createdAt || featuredPost.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-bold text-2xl mb-4">
                      {featuredPost.title}
                    </h3>
                    <div className="text-gray-600 mb-6 mask-b-from-70%">
                      <p className="line-clamp-4">{formatContent(featuredPost.content)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/blog/${featuredPost._id}`}
                        className="text-emerald-500 hover:text-emerald-600 font-medium flex items-center"
                      >
                        {expandedPost === featuredPost._id
                          ? "Show less"
                          : "Read more"}
                        <FaArrowRight className="ml-2" />
                      </Link>

                      <div className="relative">
                        <button
                          onClick={() => toggleShareOptions(featuredPost._id)}
                          className="text-gray-500 hover:text-emerald-500 p-2 rounded-full"
                          aria-label="Share options"
                        >
                          <FaShareAlt size={18} />
                        </button>

                        {showShareOptions === featuredPost._id && (
                          <div className="absolute right-0 bottom-10 bg-white rounded-lg shadow-xl p-3 space-y-2 w-48 z-10">
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `${featuredPost.title} ${siteUrl}/blog/${featuredPost._id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-700 hover:text-green-500"
                            >
                              <FaWhatsapp className="mr-2 text-green-500" />{" "}
                              WhatsApp
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                `${siteUrl}/blog/${featuredPost._id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-700 hover:text-blue-600"
                            >
                              <FaFacebook className="mr-2 text-blue-600" />{" "}
                              Facebook
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                featuredPost.title
                              )}&url=${encodeURIComponent(
                                `${siteUrl}/blog/${featuredPost._id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-700 hover:text-blue-400"
                            >
                              <FaTwitter className="mr-2 text-blue-400" />{" "}
                              Twitter
                            </a>
                            <button
                              onClick={() => handleCopyLink(featuredPost._id)}
                              className="flex items-center text-gray-700 hover:text-purple-500 w-full"
                            >
                              <FaLink className="mr-2 text-purple-500" /> Copy
                              Link
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* All Blog Posts */}
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image?.url || "/images/blog-placeholder.jpg"}
                      alt={
                        post.image?.title || "Image of blog of nayata patel "
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-gray-100 rounded-full px-2 py-1 line-clamp-1">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="line-clamp-1">
                        {new Date(
                          post.createdAt || post.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-gray-600 mb-4 flex-grow mask-b-from-60%">
                      <p className="line-clamp-4">{formatContent(post.content)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/blog/${post._id}`}
                        className="text-emerald-500 hover:text-emerald-600 text-sm font-medium flex items-center"
                      >
                        {expandedPost === post._id ? "Show less" : "Read more"}
                        <FaArrowRight className="ml-1" />
                      </Link>

                      <div className="relative">
                        <button
                          onClick={() => toggleShareOptions(post._id)}
                          className="text-gray-500 hover:text-emerald-500 p-1 rounded-full"
                          aria-label="Share options"
                        >
                          <FaShareAlt size={16} />
                        </button>

                        {showShareOptions === post._id && (
                          <div className="absolute right-0 bottom-8 bg-white rounded-lg shadow-xl p-2 space-y-2 w-40 z-10">
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `${post.title} ${siteUrl}/blog/${post._id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-700 hover:text-green-500 text-sm"
                            >
                              <FaWhatsapp
                                className="mr-2 text-green-500"
                                size={14}
                              />{" "}
                              WhatsApp
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                `${siteUrl}/blog/${post._id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-700 hover:text-blue-600 text-sm"
                            >
                              <FaFacebook
                                className="mr-2 text-blue-600"
                                size={14}
                              />{" "}
                              Facebook
                            </a>
                            <button
                              onClick={() => handleCopyLink(post._id)}
                              className="flex items-center text-gray-700 hover:text-purple-500 text-sm w-full"
                            >
                              <FaLink
                                className="mr-2 text-purple-500"
                                size={14}
                              />{" "}
                              Copy Link
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                No blog posts match your current filters. Try adjusting your
                search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSearchTerm("");
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="mt-12 bg-emerald-50 rounded-lg shadow-md p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter to receive the latest articles and
                updates directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
                />
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
