<template>
    <div>
        <a class="sr-only focus:not-sr-only" href="#content">Naar content</a>
        <main-navigation />
        <main id="content" class="c-main-content container">
            <Nuxt />
        </main>
    </div>
</template>

<style lang="scss">
.c-main-content {
    @apply mx-auto;
    @apply mt-6;
}

p a {
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

h3 {
    @apply text-lg font-medium;
    @apply mt-4;
}

p {
    @apply mb-3;
}

h1,
h2,
h3 {
    @apply font-bold;
    @apply text-primary;

    @screen dark {
        @apply text-dark-primary;
    }
}

a svg,
p a {
    @apply text-link;

    @screen dark {
        @apply text-dark-link;
    }
}

@screen dark {
    body {
        @apply bg-gray-900;
        @apply text-gray-100;
    }
}
</style>
