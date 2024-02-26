/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        formats: ["image/avif", "image/webp"],
        // Images from cat api are hosted on different domains. So we allow all for now.
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};
