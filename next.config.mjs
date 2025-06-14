import withPWA from 'next-pwa';

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
  // Removed experimental.removeDefaultFavicon as it's no longer supported
};

const pwaConfig = withPWA({
  dest: 'public',
  runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst'
      }
    ],
    dynamicStartUrl: true,
    sw: 'sw.js',
    publicExcludes: ['!nopwa/**/*'],
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});



export default pwaConfig({
  ...nextConfig,
});