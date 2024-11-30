/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Static HTML 내보내기 설정
  basePath: process.env.NODE_ENV === "production" ? "/junto_cal_bot" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
