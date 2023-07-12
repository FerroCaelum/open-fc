/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        typedRoutes: true,
        appDir: true,
    },
    reactStrictMode: true,
}

module.exports = nextConfig
