<template>
    <div class="c-about-me">
        <div class="c-about-me__image">
            <img :src="image" alt="This is me" />
        </div>
        <p class="c-about-me__name">{{ name }}</p>
        <p class="c-about-me__subtitle">
            {{ randomSubtitle }}
        </p>
        <p class="c-about-me__dob">{{ formattedDateOfBirth }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatAsDate } from '~/helpers/datetime'
import { sample } from '~/helpers/random'

export const FIELDS = ['name', 'dob', 'image', 'subtitles']

export default Vue.extend<
    {},
    {},
    {
        formattedDateOfBirth: string
        randomSubtitle: string
    },
    {
        image: string
        name: string
        subtitles: { description: string }[]
        dob: string
    }
>({
    props: {
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        subtitles: {
            type: Array,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
    },
    computed: {
        formattedDateOfBirth() {
            return formatAsDate(this.$props.dob)
        },
        randomSubtitle() {
            const subtitles = this.$props.subtitles as { description: string }[]
            return sample(subtitles).description
        },
    },
})
</script>
<style lang="scss" scoped>
.c-about-me {
    @apply flex items-center flex-col;
    @apply mx-3;

    &__image {
        @apply rounded-full;
        @apply w-48 h-48;
        @apply overflow-hidden;
        @apply mb-3;
    }

    &__subtitle {
        @apply text-sub;

        @screen dark {
            @apply text-dark-sub;
        }
    }

    &__dob {
        @apply text-sub;
        @apply text-sm;

        @screen dark {
            @apply text-dark-sub;
        }
    }

    p {
        @apply m-0;
    }
}
</style>
