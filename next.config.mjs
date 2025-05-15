/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // List of allowed domains for next/image
    domains: [
      'res.cloudinary.com',
      'localhost' // if you test locally
    ],
    
    // Alternative advanced configuration (Next.js 12+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '5000',
        pathname: '/dglmtpj1j/**', // Replace with your Cloudinary cloud name
      },
    ],
    
    // Optional Cloudinary loader configuration
   // loader: 'cloudinary',
   // path: 'https://res.cloudinary.com/dglmtpj1j/', // Your Cloudinary base URL
    
    // Image optimization settings
    //deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
   // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
   // minimumCacheTTL: 60, // 60 seconds minimum cache
  },
  
/*   // Enable experimental features if needed
  experimental: {
    appDir: true, // If using Next.js 13+ App Router
    serverActions: true, // If using Next.js 13.4+ server actions
  }, */
  
}
export default nextConfig