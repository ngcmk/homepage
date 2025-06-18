const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'mail.ngcmk.mk',
          },
        ],
        destination: 'https://sven.mk-host4.com:2096/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
