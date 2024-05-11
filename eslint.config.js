const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const nextCoreWebVitals = require('next/core-web-vitals');

module.exports = [
    nextCoreWebVitals,
    eslintPluginPrettierRecommended,
    {
        rules: {
            "prettier/prettier": "error",
        }
    }
];
