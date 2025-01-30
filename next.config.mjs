import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      process.env.NODE_ENV === 'production'
        ? {
            protocol: 'https',
            hostname: 'your-production-url.com',
            pathname: '/media/**',
          }
        : {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/api/media/**',
          },
    ],
  },
}

export default withPayload(nextConfig)
