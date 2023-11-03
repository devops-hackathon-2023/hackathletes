/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/dopo-api/:path*',
        destination: 'https://dopo.fly.dev/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
