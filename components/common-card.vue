<template>
    <div class="c-card">
        <div class="c-card__header">
            <slot name="header"></slot>
        </div>
        <div class="c-card__content">
            <slot></slot>
        </div>
        <div v-if="overlay" class="c-card__overlay"></div>
    </div>
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
    @apply rounded border border-gray-600;
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
    }

    &.-featured {
        @apply border-purple-800;

        .c-card__header {
            @apply bg-purple-800;
            @apply text-white;
        }

        .c-card__date {
            @apply text-gray-500;
        }
    }
}
</style>
