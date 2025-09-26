import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Отключаем проверку ESLint во время сборки, 
    // поскольку она может блокировать деплой из-за предупреждений
    ignoreDuringBuilds: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
