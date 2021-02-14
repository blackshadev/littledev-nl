const config = {
    env: {
        dev: false, // process.env.NODE_ENV !== 'production',
    },
    // Target (https://go.nuxtjs.dev/config-target)
    target: 'static',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Littledev',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'The website of the Littledev',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/fontawesome',
        '@nuxtjs/google-fonts',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Content module configuration (https://go.nuxtjs.dev/config-content)
    content: {
        nestedProperties: ['tags.tag'],
        markdown: {
            prism: {
                theme: 'prism-themes/themes/prism-a11y-dark.css',
            },
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
    fontawesome: {
        icons: {
            solid: ['faLink'],
            regular: [],
            brands: ['faGithub'],
        },
    },
    googleFonts: {
        families: {
            Oxygen: true,
            Roboto: {
                wght: [300],
            },
        },
        display: 'swap',
    },
}

if (process.env.BASE_PATH) {
    config.router = {
        base: process.env.BASE_PATH,
    }
}

export default config
