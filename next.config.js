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
        source: "/profil/lovereport",
        destination: "/profile/lovereport",
      },
      {
        source: "/profil/lovereport/vyplneni",
        destination: "/profile/lovereport/create",
      },
    ];
  },
  images: {
    domains: ["unsplash.com", "images.unsplash.com", "res.cloudinary.com", "www.gravatar.com"],
  },
};

module.exports = nextConfig;
