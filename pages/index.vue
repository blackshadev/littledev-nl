<template>
    <div class="p-home">
        <about-me
            :name="aboutMe.name"
            :image="aboutMe.image"
            :subtitles="aboutMe.subtitles"
            :dob="aboutMe.dob"
        />
        <div class="p-home__content">
            <nuxt-content :document="content" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FIELDS } from '~/components/about-me.vue'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const content = await $content(`pages/home`).fetch()
        const aboutMe = await $content(`pages/about`).only(FIELDS).fetch()
        const recentProjects = await $content(`projects`)
            .sortBy('date', 'desc')
            .limit(2)
            .fetch()
        const recentBlogPosts = await $content(`blog/posts`)
            .sortBy('date', 'desc')
            .limit(2)
            .fetch()

        return {
            aboutMe,
            content,
            params,
            recentBlogPosts,
            recentProjects,
        }
    },
})
</script>

<style lang="scss" scoped>
.p-home {
    @apply flex flex-row;
}
</style>
