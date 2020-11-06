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
            </ul>
        </nav>
    </div>
</template>
<style lang="less" scoped>
.c-main-navigation {
    @apply bg-primary text-white;
    @apply py-3;

    nav {
        @apply mx-auto;
        @apply flex justify-between flex-wrap;
    }
    .-main {
        @apply mr-6;
        @apply font-bold text-xl;
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
}
</style>
