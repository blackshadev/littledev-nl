<template>
    <div class="p-about">
        <about-me
            :name="content.name"
            :image="content.image"
            :dob="content.dob"
            :subtitles="content.subtitles"
        />
        <div class="p-about__content">
            <h1>About me</h1>
            <nuxt-content :document="content" />
            <div class="p-about__skills">
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
                <div class="p-about__skills_frameworks">
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

export default Vue.extend({
    async asyncData({ $content, params }) {
        const content = await $content(`pages/about`).fetch()

        return {
            content,
            params,
        }
    },
})
</script>

<style lang="scss" scoped>
.p-about {
    @apply flex flex-col;

    @screen md {
        @apply flex-row;
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

    &__content {
        @apply p-6;
    }
}
</style>
