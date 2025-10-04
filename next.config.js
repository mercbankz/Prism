/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  output: 'standalone',
  images: {
    domains: [
      'localhost',
      'api.dicebear.com',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
  },
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig
