<template>
    <div class="p-home">
        <article>
            <about-me
                :name="aboutMe.name"
                :image="aboutMe.image"
                :subtitles="aboutMe.subtitles"
                :dob="aboutMe.dob"
            />
        </article>
        <div class="p-home__content">
            <nuxt-content :document="content" />
            <div class="p-home__recent">
                <section class="p-home__recent__column">
                    <h2>
                        <nuxt-link to="/projects">Latest projects</nuxt-link>
                    </h2>
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
                </section>
                <section class="p-home__recent__column">
                    <h2>
                        <nuxt-link to="/blog">Latest posts</nuxt-link>
                    </h2>
                    <div
                        v-for="blog in recentBlogPosts"
                        :key="blog.slug"
                        class="p-home__recent__item"
                    >
                        <blog-card :post="blog"></blog-card>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FIELDS } from '~/components/about-me.vue'
import { extendTagsForPosts, getTagKeysFromPosts } from '~/helpers/tags'
import { IPost, ITag } from '~/types/blog'
import getState from '~/helpers/published-state'

export default Vue.extend({
    async asyncData({ $content, params, env }) {
        const content = await $content(`pages/home`).fetch()
        const aboutMe = await $content(`pages/about`).only(FIELDS).fetch()
        const recentProjects = await $content(`projects`)
            .sortBy('date', 'desc')
            .limit(2)
            .fetch()
        const _recentBlogPosts = ((await $content(`blog/posts`)
            .where({ state: { $in: getState(env.prod) } })
            .sortBy('date', 'desc')
            .limit(2)
            .fetch()) as any) as IPost[]
        const tagsFromRecentPosts = ((await $content(`blog/tags`)
            .where({ key: { $in: getTagKeysFromPosts(_recentBlogPosts) } })
            .sortBy('title', 'asc')
            .fetch()) as any) as ITag[]

        const recentBlogPosts = extendTagsForPosts(
            _recentBlogPosts,
            tagsFromRecentPosts
        )

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
    @apply flex flex-col;

    @screen md {
        @apply flex-row;
    }

    &__content {
        @apply p-6;
    }

    &__recent {
        @apply mt-5;
        @apply flex flex-wrap flex-row;

        h2 {
            @apply text-xl;
            @apply font-bold;
            @apply mb-1 pl-3;
            @apply text-primary;

            @screen dark {
                @apply text-dark-primary;
            }
        }

        &__column {
            @apply w-full;

            &:nth-child(1) {
                @apply pr-3;
            }

            &:nth-child(2) {
                @apply pl-0;

                @screen md {
                    @apply pl-3;
                }
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
