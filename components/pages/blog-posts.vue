<template>
    <div class="p-blog-index">
        <div class="c-grid">
            <div v-for="post in posts" :key="post.slug" class="c-grid__item">
                <blog-card :post="post"></blog-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        posts: {
            required: true,
            type: Array,
        },
    },
})
</script>

<style lang="scss" scoped>
.p-blog-index {
    @apply p-3;
}

.c-grid {
    @apply flex flex-wrap;

    &__item {
        @apply flex-none;
        @apply w-full;
        @apply ml-0 mb-4;

        &:first-child {
            @apply ml-0;
        }

        @screen md {
            @apply w-1/2;
            &:nth-child(1n) {
                @apply px-2;
            }
            &:nth-child(2n) {
                @apply px-2;
            }
        }
    }
}
</style>
