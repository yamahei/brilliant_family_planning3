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

        <div class="field is-grouped is-justify-content-right">
            <p class="control"><!-- spacer --></p>
            <p class="control">
                <button class="button is-small">💰費目を追加</button>
            </p>
            <p class="control is-expanded"><!-- spacer --></p>
            <p class="control">
                <button class="button is-small">📝編集</button>
            </p>
            <p class="control"><!-- spacer --></p>
            <p class="control">
                <button class="button is-danger is-outlined is-small">🗑️削除</button>
            </p>
            <p class="control"><!-- spacer --></p>
        </div>
    </div>

</template>

<style scoped>


</style>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';

//TODO: define property: category: VMCategory



</script>

