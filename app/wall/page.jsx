"use client"
import PostCard from "../../components/postCard"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"
import CreatePostCard from "./create-post-card"
import { usePatel } from "../../components/patelContext"

const PostsSection = () => {
  const { user, posts, setPosts, siteUrl, timeAgo, path, fetchPosts, comments } = usePatel()

  const [userData, setUserData] = useState({
    id: "",
    fullName: "John Doe",
    email: "",
    mobile: "",
    village: "",
    profilePic: "",
    posts: 0,
    comments: 0,
    likes: 0,
  })

  useEffect(() => {
    if (user) {
      setUserData({
        id: user._id,
        fullName: user.fullname,
        email: user.email,
        mobile: user.mobile,
        village: user.village,
        profilePic: user.profilepic,
        posts: user.posts.length,
        comments: user.comments.length,
        likes: user.likes.length,
      })
    }
  }, [user])

  // Handle post updates from PostCard
  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
  }

  // Handle add new post
  const handleAddPost = (newPost) => {
    setPosts([
      {
        _id: newPost._id,
        user: {
          _id: user._id,
          fullname: user.fullname,
          profilepic: user.profilepic,
          village: user.village,
        },
        content: newPost.content,
        likes: [],
        comments: [],
        views: 0,
        verificationStatus: "pending",
        tags: newPost.tags,
        dateOfCreation: new Date().toISOString(),
      },
      ...posts,
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Community Wall | Voice of Farmers & Villages</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Post updates, share village news, farming experiences, and local achievements on our community wall."
        />
        <meta
          name="keywords"
          content="community wall, kisan samaj, gaon samachar, farmer opinions, MP rural updates, village sharing"
        />
        <meta name="author" content="Nayta Patel Community" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/wall`} />
        <meta property="og:title" content="Community Wall | Connect with Local Villages" />
        <meta property="og:description" content="An open space to voice, post, and interact for village growth." />
        <meta property="og:image" content={`${siteUrl}/eid.avif`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/wall`} />
        <meta name="twitter:title" content="Farmer & Village Wall | Share & Connect" />
        <meta name="twitter:description" content="Share your experiences with other farmers and villagers." />
        <meta name="twitter:image" content={`${siteUrl}/eid.avif`} />
        <link rel="canonical" href={`${siteUrl}/wall`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <CreatePostCard onAddPost={handleAddPost} userData={userData} />
        </motion.div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something with the community!</p>
            </motion.div>
          ) : (
            posts.map((post, index) => (
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
            ))
          )}
        </div>

        {/* Load more button or infinite scroll can be added here */}
        {posts.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <p className="text-gray-500 text-sm">You've reached the end of the feed</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PostsSection
