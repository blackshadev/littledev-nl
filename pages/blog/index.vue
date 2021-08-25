<template>
    <div>
        <h1>Blog posts</h1>
        <blog-posts :posts="posts" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { extendTagsForPosts } from '~/helpers/tags'
import { IPost, ITag } from '~/types/blog'
import getState from '~/helpers/published-state'
import blogPosts from '~/components/pages/blog-posts.vue'

export default Vue.extend({
    components: { blogPosts },
    async asyncData({ $content, params, env }) {
        const basePosts = (await $content(`blog/posts`)
            .where({ state: { $in: getState(env.env) } })
            .sortBy('date', 'desc')
            .fetch()) as any as IPost[]
        const allTags = (await $content(`blog/tags`)
            .sortBy('title', 'asc')
            .fetch()) as any as ITag[]

        const posts = extendTagsForPosts(basePosts, allTags)

        return {
            env,
            posts,
            params,
        }
    },
})
</script>

<style lang="scss" scoped>
h1 {
    @apply mx-5;
}
</style>
