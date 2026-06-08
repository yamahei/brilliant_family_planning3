<template>

<Header>
    <template #title>👤entities</template>
    <template #actions>

        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary">主体の追加</button>
            </p>
        </div>

    </template>
</Header>

<section class="section">
<div class="container">
        <div class="columns is-multiline">

            <div
                class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd"
                 v-for="key in [1,2,3,4,5,6,7,8,9,10]" :key="key"
            >

                <EntityCardComponent></EntityCardComponent>

            </div><!--column-->

        </div><!--columns-->
    </div>
</section>


</template>

<script setup lang="ts">
// @ts-ignore TODO: fix alias settings
import Header from '@/components/common/Header.vue';
// @ts-ignore TODO: fix alias settings
import EntityCardComponent from '@/components/pages/entities/EntityCardComponent.vue';
</script>