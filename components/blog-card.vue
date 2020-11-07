<template>
    <div class="c-card">
        <div class="c-card__header">
            <p class="c-card__date">
                {{ formattedPostDate }}
            </p>
            <nuxt-link
                class="c-card__title"
                :to="{
                    name: 'blog-slug',
                    params: { slug: post.slug },
                }"
                >{{ post.title }}</nuxt-link
            >
        </div>
        <div class="c-card__content">
            {{ post.description }}
        </div>
        <div class="c-card__overlay"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatAsDate } from '../helpers/datetime'

export default Vue.extend({
    props: {
        post: {
            required: true,
            type: Object,
        },
    },
    computed: {
        formattedPostDate() {
            return formatAsDate(this.$props.post.date)
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
    @apply h-40;
    @apply flex flex-col;

    &__header {
        @apply p-2 pl-6;
    }

    &__title {
        @apply text-lg;
        @apply font-bold;
        @apply m-0;
    }

    &__date {
        @apply text-gray-600 text-sm;
        @apply m-0;
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
