'use client'
import Image from 'next/image'
import { usePatel } from '../../../components/patelContext'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin,
  FaShareAlt,
  FaLink,
  FaInstagram
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function BlogDetail() {
  const { blogs, formatDate, formatContent} = usePatel()
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    if (blogs && id) {
      try {
      setLoading(true)
        const selectedBlog = blogs.find(item => item._id === id)
      // Navigate to home after 2 seconds
      setTimeout(() => {
        if (!selectedBlog) {
          throw new Error(`Blog not found ${id}`)
        }
        setLoading(false)
        setBlog(selectedBlog)
      }, 2000);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  }, [blogs, id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/blog/${id}`)
    alert('Link copied to clipboard!')
  }


  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Loading blog post...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Loading blog post...</p>
      </div>
    )
  }

  const shareUrl = `${window.location.origin}/blog/${id}`
  const shareText = `Check out this blog: ${blog.title}`

  return (
    <>
      <Head>
        <title>{blog.title} | Our Village Stories</title>
        <meta name="description" content={blog.content.substring(0, 160) + '...'} />
        <meta name="keywords" content={`${blog.category}, village, community, ${blog.title}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.substring(0, 160) + '...'} />
        <meta property="og:image" content={blog.image.url || '/hom2.jpg'} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={shareUrl} />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.content.substring(0, 160) + '...'} />
        <meta property="twitter:image" content={blog.image?.url || '/default-social.jpg'} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={shareUrl} />
      </Head>

      <article className="max-w-4xl mx-auto py-12 px-4 relative">
        {/* Floating Share Button */}
        <div className="fixed right-6 bottom-6 z-10">
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Share options"
          >
            <FaShareAlt size={24} />
          </button>
          
          {showShareOptions && (
            <div className="absolute right-0 bottom-16 mb-4 w-56 bg-white rounded-lg shadow-xl p-4 space-y-3">
              <h4 className="font-semibold text-gray-800 mb-2">Share this post</h4>
              
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-green-500 transition-colors"
              >
                <FaWhatsapp className="mr-3 text-green-500" size={20} />
                WhatsApp
              </a>
              
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="mr-3 text-blue-600" size={20} />
                Facebook
              </a>
              <a
      href={`https://www.instagram.com/create/story?url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
    >
      <FaInstagram className="mr-3 text-pink-600" size={20} />
      Instagram Story
    </a>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="mr-3 text-blue-400" size={20} />
                Twitter
              </a>
              
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin className="mr-3 text-blue-700" size={20} />
                LinkedIn
              </a>
              
              <a 
                href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                <MdEmail className="mr-3 text-red-500" size={20} />
                Email
              </a>
              
              <button 
                onClick={handleCopyLink}
                className="flex items-center text-gray-700 hover:text-purple-500 transition-colors w-full"
              >
                <FaLink className="mr-3 text-purple-500" size={20} />
                Copy Link
              </button>
            </div>
          )}
        </div>

        <div className="mb-8 text-center">
          {blog.category && (
            <span className="bg-blue-100 hidden text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl laila font-bold mt-4 mb-2">{blog.title}</h1>
          <p className="text-gray-500">
            Published on {formatDate(blog.createdAt || blog.date)}
          </p>
        </div>

<div className="prose glegoo max-w-none">
  {blog.image && (
    <div className="float-right ml-4 mb-4 w-full max-w-xs">
      <Image
        src={blog.image.url}
        alt={blog.title || 'Blog image'}
        width={500}
        height={300}
        className="rounded-lg object-cover"
        priority
      />
      {blog.image.caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          {blog?.blog.title}
        </p>
      )}
    </div>
  )}
 {formatContent(blog?.content)}
</div>
        {/* Inline Share Options (for mobile) */}
        <div className="mt-8 lg:hidden">
          <div className="flex items-center justify-center space-x-4">
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition-colors"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp size={28} />
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={28} />
            </a>
            <a
      href={`https://www.instagram.com/create/story?url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-600 hover:text-pink-700 transition-colors"
      aria-label="Share on Instagram"
    >
      <FaInstagram size={28} />
    </a>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-colors"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={28} />
            </a>
            <button 
              onClick={handleCopyLink}
              className="text-purple-500 hover:text-purple-600 transition-colors"
              aria-label="Copy link"
            >
              <FaLink size={28} />
            </button>
          </div>
        </div>

        {(blog.author?.image || blog.author?.name) && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-4">About the Author</h3>
            <div className="flex items-center">
              {blog.author.image && (
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={blog?.author?.image}
                    alt={blog.author.fullname || blog.author.name || 'Author image'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                {blog.author.name && (
                  <h4 className="font-medium">{blog.author.name}</h4>
                )}
                {blog.author.bio && (
                  <p className="text-gray-600 text-sm">{blog.author.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}