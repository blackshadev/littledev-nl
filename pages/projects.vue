<template>
    <section class="p-projects">
        <aside role="search" class="p-projects__filters">
            <button
                v-for="lang in languages"
                :key="`lang-${lang}`"
                :class="{
                    '--filled':
                        currentFilter !== undefined &&
                        currentFilter.type === 'languages' &&
                        currentFilter.filter === lang,
                }"
                @click="filterButtonClick('languages', lang)"
            >
                {{ lang }}
            </button>
            <button
                v-for="tech in technologies"
                :key="`tech-${tech}`"
                :class="{
                    '--filled':
                        currentFilter !== undefined &&
                        currentFilter.type === 'tech' &&
                        currentFilter.filter === tech,
                }"
                @click="filterButtonClick('tech', tech)"
            >
                {{ tech }}
            </button>
        </aside>
        <div class="p-projects__items">
            <div
                v-for="(project, index) in projects"
                :key="index"
                class="p-projects__item"
            >
                <project-card
                    class="p-projects__item__card"
                    :overlay="false"
                    :project="project"
                ></project-card>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Project } from '~/types/project'

export default Vue.extend<
    {
        projects: Project[]
        allProjects: Project[]
        languages: string[]
        technologies: string[]
        currentFilter?: {
            type: 'languages' | 'tech'
            filter: string
        }
    },
    {},
    {},
    {}
>({
    async asyncData({ $content, params }) {
        const projects = await $content(`projects`)
            .sortBy('date', 'desc')
            .fetch<Project>()

        const languages = new Set(
            projects
                .flatMap((project: Project) => project.languages ?? [])
                .sort()
        )
        const technologies = new Set(
            projects.flatMap((project: Project) => project.tech ?? []).sort()
        )

        const allProjects = projects.slice()

        return {
            allProjects,
            projects,
            languages,
            technologies,
            params,
        }
    },
    data() {
        return {
            projects: [],
            allProjects: [],
            languages: [],
            technologies: [],
            currentFilter: undefined,
        }
    },
    methods: {
        filterButtonClick(field: 'languages' | 'tech', filter: string) {
            if (
                this.currentFilter?.type === field &&
                this.currentFilter?.filter === filter
            ) {
                this.currentFilter = undefined
                this.projects = this.allProjects.slice()
                return
            }

            this.currentFilter = {
                type: field,
                filter,
            }

            this.projects = this.allProjects.filter((project) =>
                (project[field] ?? []).includes(filter)
            )
        },
    },
})
</script>

<style lang="scss" scoped>
.p-projects {
    &__filters {
        @apply mb-4;

        button {
            @apply px-4 py-2 m-2 rounded;
            @apply border-primary border text-primary;

            &.--filled {
                @apply bg-primary text-white;
            }
        }
    }

    &__items {
        @apply flex flex-wrap;
        @apply p-3;
    }

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
