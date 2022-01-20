<template>
    <section class="p-projects">
        <aside role="search" class="p-projects__filters">
            <h3>Languages</h3>
            <button
                v-for="lang in languages"
                :key="`${lang.type}-${lang.value}`"
                :class="{
                    '--filled':
                        currentFilter !== undefined &&
                        currentFilter.type === lang.type &&
                        currentFilter.value === lang.value,
                }"
                @click="filterButtonClick(lang)"
            >
                {{ lang.value }} ({{ lang.count }})
            </button>
            <h3>Technologies</h3>
            <button
                v-for="tech in technologies"
                :key="`${tech.type}-${tech.value}`"
                :class="{
                    '--filled':
                        currentFilter !== undefined &&
                        currentFilter.type === tech.type &&
                        currentFilter.value === tech.value,
                }"
                @click="filterButtonClick(tech)"
            >
                {{ tech.value }} ({{ tech.count }})
            </button>
        </aside>
        <div class="p-projects__container">
            <h1>Projects</h1>
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
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Project } from '~/types/project'

interface Filter {
    type: 'languages' | 'tech'
    value: string
    count: number
}

function getFilters(type: 'languages' | 'tech', projects: Project[]): Filter[] {
    const frequencies: { [value: string]: number } = {}
    for (const project of projects) {
        for (const filterValue of project[type] ?? []) {
            frequencies[filterValue] = frequencies[filterValue] ?? 0
            frequencies[filterValue] += 1
        }
    }

    return Object.entries(frequencies)
        .map(([value, count]) => ({
            type,
            value,
            count,
        }))
        .sort((a, b) => b.count - a.count)
}

export default Vue.extend<
    {
        projects: Project[]
        allProjects: Project[]
        languages: Filter[]
        technologies: Filter[]
        currentFilter?: {
            type: 'languages' | 'tech'
            value: string
        }
    },
    {},
    {},
    {}
>({
    async asyncData({ $content, params }) {
        const projects = (await $content(`projects`)
            .sortBy('date', 'desc')
            .fetch<Project>()) as Project[]

        const allProjects = projects.slice()

        const languages = getFilters('languages', allProjects)
        const technologies = getFilters('tech', allProjects)

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
        filterButtonClick(filter: Filter) {
            if (
                this.currentFilter?.type === filter.type &&
                this.currentFilter?.value === filter.value
            ) {
                this.currentFilter = undefined
                this.projects = this.allProjects.slice()
                return
            }

            this.currentFilter = {
                type: filter.type,
                value: filter.value,
            }

            this.projects = this.allProjects.filter((project) =>
                (project[filter.type] ?? []).includes(filter.value)
            )
        },
    },
})
</script>

<style lang="scss" scoped>
.p-projects {
    h1 {
        @apply mx-4;
    }

    @screen lg {
        @apply grid grid-cols-4;
    }

    &__filters {
        @apply mb-4;

        @screen lg {
            @apply col-span-1;
        }

        button {
            @apply px-4 py-2 m-2 rounded;
            @apply border-primary border text-primary;

            @screen dark {
                @apply border-dark-primary text-dark-primary;
            }

            &.--filled {
                @apply bg-primary text-white;

                @screen dark {
                    @apply bg-dark-primary text-black;
                }
            }
        }
    }

    &__container {
        @screen lg {
            @apply col-span-3;
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
