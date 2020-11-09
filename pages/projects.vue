<template>
    <div class="p-projects">
        <div
            v-for="(project, index) in projects"
            :key="index"
            class="p-projects__item"
        >
            <project-card
                class="p-projects__item__card"
                :project="project"
            ></project-card>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const projects = await $content(`projects`)
            .sortBy('date', 'desc')
            .fetch()

        return {
            projects,
            params,
        }
    },
})
</script>

<style lang="scss" scoped>
.p-projects {
    @apply flex flex-wrap;
    @apply p-3;

    &__item {
        @apply flex-none;
        @apply mb-4;
        @apply w-full;

        @screen md {
            @apply w-1/2;
        }

        &:nth-child(2n) {
            @screen md {
                @apply pl-3;
            }
        }

        &__card {
            @apply h-full;
        }
    }
}
</style>
