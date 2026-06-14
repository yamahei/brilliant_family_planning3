<template>

<Header>
    <template #title>📊trial</template>
    <template #actions>

        <div class="field is-grouped">
            <p class="control">
                <input class="input" type="month" placeholder="From" />
            </p>
            <p class="control">
                <input class="input" type="month" placeholder="To" />
            </p>
            <p class="control">
                <button class="button is-primary">再計算</button>
            </p>
            <p class="control">
                <button class="button">行列を入替</button>
            </p>
        </div>

    </template>
</Header>


<div class="container">
<section class="section">

    <TableComponent></TableComponent>

</section>
</div>
</template>


<script setup lang="ts">
import Header from '@/components/common/Header.vue';
import TableComponent from '@/components/pages/trial/tableComponent.vue';
</script>