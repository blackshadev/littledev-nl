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
            <div class="p-about__me__skills">
                <div class="p-about__me__skills_languages">
                    <h3>Languages</h3>
                    <ul>
                        <li
                            v-for="(skill, index) in content.skills.filter(
                                (v) => v.type === 'language'
                            )"
                            :key="index"
                        >
                            {{ skill.description }}
                        </li>
                    </ul>
                </div>
                <div class="p-about__me__skills_frameworks">
                    <h3>Frameworks</h3>
                    <ul>
                        <li
                            v-for="(skill, index) in content.skills.filter(
                                (v) => v.type === 'framework'
                            )"
                            :key="index"
                        >
                            {{ skill.description }}
                        </li>
                    </ul>
                </div>
            </div>
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
    @apply flex;

    &__me {
        @apply flex items-center flex-col;
        @apply mx-3;

        &__image {
            @apply rounded-full;
            @apply w-48 h-48;
            @apply overflow-hidden;
            @apply mb-3;
        }

        &__subtitle {
            @apply text-gray-600;
        }

        &__dob {
            @apply text-gray-600;
            @apply text-sm;
        }

        &__skills {
            @apply flex justify-evenly flex-wrap;

            div {
                @apply mt-12;
                @apply w-full;
                @apply flex-none;

                @screen sm {
                    @apply w-auto;
                }
            }

            ul {
                @apply list-disc;
                @apply ml-6 mt-3;
            }

            h3 {
                @apply text-xl;
            }
        }
    }

    &__content {
        @apply p-6;
    }
}
</style>
