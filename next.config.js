/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/junto_cal_bot" : "",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/junto_cal_bot/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
