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
            <div class="p-home__recent">
                <div class="p-home__recent__column">
                    <h2>Latest projects</h2>
                    <div
                        v-for="project in recentProjects"
                        :key="project.slug"
                        class="p-home__recent__item"
                    >
                        <project-card
                            :project="project"
                            :overlay="true"
                        ></project-card>
                    </div>
                </div>
                <div class="p-home__recent__column">
                    <h2>Latest posts</h2>
                    <div
                        v-for="blog in recentBlogPosts"
                        :key="blog.slug"
                        class="p-home__recent__item"
                    >
                        <blog-card :post="blog"></blog-card>
                    </div>
                </div>
            </div>
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

    &__content {
        @apply p-6;

        ::v-deep .nuxt-content-container {
            p {
                @apply pb-2;
            }
        }
    }

    &__recent {
        @apply mt-5;
        @apply flex flex-wrap flex-row;

        h2 {
            @apply text-lg;
            @apply mb-1 pl-3;
        }

        &__column {
            @apply w-full;

            &:nth-child(1) {
                @apply pr-3;
            }

            &:nth-child(2) {
                @apply pl-3;
            }

            @screen md {
                @apply w-1/2;
            }
        }

        &__item {
            @apply mb-3;
        }
    }
}
</style>
