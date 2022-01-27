<template>
    <article class="c-post">
        <header class="c-post__header">
            <img v-if="image" :src="image" />
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
        image() {
            if (!this.$data.content.image) {
                return undefined
            }

            return require(`~/assets/images/blogs/${this.$data.content.image}`)
        },
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

        img {
            @apply w-full h-96 object-cover object-center mb-6 rounded shadow;
        }
    }

    &__content {
        p {
            @apply mb-6;
        }

        ::v-deep {
            img[src*='right'] {
                @apply float-right;
            }

            ol {
                @apply list-decimal list-inside;
                @apply mb-3;
            }

            ul {
                @apply mb-3 ml-3;
                @apply list-inside list-disc;
            }
        }
    }
}
</style>
