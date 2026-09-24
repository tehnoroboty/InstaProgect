/** @type {import('next').NextConfig} */
const nextConfig = {
  // Переменные окружения загружаются автоматически Next.js из .env файлов:
  // - npm run dev → NODE_ENV=development → загружается .env.development
  // - npm run build → NODE_ENV=production → загружается .env.production
  // Все переменные NEXT_PUBLIC_* из .env файлов автоматически доступны в коде
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        protocol: 'https',
      },
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
        resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
};

export default nextConfig;
