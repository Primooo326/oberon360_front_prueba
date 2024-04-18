const path = require('path')
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
        // Will be available on both server and client
        NEXT_PUBLIC_API_URL: process.env.API_URL,
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        JWT_SECRET: process.env.JWT_SECRET,
    },
}

module.exports = nextConfig
