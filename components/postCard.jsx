"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter , useParams } from "next/navigation"
import {
  FiMoreHorizontal,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiSend,
  FiX,
  FiFlag,
  FiCopy,
  FiChevronUp,
  FiChevronDown,
  FiExternalLink,
} from "react-icons/fi"
import { FaHeart, FaWhatsapp, FaFacebook, FaInstagram, FaTelegram, FaRegEye, FaStar } from "react-icons/fa"

const PostCard = ({
  post: initialPost,
  user,
  timeAgo,
  allComments = [],
  apiPath,
  onPostUpdate,
  isDetailView = false,
  enableNavigation = true,
}) => {
  const router = useRouter()
  const [post, setPost] = useState(initialPost)
  const [showOptions, setShowOptions] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showComments, setShowComments] = useState(isDetailView) // Auto-open comments in detail view
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [loadingComments, setLoadingComments] = useState(false)
  const [comments, setComments] = useState([])
  const commentInputRef = useRef(null)

  // Update local post when prop changes
  useEffect(() => {
    setPost(initialPost)
  }, [initialPost])

  // Filter comments for this post
  useEffect(() => {
    const postComments = allComments.filter((comment) => comment?.post?._id === post._id)
    setComments(postComments)
  }, [allComments, post._id])

  const isLiked = post.likes?.includes(user?._id)

  useEffect(() => {
    if (commentInputRef.current && (showComments || replyingTo)) {
      commentInputRef.current.focus()
    }
  }, [showComments, replyingTo])

  // Handle card click to navigate to post detail
  const handleCardClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (
      !enableNavigation ||
      isDetailView ||
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("input") ||
      e.target.closest("textarea")
    ) {
      return
    }

    router.push(`/wall/${post._id}`)
  }

  // Handle post like/unlike
  const handleToggleLike = async (e) => {
    e?.stopPropagation()
    if (!user) return

    try {
      const token = localStorage.getItem("token")

      // Optimistic update
      const wasLiked = post.likes?.includes(user._id)
      const updatedLikes = wasLiked ? post.likes.filter((id) => id !== user._id) : [...(post.likes || []), user._id]

      setPost((prev) => ({ ...prev, likes: updatedLikes }))

      const response = await fetch(`${apiPath}/api/posts/like/${post._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        // Revert optimistic update on error
        setPost((prev) => ({ ...prev, likes: post.likes }))
        throw new Error("Failed to update like")
      }

      const result = await response.json()

      // Update with server response
      if (result.post) {
        setPost(result.post)
        onPostUpdate?.(result.post)
      }
    } catch (err) {
      console.error("Error updating like:", err)
    }
  }

  // Handle comment like/unlike
  const handleToggleCommentLike = async (commentId, isReply = false, parentCommentId = null) => {
    if (!user) return

    try {
      const token = localStorage.getItem("token")

      // Optimistic update for comments
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (!isReply && comment._id === commentId) {
            const wasLiked = comment.likes?.includes(user._id)
            const updatedLikes = wasLiked
              ? comment.likes.filter((id) => id !== user._id)
              : [...(comment.likes || []), user._id]
            return { ...comment, likes: updatedLikes }
          } else if (isReply && comment._id === parentCommentId) {
            // Update reply likes
            const updatedReplies = comment.replies?.map((reply) => {
              if (reply._id === commentId) {
                const wasLiked = reply.likes?.includes(user._id)
                const updatedLikes = wasLiked
                  ? reply.likes.filter((id) => id !== user._id)
                  : [...(reply.likes || []), user._id]
                return { ...reply, likes: updatedLikes }
              }
              return reply
            })
            return { ...comment, replies: updatedReplies }
          }
          return comment
        })
      })

      let endpoint
      if (!isReply) {
        endpoint = `${apiPath}/api/comments/${commentId}/like`
      } else {
        endpoint = `${apiPath}/api/comments/${parentCommentId}/reply/${commentId}/like`
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        // Revert optimistic update on error
        const postComments = allComments.filter((comment) => comment?.post?._id === post._id)
        setComments(postComments)
        throw new Error("Failed to update comment like")
      }

      const result = await response.json()

      // Update with server response if available
      if (result.comments) {
        setComments(result.comments)
      }
    } catch (err) {
      console.error("Error updating comment like:", err)
    }
  }

  // Handle add comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return

    try {
      const token = localStorage.getItem("token")
      let endpoint, body, method

      if (replyingTo) {
        method = "PUT"
        endpoint = `${apiPath}/api/comments/${replyingTo._id}/reply`
        body = { content: newComment }
      } else {
        method = "POST"
        endpoint = `${apiPath}/api/comments`
        body = { content: newComment, post: post._id }
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) throw new Error("Failed to add comment")

      const result = await response.json()

      // Optimistic update for new comment
      if (replyingTo) {
        // Add reply to existing comment
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment._id === replyingTo._id) {
              return {
                ...comment,
                replies: [...(comment.replies || []), result],
              }
            }
            return comment
          }),
        )
      } else {
        // Add new top-level comment
        setComments((prevComments) => [result, ...prevComments])
      }

      setNewComment("")
      setReplyingTo(null)
    } catch (err) {
      console.error("Error adding comment:", err)
      throw err
    }
  }

  const handleToggleComments = async (e) => {
    e?.stopPropagation()
    setShowComments(!showComments)
    setReplyingTo(null)
  }

  const handleStartReply = (comment) => {
    setReplyingTo(comment)
    if (!showComments) {
      setShowComments(true)
    }
  }

  const handleShare = (platform) => {
    const postUrl = `${window.location.origin}/wall/${post._id}`
    const text = `${post.user.fullname}'s post: ${post.content.substring(0, 100)}...`
    let shareUrl = ""

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + "\n\n" + postUrl)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
        break
      case "instagram":
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(postUrl)}`
        break
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(text)}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer")
    setShowShare(false)
  }

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/wall/${post._id}`
    navigator.clipboard.writeText(postUrl).then(() => {
      console.log("Post link copied to clipboard!")
      // You can add a toast notification here
    })
    setShowOptions(false)
  }

  const renderComment = (comment, isReply = false, parentCommentId = null) => {
    const isCommentLiked = comment.likes?.includes(user?._id)

    return (
      <motion.div
        key={comment._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex space-x-3 ${isReply ? "ml-8 mt-2" : "mb-4"}`}
      >
        <Link href={`/profile/${comment.user?._id}`} className="flex-shrink-0">
          <img
            src={comment.user?.profilepic?.url || "/placeholder.svg?height=32&width=32"}
            alt={comment.user?.fullname}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm hover:ring-emerald-200 transition-all"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-2xl shadow-sm">
            <Link
              href={`/profile/${comment.user?._id}`}
              className="font-semibold text-sm text-gray-900 hover:text-emerald-600 transition-colors"
            >
              {comment.user?.fullname}
            </Link>
            <p className="text-gray-800 text-sm mt-1 leading-relaxed">
              {isReply && comment.replyTo && (
                <Link
                  href={`/profile/${comment.replyTo._id}`}
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  @{comment.replyTo.fullname}{" "}
                </Link>
              )}
              {comment.content}
            </p>
          </div>

          <div className="flex items-center mt-2 text-xs text-gray-500 space-x-4">
            <span className="font-medium">{timeAgo(comment.createdAt)}</span>

            <button
              onClick={() => handleToggleCommentLike(comment._id, isReply, parentCommentId)}
              className={`flex items-center space-x-1 hover:text-emerald-600 transition-colors ${
                isCommentLiked ? "text-emerald-600 font-semibold" : ""
              }`}
            >
              {isCommentLiked ? <FaHeart className="text-xs" /> : <FiHeart className="text-xs" />}
              <span>{isCommentLiked ? "Liked" : "Like"}</span>
              {comment.likes?.length > 0 && (
                <span className="bg-gray-200 px-1.5 py-0.5 rounded-full text-xs">{comment.likes.length}</span>
              )}
            </button>

            {!isReply && (
              <button
                onClick={() => handleStartReply(comment)}
                className="hover:text-emerald-600 transition-colors font-medium"
              >
                Reply
              </button>
            )}
          </div>

          {/* Render replies */}
          {comment.replies?.length > 0 && (
            <div className="mt-3 space-y-2">
              {comment.replies.slice(0, 3).map((reply) => renderComment(reply, true, comment._id))}
              {comment.replies.length > 3 && (
                <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium ml-8">
                  View {comment.replies.length - 3} more replies
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        enableNavigation && !isDetailView ? "cursor-pointer hover:scale-[1.02]" : ""
      } ${isDetailView ? "shadow-lg" : ""}`}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Link href={`/profile/${post?.user?._id}`} className="flex items-center space-x-3 group">
          <div className="relative">
            <img
              src={post?.user?.profilepic?.url || "/placeholder.svg?height=40&width=40"}
              alt={post?.user?.fullname}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-emerald-200 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4  rounded-full">{(post?.user?.role ==='ambassador'|| post?.user?.role === 'admin'|| post?.user?.role === 'semi-admin') && <span className="h-full w-full flex items-center justify-center bg-amber-200 rounded-2xl"><FaStar className="text-indigo-800" size={9}/></span> }</div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {post.user.fullname}
            </h4>
            <div className="flex items-center text-xs text-gray-500">
              <span>{post.user.village || "India"}</span>
              <span className="mx-1">•</span>
              <span>{timeAgo(post.dateOfCreation)}</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          {!isDetailView && enableNavigation && (
            <Link
              href={`/wall/${post._id}`}
              className="p-2 text-gray-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
              title="View full post"
            >
              <FiExternalLink className="w-4 h-4" />
            </Link>
          )}

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowOptions(!showOptions)
              }}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiMoreHorizontal />
            </button>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiCopy className="mr-3 text-gray-400" /> Copy Link
                  </button>
                  <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <FiFlag className="mr-3 text-gray-400" /> Report Post
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{post.content}</p>
        {post.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-4 py-3 fle items-center justify-between text-sm text-gray-500 border-t border-gray-100 bg-gray-50 hidden">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <FaHeart className="text-white text-xs" />
              </div>
            </div>
            <span className="font-medium">{post?.likes?.length || 0}</span>
          </div>

          <div className="flex items-center space-x-1">
            <FiMessageSquare className="text-gray-400" />
            <span className="font-medium">{comments.length}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs">
          <FaRegEye className="text-gray-400" />
          <span>{post?.views || 0} views</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex border-t border-gray-200">
        <button
          onClick={handleToggleLike}
          className={`flex-1 py-3 flex items-center justify-center space-x-2 transition-all duration-200 ${
            isLiked ? "text-red-500 bg-red-50" : "text-gray-500 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          {isLiked ? <FaHeart className="animate-pulse" /> : <FiHeart />}
          <span className="font-medium">{post?.likes?.length || 0}</span>
        </button>

        <button
          onClick={handleToggleComments}
          className="flex-1 py-3 flex items-center justify-center space-x-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
        >
          <FiMessageSquare />
          <span className="font-medium">{comments.length}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowShare(!showShare)
          }}
          className="flex-1 py-3 flex items-center justify-center space-x-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          <FiShare2 />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Toggle Button */}
      {!isDetailView && (
        <button
          onClick={handleToggleComments}
          className="w-full py-3 text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center justify-center border-t border-gray-100 hover:bg-emerald-50 transition-all duration-200"
        >
          {showComments ? (
            <>
              <FiChevronUp className="w-4 h-4 mr-1" />
              Hide Comments
            </>
          ) : (
            <>
              <FiChevronDown className="w-4 h-4 mr-1" />
              {comments.length > 0 ? `View ${comments.length} Comments` : "Add Comment"}
            </>
          )}
        </button>
      )}

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white"
          >
            {/* Comment List */}
            <div className={`p-4 space-y-4 ${isDetailView ? "max-h-none" : "max-h-96"} overflow-y-auto`}>
              {loadingComments ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-600 border-t-transparent"></div>
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => renderComment(comment))
              ) : (
                <div className="text-center py-8">
                  <FiMessageSquare className="mx-auto text-gray-300 text-3xl mb-2" />
                  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <AnimatePresence>
                {replyingTo && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between mb-3 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200"
                  >
                    <span className="text-sm text-emerald-700">
                      Replying to <span className="font-semibold">{replyingTo.user.fullname}</span>
                    </span>
                    <button onClick={() => setReplyingTo(null)} className="text-emerald-600 hover:text-emerald-700 p-1">
                      <FiX size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-end space-x-3">
                <img
                  src={user?.profilepic?.url || "/placeholder.svg?height=32&width=32"}
                  alt={user?.fullname}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                />

                <div className="flex-1 relative">
                  <textarea
                    ref={commentInputRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleAddComment()
                      }
                    }}
                    placeholder={replyingTo ? `Reply to ${replyingTo.user.fullname}...` : "Write a comment..."}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-200"
                    rows="1"
                    style={{ minHeight: "44px" }}
                  />
                </div>

                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    newComment.trim()
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Options */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100"
          >
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3 text-center font-medium">Share this post</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
                >
                  <FaWhatsapp size={20} />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <FaFacebook size={20} />
                </button>
                <button
                  onClick={() => handleShare("instagram")}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors shadow-md hover:shadow-lg"
                >
                  <FaInstagram size={20} />
                </button>
                <button
                  onClick={() => handleShare("telegram")}
                  className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
                >
                  <FaTelegram size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default PostCard
