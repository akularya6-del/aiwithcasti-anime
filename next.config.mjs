/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['three', 'gsap', 'framer-motion', '@react-three/drei'],
  },
  transpilePackages: ['three'],
};

export default nextConfig;
