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
img[src*='right'] {
    @apply float-right;
}

p {
    @apply mb-3;
}

ol {
    @apply list-decimal list-inside;
    @apply mb-3;
}

h1,
h2,
h3 {
    @apply text-primary;

    @screen dark {
        @apply text-dark-primary;
    }
}
a svg,
p a {
    @apply text-link;

    @screen dark {
        a svg,
        p a {
            @apply text-dark-link;
        }
    }
}

@screen dark {
    body {
        @apply bg-black;
        @apply text-white;
    }
}
</style>
