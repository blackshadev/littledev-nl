<template>
    <div class="c-card">
        <div class="c-card__header">
            <nuxt-link
                class="c-card__title"
                :to="{
                    name: 'blog-slug',
                    params: { slug: post.slug },
                }"
                >{{ post.title }}</nuxt-link
            >
            <p class="c-card__date">
                <font-awesome-icon :icon="['far', 'clock']" />
                {{ formattedPostDate }}
            </p>
        </div>
        <div class="c-card__content">
            <img class="c-card__img" />
            <p>{{ post.description }}</p>
        </div>
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
    @apply rounded border border-gray-600;
    @apply w-full;

    &__header {
        @apply p-2 pl-6;
        @apply border-b border-gray-600;
    }

    &__title {
        @apply text-lg;
        @apply font-bold;
    }

    &__date {
        @apply text-gray-600 text-sm;
    }

    &__content {
        @apply p-1;
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
