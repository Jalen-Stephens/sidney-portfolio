import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      // IMAGEKIT INTEGRATION: Uncomment when connecting ImageKit DAM
      // {
      //   protocol: "https",
      //   hostname: "ik.imagekit.io",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
