/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
};

module.exports = nextConfig;
