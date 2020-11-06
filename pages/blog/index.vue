<template>
    <div class="p-blog-index">
        <blog-card :post="featuredPost" class="-featured"></blog-card>

        <div class="c-grid">
            <div v-for="post in allPosts" :key="post.slug" class="c-grid__item">
                <blog-card :post="post"></blog-card>
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
    computed: {
        featuredPost() {
            return this.$data.posts[0]
        },
        allPosts() {
            return this.$data.posts.slice(1)
        },
    },
})
</script>

<style lang="scss" scoped>
.p-blog-index {
    @apply pt-3;
}

.c-grid {
    @apply flex flex-wrap;

    &__item {
        @apply flex-none;
        @apply w-full;
        @apply ml-0 mt-4;

        &:first-child {
            @apply ml-0;
        }

        @screen md {
            @apply w-1/2;
            @apply px-2;

            &:first-child {
                @apply pl-0;
            }
            &:last-child {
                @apply pr-0;
            }
        }
    }
}
</style>
