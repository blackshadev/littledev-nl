const withExportImages = require('next-export-optimize-images');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = withExportImages(nextConfig);
