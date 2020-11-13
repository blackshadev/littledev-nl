<template>
    <common-card class="c-blog-card" :overlay="true">
        <template v-slot:header>
            <p class="c-blog-card__date">
                {{ formattedPostDate }}
            </p>
            <h3 class="c-blog-card__title">
                <nuxt-link
                    :to="{
                        name: 'blog-slug',
                        params: { slug: post.slug },
                    }"
                    >{{ post.title }}</nuxt-link
                >
            </h3>
            <div class="c-blog__tags">
                <span v-for="tag in post.tags" :key="tag.tag">
                    {{ tag }}
                </span>
            </div>
        </template>

        {{ post.description }}
    </common-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatAsDate } from '../helpers/datetime'

export default Vue.extend({
    props: {
        post: {
            required: true,
            type: Object,
        },
    },
    computed: {
        formattedPostDate() {
            return formatAsDate(this.$props.post.date)
        },
    },
})
</script>

<style lang="scss" scoped>
.c-blog-card {
    @apply h-40;

    &__title {
        @apply font-bold;
        @apply m-0;
        @apply text-purple-900;
    }

    &__date {
        @apply text-gray-600 text-sm;
        @apply m-0;
    }
}
</style>
