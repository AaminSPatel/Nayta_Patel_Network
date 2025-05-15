"use client"

import { motion } from "framer-motion"
import { FiFileText, FiMessageSquare, FiHeart } from "react-icons/fi"

const ActivitySection = ({ userData }) => {
  // Mock activity data
  const recentPosts = [
    { id: 1, title: "My experience with farming techniques", date: "2 days ago", likes: 24, comments: 8 },
    { id: 2, title: "Village festival preparations", date: "1 week ago", likes: 56, comments: 12 },
    { id: 3, title: "New irrigation system in the village", date: "2 weeks ago", likes: 42, comments: 15 },
  ]

  const recentComments = [
    {
      id: 1,
      post: "Community garden project",
      comment: "This is a great initiative! I would love to participate.",
      date: "3 days ago",
    },
    {
      id: 2,
      post: "Village council meeting",
      comment: "I think we should discuss the road repairs as well.",
      date: "1 week ago",
    },
    {
      id: 3,
      post: "Annual harvest festival",
      comment: "Looking forward to the event. Last year was amazing!",
      date: "2 weeks ago",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiFileText className="mr-2 text-emerald-500" /> Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">{post.title}</h4>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <FiHeart className="mr-1" /> {post.likes}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <FiMessageSquare className="mr-1" /> {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiMessageSquare className="mr-2 text-emerald-500" /> Recent Comments
        </h3>
        <div className="space-y-4">
          {recentComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">{comment.post}</h4>
              <p className="text-gray-700 mt-1">"{comment.comment}"</p>
              <p className="text-sm text-gray-500 mt-2">{comment.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Activity Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Posts</h4>
              <span className="text-emerald-500">
                <FiFileText />
              </span>
            </div>
            <p className="text-3xl font-bold">{userData.posts}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Comments</h4>
              <span className="text-emerald-500">
                <FiMessageSquare />
              </span>
            </div>
            <p className="text-3xl font-bold">{userData.comments}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Likes</h4>
              <span className="text-emerald-500">
                <FiHeart />
              </span>
            </div>
            <p className="text-3xl font-bold">{userData.likes}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ActivitySection
