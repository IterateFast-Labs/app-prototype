import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
};

export default withNextIntl(nextConfig);
