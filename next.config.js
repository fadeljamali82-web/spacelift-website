/**
 * Minimal Next.js config: disable built-in image optimization.
 * This is a safe fallback if the Vercel image optimizer is causing mobile-specific failures.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
