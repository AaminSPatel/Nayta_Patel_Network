"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiMoreHorizontal,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiSend,
  FiImage,
  FiX,
  FiSmile,
  FiFlag,
  FiCopy,
  FiShare,
  FiCornerUpLeft,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaHeart,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaEye,
  FaRegEye,
} from "react-icons/fa";
import CreatePostCard from "./create-post-card";
import { usePatel } from "../../components/patelContext";
import Head from "next/head";
import Link from "next/link";

const PostsSection = () => {
  const {
    user,
    posts,
    setPosts,
    siteUrl,
    timeAgo,
    path,
    fetchPosts,
    comments,
  } = usePatel();
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
  });

  const [userId, setUserId] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const commentInputRef = useRef(null);
  // Optimized comment fetching function

  useEffect(() => {
    if (comments.length > 0) {
      setAllComments(comments);
    }
  }, [comments]);

  const getPostComments = async (postId) => {
    try {
      let coments =
        allComments.filter((item) => item?.post?._id === postId) || [];
      return coments;
    } catch (err) {
      console.log(err);
    }
  };

  //fetchCommentsOfPost('682001cad599edab60faeb7d')
  useEffect(() => {
    if (user) {
      setUserId(user._id);
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
      });
    }
  }, [user]);
  // Focus comment input when opening comments or replying
  useEffect(() => {
    if (commentInputRef.current && (activePost || replyingTo)) {
      commentInputRef.current.focus();
    }
  }, [activePost, replyingTo]);

  // Toggle post options menu
  const toggleOptions = (postId) => {
    setPosts(
      posts.map((post) => ({
        ...post,
        showOptions: post._id === postId ? !post.showOptions : false,
      }))
    );
  };

  // Toggle comments with comment fetching
  const toggleComments = async (postId) => {
    try {
      if (activePost !== postId) {
        setLoadingComments(true);
        const postComments = allComments.filter(
          (item) => item?.post?._id === postId
        );
        setPosts(
          posts.map((post) =>
            post._id === postId ? { ...post, comments: postComments } : post
          )
        );
        trackView(postId);
      }
      setActivePost(activePost === postId ? null : postId);
      setReplyingTo(null); // Reset reply when toggling comments
      setLoadingComments(false);
      setIsCommentsExpanded(!isCommentsExpanded);
    } catch (err) {
      console.error("Error loading comments:", err);
      setLoadingComments(false);
    }
  };
  // Start replying to a comment
  const startReply = (comment) => {
    setReplyingTo(comment);
    if (!activePost) {
      setActivePost(comment.post); // Open comments if not already open
    }
  };
  // Cancel reply
  const cancelReply = () => {
    setReplyingTo(null);
  };

  // Toggle share options
  const toggleShare = (postId) => {
    setPosts(
      posts.map((post) => ({
        ...post,
        showShare: post._id === postId ? !post.showShare : false,
      }))
    );
  };

  // Track post views
  const trackView = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      /* await fetch(`${path}/api/posts/${postId}/view`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) */
      // Update local state if needed
    } catch (err) {
      console.error("Error tracking view:", err);
    }
  };

  const [isCommentLike,setIsCommentLike] = useState(false)
  // Handle like/unlike
  const toggleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${path}/api/posts/like/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to update like");

      await response.json();
      //console.log(updatedPost);
      fetchPosts();
      // Update local state
      //setPosts(updatedPost.posts);
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  // Like/unlike a comment
  const toggleCommentLike = async (commentId, postId, isReply) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint;
      if (!isReply) {
        endpoint = `${path}/api/comments/${commentId}/like`;
      } else {
        endpoint = `${path}/api/comments/${postId}/reply/${commentId}/like`;
      }
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to update comment like");

      await response.json();

      // Update local state
      //fetchPosts();
    } catch (err) {
      console.error("Error updating comment like:", err);
    }
  };
  const addComment = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      let endpoint, body, methodTosend;
      toggleComments(postId);
      if (replyingTo) {
        // For replies
        methodTosend = "PUT";
        endpoint = `${path}/api/comments/${replyingTo._id}/reply`;
        body = { content: newComment };
      } else {
        // For top-level comments
        methodTosend = "POST";
        endpoint = `${path}/api/comments`;
        body = { content: newComment, post: postId };
      }

      const response = await fetch(endpoint, {
        method: methodTosend,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      await response.json();

      // Update local state
      /* setPosts(
        posts.map((post) => {
          if (post._id === postId) {
            if (replyingTo) {
              // Add reply to existing comment
              const updatedComments = post.comments.map((comment) => {
                if (comment._id === replyingTo._id) {
                  return {
                    ...comment,
                    reply: [...(comment.reply || []), result], // Match your schema's reply field
                  };
                }
                return comment;
              });
              return { ...post, comments: updatedComments };
            } else {
              // Add new top-level comment
              return {
                ...post,
                comments: [result, ...post.comments],
              };
            }
          }
          return post;
        })
      ); */
      fetchPosts();

      await toggleComments(postId);
      setNewComment("");
      setReplyingTo(null);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Share post
  const sharePost = (post, platform) => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    const text = `${post.user.fullname}'s post: ${post.content.substring(
      0,
      100
    )}...`;

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          text + "\n\n" + postUrl
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing, this will open in browser
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          postUrl
        )}&text=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // Copy post link
  const copyPostLink = (postId) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    // alert("Post link copied to clipboard!");
  };

  const handleAddPost = (newPost) => {
    setPosts([
      {
        _id: newPost._id,
        user: {
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
    ]);
  };

  const renderComment = (comment, postId, isReply = false, commentor) => {
    const isLiked = comment.likes?.includes(user._id);

    return (
      <div
        key={comment._id}
        className={`flex space-x-3 ${isReply ? "ml-10" : ""}`}
      >
        {" "}
        <Link href={`/profile/${comment.user?._id}`}>
          <img
            src={comment.user?.profilepic?.url || "/placeholder.svg"}
            alt={comment.user?.fullname}
            className="w-8 h-8 rounded-full object-cover mt-1"
          />{" "}
        </Link>
        <div className="flex-1">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h5 className="font-semibold text-sm">{comment.user?.fullname}</h5>
            <p className="text-gray-800 text-sm mt-1">
              <span className="font-semibold">
                {isReply ? "@" + comment.replyTo.fullname : ""}{" "}
              </span>{" "}
              {comment.content}
            </p>
          </div>

          <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
            <span>{timeAgo(comment.createdAt)}</span>
            <button
              onClick={() => toggleCommentLike(comment._id, postId, isReply)}
              className={`hover:text-emerald-600 ${
                isLiked ? "text-emerald-600" : ""
              }`}
            >
              {isLiked ? "Liked" : "Like"} ({comment.likes?.length || 0})
            </button>
            {!isReply && (
              <button
                onClick={() => startReply(comment)}
                className="hover:text-emerald-600"
              >
                Reply
              </button>
            )}
          </div>

          {/* Render replies if any - matches your schema's reply field */}
          {comment.replies?.length > 0 && (
            <div className="mt-2 space-y-3">
              {comment.replies
                .slice(0, 4)
                .map((reply) =>
                  renderComment(reply, comment._id, true, reply.user.fullname)
                )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4"
    >
      <Head>
        <title>Community Wall | Voice of Farmers & Villages</title>
        <meta charset="UTF-8" />
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
        <meta
          property="og:title"
          content="Community Wall | Connect with Local Villages"
        />
        <meta
          property="og:description"
          content="An open space to voice, post, and interact for village growth."
        />
        <meta property="og:image" content={`${siteUrl}/eid.avif`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/wall`} />
        <meta
          name="twitter:title"
          content="Farmer & Village Wall | Share & Connect"
        />
        <meta
          name="twitter:description"
          content="Share your experiences with other farmers and villagers."
        />
        <meta name="twitter:image" content={`${siteUrl}/eid.avif`} />

        <link rel="canonical" href={`${siteUrl}/wall`} />
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <CreatePostCard onAddPost={handleAddPost} userData={userData} />

      {posts.map((post) => {
        let postComments = getPostComments(post._id);
        return (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link href={`/profile/${post?.user?._id}`}>
                {" "}
                <div className="flex items-center space-x-3">
                  <img
                    src={post?.user?.profilepic?.url || "/placeholder.svg"}
                    alt={post?.user?.fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {post.user.fullname}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{post.user.village || "India"}</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="relative">
                <button
                  onClick={() => toggleOptions(post._id)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiMoreHorizontal />
                </button>

                {post.showOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={() => copyPostLink(post._id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiCopy className="mr-2" /> Copy Link
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FiFlag className="mr-2" /> Report Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-800 whitespace-pre-line">
                {post.content}
              </p>
              {post.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-sm text-emerald-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="w-auto flex items-center pl-4">
              <span className="text-gray-400">
                {timeAgo(post.dateOfCreation)}
              </span>
            </div>

            {/* Post Stats */}
            <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <span className="flex items-center">
                  <span className="bg-emerald-100 p-1 rounded-full mr-1">
                    <FaHeart className="text-emerald-500" size={10} />
                  </span>
                  {post?.likes?.length || 0}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMessageSquare className="mr-1" />
                <span>{postComments.length || 0}</span>
              </div>
              <div className="fle hidden items-center space-x-3">
                <FaRegEye className="mr-1" />
                <span>{post?.views || 0}</span>
              </div>
            </div>
            {/* Comments Toggle */}

            {/* Post Actions */}
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => (user ? toggleLike(post._id) : "")}
                className={`flex-1 py-2 cursor-pointer flex items-center justify-center space-x-2 ${
                  post.likes?.includes(userId)
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-emerald-600"
                }`}
              >
                {post.likes?.includes(userId) && userId ? (
                  <FaHeart className="mr-1" /> // Solid heart when liked
                ) : (
                  <FiHeart className="mr-1" /> // Outline heart when not liked
                )}
                <span>Like</span>
              </button>
              <button
                onClick={() => (user ? toggleComments(post._id) : "")}
                className="flex-1 py-2 flex cursor-pointer items-center justify-center space-x-2 text-gray-500 hover:text-emerald-600"
              >
                <FiMessageSquare className="mr-1" />
                <span>Comment</span>
              </button>
              <button
                onClick={() => toggleShare(post._id)}
                className="flex-1 py-2 flex cursor-pointer items-center justify-center space-x-2 text-gray-500 hover:text-emerald-600"
              >
                <FiShare2 className="mr-1" />
                <span>Share</span>
              </button>
            </div>
            <div>
              <button
                onClick={() => toggleComments(post._id)}
                className="w-full mt-3 py-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center justify-center border-t border-gray-100 pt-3"
              >
                {!isCommentsExpanded ? (
                  <>
                    <FiChevronUp className="w-4 h-4 mr-1" />
                    Hide Comments
                  </>
                ) : (
                  <>
                    <FiChevronDown className="w-4 h-4 mr-1" />
                    View {postComments.length} Comments
                  </>
                )}
              </button>
            </div>
            {/* Comments Section - Only shown for active post */}
            {activePost === post._id && (
              <div className="border-t border-gray-200 bg-gray-50">
                {/* Comment List */}
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {loadingComments ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                  ) : post.comments?.length > 0 ? (
                    post.comments.map((comment) =>
                      renderComment(comment, post._id)
                    )
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No comments yet
                    </p>
                  )}
                </div>

                {/* Enhanced Comment Input */}
                <div className="p-4 border-t border-gray-200">
                  {replyingTo && (
                    <div className="flex items-center justify-between mb-2 px-2 py-1 bg-gray-100 rounded">
                      <span className="text-xs text-gray-600">
                        Replying to {replyingTo.user.fullname}
                      </span>
                      <button
                        onClick={cancelReply}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <img
                      src={userData.profilePic?.url || "/placeholder.svg"}
                      alt={userData.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 relative">
                      {/* <input
                      ref={commentInputRef}
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && addComment(post._id)
                      }
                      placeholder={
                        replyingTo
                          ? `Reply to ${replyingTo.user.fullname}...`
                          : "Write a comment..."
                      }
                      className="w-full py-2 px-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                    /> */}
                      <input
                        ref={commentInputRef}
                        type="text" // Keep as type="text"
                        inputMode="text" // Explicitly set input mode
                        autoComplete="off" // Disable autocomplete
                        autoCorrect="off" // Disable autocorrect
                        spellCheck="false" // Disable spellcheck
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addComment(post._id)
                        }
                        placeholder={
                          replyingTo
                            ? `Reply to ${replyingTo.user.fullname}...`
                            : "Write a comment..."
                        }
                        className="w-full py-2 px-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                      />
                      <button
                        onClick={() => addComment(post._id)}
                        disabled={!newComment.trim()}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                          newComment.trim()
                            ? "text-emerald-600"
                            : "text-gray-400"
                        }`}
                      >
                        <FiSend />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Share Options - Only shown when share is clicked */}
            {post.showShare && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => sharePost(post, "whatsapp")}
                    className="p-3 text-green-500 rounded-full hover:text-green-600"
                  >
                    <FaWhatsapp size={20} />
                  </button>
                  <button
                    onClick={() => sharePost(post, "facebook")}
                    className="p-3 text-blue-600 rounded-full hover:text-blue-700"
                  >
                    <FaFacebook size={20} />
                  </button>
                  <button
                    onClick={() => sharePost(post, "instagram")}
                    className="p-3 text-pink-600  rounded-full hover:bg-pink-700"
                  >
                    <FaInstagram size={20} />
                  </button>
                  <button
                    onClick={() => sharePost(post, "telegram")}
                    className="p-3 text-blue-400 rounded-full hover:bg-blue-500"
                  >
                    <FaTelegram size={20} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Optional: Extract comment item to separate component
const CommentItem = ({ comment, timeAgo }) => (
  <div className="flex space-x-3">
    <img
      src={comment.user?.profilepic?.url || "/placeholder.svg"}
      alt={comment.user?.fullname}
      className="w-8 h-8 rounded-full object-cover mt-1"
    />
    <div className="flex-1">
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <h5 className="font-semibold text-sm">{comment.user?.fullname}</h5>
        <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
        <span>{timeAgo(comment.createdAt)}</span>
        <button className="hover:text-emerald-600">Like</button>
      </div>
    </div>
  </div>
);

export default PostsSection;
