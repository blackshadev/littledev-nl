<template>
    <div>
        <main-navigation />
        <div class="c-main-content container">
            <Nuxt />
        </div>
    </div>
</template>

<style lang="scss">
.c-main-content {
    @apply mx-auto;
    @apply mt-6;
}

.nuxt-content-container {
    a {
        @apply underline;
    }

    h1 {
        @apply text-2xl font-bold;
        @apply my-3;
    }
    h2 {
        @apply text-xl font-medium;
        @apply mt-4;
    }
    img[src*='right'] {
        @apply float-right;
    }

    p {
        @apply mb-3;
    }
}
</style>
