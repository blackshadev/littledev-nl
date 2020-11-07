<template>
    <div class="p-projects">
        <div v-for="(project, index) in projects" :key="index">
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const projects = await $content(`projects`).fetch()

        return {
            projects,
            params,
        }
    },
})
</script>
