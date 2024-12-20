import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '', // Để trống cho port mặc định
                pathname: '/**', // Cho phép tất cả các đường dẫn
            },
        ],
    },
};

export default nextConfig;
