/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
    appDir: true,
  },
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
};

module.exports = nextConfig;
