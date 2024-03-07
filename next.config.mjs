/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['katon-dev-uploads.s3.eu-central-1.amazonaws.com'],
  },
};

export default nextConfig;
