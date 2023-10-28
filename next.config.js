const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {  
  experimental: {
    appDir: true,
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: "cache-control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    domains: ['smartido.dev'],
    formats: ['image/avif', 'image/webp'],
    // Twitter Profile Picture
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);