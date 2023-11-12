/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: "/prihlaseni",
        destination: "/auth/sign-in",
      },
      {
        source: "/zapomenute-heslo",
        destination: "/auth/forgotten-password",
      },
      {
        source: "/reset-hesla",
        destination: "/auth/password-reset",
      },
      {
        source: "/registrace",
        destination: "/registration",
      },
      {
        source: "/profil",
        destination: "/profile",
      },
      {
        source: "/profil/pratele",
        destination: "/profile/friends",
      },
      {
        source: "/lovereport/vyplneni",
        destination: "/lovereport/create",
      },
      {
        source: "/lovereport/shrnuti",
        destination: "/lovereport/summary",
      },
      {
        source: "/seznamka",
        destination: "/dating-site"
      },
      {
        source: '/lovereport/vysledek',
        destination: '/lovereport/result'
      }
    ];
  },
  images: {
    domains: [
      "unsplash.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "mingly.cz",
      "wikipedia.org",
      "gravatar.com",
      "www.gravatar.com",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
