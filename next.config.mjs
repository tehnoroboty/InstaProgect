/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'production'
            ? 'https://momenttify.store'
            : 'http://localhost:3000',
    },
    images: {//TODO!: временное решение для тестов, потом удалить надо!
        domains: [
            'images.squarespace-cdn.com',
            'catastic.pet',
        ],
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                resourceQuery: /url/, // *.svg?url
                test: /\.svg$/i,
            },
            {
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                test: /\.svg$/i,
                use: ['@svgr/webpack'],
            },
        )

        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
};

export default nextConfig;
