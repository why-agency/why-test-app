/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        formats: ["image/avif", "image/webp"],

        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn2.thecatapi.com",
                port: "",
                pathname: "/images/**",
            },
        ],
    },
};
