/** @type {import('next').NextConfig} */
const nextConfig = {
  // Переменные окружения загружаются автоматически Next.js:
  // - npm run dev → NODE_ENV=development → загружается .env.development
  // - npm run build → NODE_ENV=production → загружается .env.production
  //
  // Если переменные не определены в .env файлах, используются fallback значения
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'production'
      ? 'https://momenttify.ru'
      : 'http://localhost:3000',
  },
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
