<template>

<div class="card">
    <header class="card-header">
        <p class="card-header-title">{{ props.entity.name }}</p>
        <p class="card-header-title is-flex-grow-0">
            <button class="button is-small" @click="onEditEntity(props.entity)">📝</button>
        </p>
    </header>

    <RulePanelComponent></RulePanelComponent>


    <footer class="card-footer">
        <p class="card-footer-item is-flex-grow-2 is-clickable">🧾費目を追加</p>
    </footer>
</div>

</template>

<style scoped>

</style>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';
// @ts-ignore TODO: fix alias settings
import RulePanelComponent from '@/components/pages/entities/RulePanelComponent.vue';


const emit = defineEmits(['edit']);
const props = defineProps<{
    entity:vm.VMEntity;
}>();


const onEditEntity = (entity:vm.VMEntity) => {
    emit('edit', entity);
}


</script>

