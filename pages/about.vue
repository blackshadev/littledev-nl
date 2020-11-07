<template>
    <div class="p-about">
        <div class="p-about__me">
            <div class="p-about__me__image">
                <img :src="content.image" />
            </div>
            <p class="p-about__me__name">{{ content.name }}</p>
            <p class="p-about__me__subtitle">
                {{ randomSubtitle.description }}
            </p>
            <p class="p-about__me__dob">{{ content.dob }}</p>
        </div>
        <div class="p-about__content">
            <nuxt-content :document="content" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { sample } from '../helpers/random'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const content = await $content(`pages/about`).fetch()

        return {
            content,
            params,
        }
    },
    computed: {
        randomSubtitle() {
            return sample(this.$data.content.subtitles)
        },
    },
})
</script>

<style lang="scss" scoped>
.p-about {
    &__me {
        @apply flex items-center flex-col;
        @apply w-full;

        &__image {
            @apply rounded-full;
            @apply w-48 h-48;
            @apply overflow-hidden;
        }

        &__subtitle {
            @apply text-gray-600;
        }
        &__dob {
            @apply text-gray-600;
            @apply text-sm;
        }
    }
}
</style>
