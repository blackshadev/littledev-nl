// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.purple['900'],
                link: colors.purple['800'],
                sub: colors.gray['700'],
                tag: colors.purple['300'],
                nav: colors.purple['700'],

                'dark-primary': colors.purple['500'],
                'dark-link': colors.purple['400'],
                'dark-sub': colors.gray['300'],
                'dark-tag': colors.purple['900'],
                'dark-nav': colors.purple['800'],
            },
            fontFamily: {
                fancy: ['Oxygen', 'sans-serif'],
                sans: ['Roboto', 'sans-serif'],
            },
        },
    },
}
