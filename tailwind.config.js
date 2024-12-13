/** @type {import('tailwindcss').Config} */
import { violet, gray } from 'tailwindcss/colors';

export const content = [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
];
export const darkMode = 'class';
export const theme = {
    extend: {
        colors: {
            primary: violet['900'],
            link: violet['800'],
            sub: gray['700'],
            tag: violet['300'],
            nav: violet['700'],

            'dark-primary': violet['500'],
            'dark-link': violet['400'],
            'dark-sub': gray['300'],
            'dark-tag': violet['900'],
            'dark-nav': violet['800'],
        },
        fontFamily: {
            fancy: ['Oxygen', 'sans-serif'],
            sans: ['Roboto', 'sans-serif'],
        },
    },
};
export const plugins = [];
