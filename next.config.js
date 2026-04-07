/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar', 'fr', 'tr', 'so', 'ti', 'bn'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
