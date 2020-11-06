<template>
    <div>Homeee</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ $content, params }) {
        const content = await $content(`pages/home`).fetch()

        return {
            content,
            params,
        }
    },
})
</script>
