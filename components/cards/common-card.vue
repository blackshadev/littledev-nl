<template>
    <article :class="{ 'c-card': true, '-overlay': overlay }">
        <header class="c-card__header">
            <slot name="header"></slot>
        </header>
        <div class="c-card__content">
            <slot></slot>
        </div>
        <div v-if="overlay" class="c-card__overlay"></div>
    </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        overlay: {
            type: Boolean,
            default: false,
        },
    },
})
</script>

<style lang="scss" scoped>
.c-card {
    @apply relative;
    @apply rounded border border-primary;
    @apply dark:border-dark-primary;
    @apply w-full;
    @apply shadow-md;
    @apply overflow-hidden;
    @apply flex flex-col;

    &__header {
        @apply p-2 pl-6;
    }

    &__content {
        @apply pt-2 pl-6 pr-6;
        @apply overflow-hidden;
        @apply flex-shrink;
    }

    &__overlay {
        @apply absolute bottom-0;
        @apply h-8 w-full;
        @apply z-10;
        @apply bg-gradient-to-b from-transparent to-white;
        @apply dark:to-gray-900;
    }
}
</style>
