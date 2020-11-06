<template>
    <div>
        <div class="c-post-header">
            <h1>{{ content.title }}</h1>
        </div>

        <div class="content">
            <p class="short">{{ content.description }}</p>
            <nuxt-content :document="content" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const content = await $content(`blog/posts/${params.slug}`).fetch()

        return {
            content,
            params,
        }
    },
})
</script>
