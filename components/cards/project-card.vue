<template>
    <common-card class="c-project-card" :overlay="overlay">
        <template v-slot:header>
            <div class="c-project-card__header">
                <div class="c-project-card__title">
                    <p class="c-project-card__date">
                        {{ formattedDate }}
                    </p>
                    <h3>
                        {{ project.title }}
                    </h3>
                </div>

                <div class="c-project-card__links">
                    <a v-if="project.source" :href="project.source">
                        <font-awesome-icon
                            :icon="['fab', 'github']"
                        ></font-awesome-icon>
                    </a>
                    <a v-if="project.url" :href="project.url">
                        <font-awesome-icon
                            :icon="['fas', 'link']"
                        ></font-awesome-icon>
                    </a>
                </div>
            </div>
        </template>
        <div class="c-project-card__content">
            <p>{{ project.description }}</p>
            <div class="c-project-card__content__technologies">
                <h3>Languages</h3>
                <ul>
                    <li v-for="lang in project.languages" :key="lang">
                        {{ lang }}
                    </li>
                </ul>
            </div>

            <div class="c-project-card__content__technologies">
                <h3>Technologies</h3>
                <ul>
                    <li v-for="tech in project.tech" :key="tech">
                        {{ tech }}
                    </li>
                </ul>
            </div>
        </div>
    </common-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { formatAsDate } from '~/helpers/datetime'

interface IProps {
    project: {
        title: string
        description: string
        date: string
        url: string
        source: string
        languages: string[]
        tech: string[]
    }
    overlay: boolean
}

export default Vue.extend<{}, {}, {}, IProps>({
    props: {
        project: {
            type: Object,
            required: true,
        },
        overlay: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        formattedDate() {
            return formatAsDate(this.project.date)
        },
    },
})
</script>

<style lang="scss" scoped>
.c-project-card {
    &.-overlay {
        @apply h-40;
        @apply overflow-hidden;
    }

    &__header {
        @apply flex justify-between;
    }
    &__links {
        @apply mr-2;
        @apply text-lg;
    }
    &__date {
        @apply m-0;
        @apply text-sub text-sm;

        @screen dark {
            @apply text-dark-sub;
        }
    }
    &__title h3 {
        @apply font-bold;
        @apply m-0;
        @apply text-primary;

        @screen dark {
            @apply text-dark-primary;
        }
    }
    &__content {
        @apply pb-4;
        @apply flex flex-wrap;

        p {
            @apply w-full;
            @apply pb-6;
        }
        &__technologies {
            @apply w-1/2;

            h3 {
                @apply text-sub font-medium;

                @screen dark {
                    @apply text-dark-sub;
                }
            }

            ul {
                @apply mt-1;
            }
        }
    }
}
</style>
