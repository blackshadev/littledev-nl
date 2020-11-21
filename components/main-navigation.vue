<template>
    <div class="c-main-navigation">
        <nav class="container">
            <nuxt-link class="-main" to="/" active-class="-active"
                >Littledev</nuxt-link
            >
            <ul class="c-main-navigation__items">
                <li>
                    <nuxt-link to="/about" active-class="-active"
                        >About</nuxt-link
                    >
                </li>
                <li>
                    <nuxt-link to="/blog" active-class="-active"
                        >Blog</nuxt-link
                    >
                </li>
                <li>
                    <nuxt-link to="/projects" active-class="-active"
                        >Projects</nuxt-link
                    >
                </li>
                <li>
                    <a href="https://github.com/blackshadev/" alt="Github">
                        <font-awesome-icon :icon="['fab', 'github']" />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style lang="scss" scoped>
.c-main-navigation {
    @apply bg-nav;
    @apply py-3;

    a,
    a svg {
        @apply text-white no-underline;
    }

    nav {
        @apply mx-auto;
        @apply flex justify-between flex-wrap;
    }

    .-main {
        @apply mx-3;
        @apply text-xl font-fancy;
    }

    &__items {
        @apply flex;

        li {
            @apply px-3;

            .-active {
                @apply underline;
            }
        }
    }

    @screen dark {
        @apply bg-dark-nav;
    }
}
</style>
