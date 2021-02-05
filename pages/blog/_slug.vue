<template>
    <article class="c-post">
        <header class="c-post__header">
            <p class="c-post__date">{{ formattedContentDate }}</p>
            <h1>{{ content.title }}</h1>
        </header>

        <div class="c-post__content">
            <p class="short">{{ content.description }}</p>
            <nuxt-content :document="content" />
        </div>
    </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatAsDate } from '~/helpers/datetime'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const content = await $content(`blog/posts/${params.slug}`).fetch()

        return {
            content,
            params,
        }
    },
    computed: {
        formattedContentDate() {
            return formatAsDate(this.$data.content.date)
        },
    },
})
</script>

<style lang="scss" scoped>
.c-post {
    @apply p-3;

    &__date {
        @apply text-sub text-sm;

        @screen dark {
            @apply text-dark-sub;
        }
    }
    &__header {
        h1 {
            @apply mt-0;
        }
    }

    &__content {
        p {
            @apply mb-6;
        }
    }
}
</style>
