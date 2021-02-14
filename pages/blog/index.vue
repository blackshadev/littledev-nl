<template>
    <div>
        {{ env }}
        <blog-posts :posts="posts" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { extendTagsForPosts } from '~/helpers/tags'
import { IPost, ITag } from '~/types/blog'
import getState from '~/helpers/published-state'

export default Vue.extend({
    async asyncData({ $content, params, env }) {
        const basePosts = ((await $content(`blog/posts`)
            .where({ state: { $in: getState(env.prod) } })
            .sortBy('date', 'desc')
            .fetch()) as any) as IPost[]
        const allTags = ((await $content(`blog/tags`)
            .sortBy('title', 'asc')
            .fetch()) as any) as ITag[]

        const posts = extendTagsForPosts(basePosts, allTags)

        return {
            env,
            posts,
            params,
        }
    },
})
</script>
