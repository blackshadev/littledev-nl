<template>
    <blog-posts :posts="posts" />
</template>

<script lang="ts">
import Vue from 'vue'
import { extendTagsForPosts } from '~/helpers/tags'
import { IPost, ITag, State } from '~/types/blog'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const basePosts = ((await $content(`blog/posts`)
            .sortBy('date', 'desc')
            .fetch()) as any) as IPost[]
        const allTags = ((await $content(`blog/tags`)
            .where({ state: { $eq: State.Published } })
            .sortBy('title', 'asc')
            .fetch()) as any) as ITag[]

        const posts = extendTagsForPosts(basePosts, allTags)

        return {
            posts,
            params,
        }
    },
})
</script>
