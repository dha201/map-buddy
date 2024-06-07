/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'maps.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'api.deepai.org',
            },
            {
                protocol: 'https',
                hostname: 'serpapi.com',
            }
        ],
    },
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                child_process: false,
                net: false,
                tls: false,
            };
        }

        config.module.rules.push({
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        });

        return config;
    },
};

export default nextConfig;
