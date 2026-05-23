/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Hotel API Images
      {
        protocol: "https",
        hostname: "i.travelapi.com",
      },
    ],
  },
};

export default nextConfig;
