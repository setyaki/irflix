/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"]
  },
  pageExtensions: ['js','jsx','ts','tsx']
}

module.exports = nextConfig
