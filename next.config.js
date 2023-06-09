/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/kontakt',
                destination: 'https://tvojelaska.cz/kontakt-2/',
            },
        ];
    },
}

module.exports = nextConfig
