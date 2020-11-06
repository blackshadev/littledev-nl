<template>
    <div class="p-blog-index">
        <div class="c-cards">
            <div v-for="post in posts" :key="post.slug" class="c-card">
                <div class="c-card__title">
                    <nuxt-link
                        :to="{ name: 'blog-slug', params: { slug: post.slug } }"
                        >{{ post.title }}</nuxt-link
                    >
                </div>
                <div class="c-card__content">
                    <img class="c-card__img" />
                    <p>{{ post.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const posts = await $content(`blog/posts`).fetch()
        return {
            posts,
            params,
        }
    },
})
</script>

<style lang="less" scoped>
.p-blog-index {
    @apply pt-3;
}

.c-card {
    @apply rounded border border-purple-400;
    @apply w-full h-32;

    &__title {
        @apply font-bold;
        @apply p-2 pl-6;
        @apply border-b border-purple-400;
    }

    &__content {
        @apply p-1;
    }
}

.c-cards {
    @apply: flex;

    .c-card {
        @apply w-4/12;
    }
}
</style>
