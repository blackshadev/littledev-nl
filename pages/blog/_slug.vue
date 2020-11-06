<template>
    <div class="container">
        <h1>Blog: {{ content.title }}</h1>
        <h3 class="time">{{ content.date }}</h3>
        <p class="short">{{ content.description }}</p>
        <div class="content">
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
