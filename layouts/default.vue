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

a svg {
    @apply text-purple-800;
}

p a {
    @apply underline;
    @apply text-purple-800;
}

h1 {
    @apply text-2xl font-bold;
    @apply my-3;
    @apply text-purple-900;
}
h2 {
    @apply text-xl font-medium;
    @apply mt-4;
    @apply text-purple-900;
}
h3 {
    @apply text-lg font-medium;
    @apply mt-4;
    @apply text-purple-900;
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
</style>
