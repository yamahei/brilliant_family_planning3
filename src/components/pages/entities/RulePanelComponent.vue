<template>
    <div class="mb-2">
        <nav class="panel is-radiusless is-shadowless mb-0">
            <p class="panel-tabs">
                <a class="is-active">全て</a>
                <a>雑費</a>
                <a>通信費</a>
            </p>
            <a class="panel-block" v-for="key in [1,2,3]" :key="key">
                💰費目の名前
            </a>
        </nav>

    </div>

</template>

<style scoped>


</style>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';

//TODO: define property: category: VMCategory



</script>

