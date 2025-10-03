/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    domains: [
      'localhost',
      'api.dicebear.com',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
  },
}

module.exports = nextConfig
