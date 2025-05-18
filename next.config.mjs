/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dglmtpj1j/**',
      },
    ],
  },
  experimental: {
    removeDefaultFavicon: true
  }
  // Add this experimental configuration
 
}

export default nextConfig