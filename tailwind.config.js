/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.coolGray,
            red: colors.red,
            yellow: colors.amber,
            blue: colors.lightBlue,
            green: colors.green,
        },
        extend: {
            colors: {
                'regal-blue': '#243c5a',
                'bleed-blue': '#3B82F6',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
