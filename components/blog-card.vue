<template>
    <common-card class="c-blog-card" :overlay="true">
        <template v-slot:header>
            <p class="c-blog-card__date">
                {{ formattedPostDate }}
            </p>
            <nuxt-link
                class="c-blog-card__title"
                :to="{
                    name: 'blog-slug',
                    params: { slug: post.slug },
                }"
                >{{ post.title }}</nuxt-link
            >
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
        @apply text-lg;
        @apply font-bold;
        @apply m-0;
    }

    &__date {
        @apply text-gray-600 text-sm;
        @apply m-0;
    }
}
</style>
