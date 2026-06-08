<template>

<div class="card">
    <header class="card-header">
        <div class="field is-flex-grow-1">
            <p class="control is-expanded is-flex-grow-1">
                <input class="input" type="text" placeholder="主体名を編集中…" @blur="finishEditEntity" />
            </p>
        </div>
    </header>
    <header class="card-header" @click="startEditEntity(1)">
        <p class="card-header-title">主体名（表示）</p>
    </header>

    <RulePanelComponent></RulePanelComponent>


    <footer class="card-footer">
        <p class="card-footer-item is-flex-grow-2 is-clickable" @click="appendCategory">🧾費目を追加</p>
        <p class="card-footer-item has-text-danger" @click="deleteEntity">🗑️削除</p>
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


//TODO: define property: entity: VMKlass

let editing_entity:unknown = null;

const startEditEntity = (entity: number) => {
    if(!editing_entity){
      console.log('edit entity', entity);
      editing_entity = entity;
    }
}

const finishEditEntity = () => {
    if(!editing_entity){ return }

    const valid = true; //TODO: validate entity name
    if(valid){
        console.log('finish edit entity', editing_entity);
        editing_entity = null;
    }
}

const appendCategory = () => {
    //TODO: show category edit form, then add category to entity
    console.log('append category');
}

const deleteEntity = () => {
    //TODO: show confirmation modal, then emit event to parent component to delete entity
    console.log('delete entity');
}

</script>

