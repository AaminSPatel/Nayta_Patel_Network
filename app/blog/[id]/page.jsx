import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentLengthWarningElement } from "../../../lib/minWords";
import { DashboardTitle } from "../../../components/DashboardTitle";
import { format } from "date-fns";
import { FaArrowRight, FaFacebook, FaInstagram, FaLinkedin, FaLink, FaShareAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export async function generateMetadata({ params }) {
  const { id } = params;

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const siteBase =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const blogRes = await fetch(`${apiBase}/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!blogRes.ok) {
    return {
      title: "Blog not found",
      description: "Blog post not found",
      alternates: { canonical: `${siteBase}/blog/${id}` },
    };
  }

  const blog = await blogRes.json();

  const plainText =
    typeof blog?.content === "string" ? blog.content : "";
  const description =
    plainText.slice(0, 160) + (plainText.length > 160 ? "..." : "");

  const url = `${siteBase}/blog/${id}`;
  const ogImage = blog?.image?.url || `${siteBase}/hom2.jpg`;

  return {
    title: blog?.title ? `${blog.title} | Nayta Patel Network` : "Blog",
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: blog?.title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog?.title || "Blog image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.title,
      description,
      images: [ogImage],
    },
  };
}

async function getBlogById(id) {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${apiBase}/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

async function getAllBlogs() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${apiBase}/api/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

function formatDateISO(dateLike) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function BlogDetail({ params }) {
  const { id } = params;

  const blog = await getBlogById(id);
  if (!blog) notFound();

  const allBlogs = await getAllBlogs();

  const related = allBlogs.filter((b) => {
    if (b?._id === blog?._id) return false;
    const sameCategory = b?.category && b?.category === blog?.category;
    const sharedTags =
      Array.isArray(b?.tags) &&
      Array.isArray(blog?.tags) &&
      b.tags.some((t) => blog.tags.includes(t));
    return sameCategory || sharedTags;
  });

  const relatedPosts = related.length > 0 ? related.slice(0, 4) : allBlogs.slice(0, 4);

  const siteBase =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const shareUrl = `${siteBase}/blog/${id}`;
  const shareText = `Check out this blog: ${blog.title}`;

  const warningEl =
    typeof blog?.content === "string"
      ? getContentLengthWarningElement({
          content: blog.content,
          minWords: 400,
          devLabel: "Blog SEO",
        })
      : null;

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 relative">
      <div className="mb-8 text-center">
        {blog.category && (
          <span className="bg-blue-100 hidden text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {blog.category}
          </span>
        )}

        {/* Exactly one semantic H1 */}
        <div className="mt-4 mb-2">
          <DashboardTitle title={blog.title} />
        </div>

        <p className="text-gray-500">
          Published on {formatDateISO(blog.createdAt || blog.date)}
        </p>

        {warningEl}
      </div>

      <div className="prose max-w-none">
        {blog.image?.url && (
          <div className="float-right ml-4 mb-4 w-full max-w-xs">
            <img
              src={blog.image.url}
              alt={blog.title || "Blog image"}
              width={500}
              height={300}
              className="rounded-lg object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Server-visible text for SEO (no client formatting hooks) */}
        <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {blog.content}
        </p>
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-6">You might also like</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post._id}`}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={post.image?.url || "/default-blog.jpg"}
                    alt={post.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <span className="text-sm text-blue-600 font-medium">
                    {post.category}
                  </span>
                  <h4 className="text-lg font-semibold mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt || post.content?.substring(0, 100) + "..."}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Read more <FaArrowRight className="ml-1" size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 lg:hidden">
        <div className="flex items-center justify-center space-x-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
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

          <a
            href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(shareText + " " + shareUrl)}`}
            className="text-purple-500 hover:text-purple-600 transition-colors"
            aria-label="Share via email"
          >
            <FaLink size={28} />
          </a>

          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={28} />
          </a>
        </div>

        {/* Note: copy-to-clipboard needs a client component; omitted to keep SEO SSR-only */}
      </div>

      {(blog.author?.image || blog.author?.name) && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-4">About the Author</h3>
          <div className="flex items-center">
            {blog.author?.image && (
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <img
                  src={blog.author.image}
                  alt={blog.author.fullname || blog.author.name || "Author image"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            )}
            <div>
              {blog.author?.name && (
                <h4 className="font-medium">{blog.author.name}</h4>
              )}
              {blog.author?.bio && (
                <p className="text-gray-600 text-sm">{blog.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
