import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dglmtpj1j/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
   /* experimental: {
    missingSuspenseWithCSRBailout: false,
  } */
  // Removed experimental.removeDefaultFavicon as it's no longer supported
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});



export default pwaConfig({
  ...nextConfig,
});