<template>
    <common-card class="c-blog-card" :overlay="true">
        <template #header>
            <p class="c-blog-card__date">
                {{ formattedPostDate }}
            </p>
            <h3 class="c-blog-card__title">
                <nuxt-link
                    :to="{
                        name: 'blog-slug',
                        params: { slug: post.slug },
                    }"
                    >{{ post.title }}</nuxt-link
                >
            </h3>
            <div class="c-blog-card__tags">
                <nuxt-link
                    v-for="tag in post.tags"
                    :key="tag.key"
                    class="c-blog-card__tag"
                    :to="{
                        name: 'blog-by-tag-tag',
                        params: { tag: tag.key },
                    }"
                >
                    {{ tag.title }}
                </nuxt-link>
            </div>
        </template>

        {{ post.description }}
    </common-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatAsDate } from '~/helpers/datetime'

export default Vue.extend({
    name: 'BlogCard',
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
.c-blog-card {
    @apply h-40;

    &__title {
        @apply font-bold;
        @apply m-0 mb-2;
        @apply text-primary dark:text-dark-primary;
    }

    &__date {
        @apply text-sub text-sm dark:text-dark-sub;
        @apply m-0;
    }

    &__tag {
        @apply mr-1 p-1;
        @apply bg-tag dark:bg-dark-tag;
        @apply rounded;
    }
}
</style>
