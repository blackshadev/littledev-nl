/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.violet['900'],
                link: colors.violet['800'],
                sub: colors.gray['700'],
                tag: colors.violet['300'],
                nav: colors.violet['700'],

                'dark-primary': colors.violet['500'],
                'dark-link': colors.violet['400'],
                'dark-sub': colors.gray['300'],
                'dark-tag': colors.violet['900'],
                'dark-nav': colors.violet['800'],
            },
            fontFamily: {
                fancy: ['Oxygen', 'sans-serif'],
                sans: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
