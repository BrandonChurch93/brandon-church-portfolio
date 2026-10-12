/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Retired project; send old links to the archive.
      {
        source: "/projects/ai-cover-letter-generator",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
