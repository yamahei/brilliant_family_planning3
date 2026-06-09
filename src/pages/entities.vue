<template>

<Header>
    <template #title>👤entities</template>
    <template #actions>

        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary" @click="onAppendEntity">
                    主体の追加
                </button>
            </p>
        </div>

    </template>
</Header>

<section class="section">
    <div class="container">
        <div class="columns is-multiline">

            <div
                class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd"
                 v-for="(entity, index) in $data.entities" :key="index"
            >

                <EntityCardComponent></EntityCardComponent>

            </div><!--column-->

        </div><!--columns-->
    </div>
</section>

<ModalEntityEdit
    :show="show" :isedit="isedit" :entity="entity"
    @ok="onEntityOk" @cancel="onEntityCancel" @remove="onEntityRemove"
></ModalEntityEdit>

</template>

<script setup lang="ts">
/**
 * 全頁定型のコード
 */
import { getCurrentInstance } from 'vue'
import { Biz } from '../biz/biz';
import { Store } from '../biz/store';
import * as vm from '../biz/bfpviewmodel';

const globalProperties = getCurrentInstance()?.appContext.config.globalProperties;
if(!globalProperties){ throw new Error("Failed to get global properties. Make sure this code is running within the setup function of a Vue component."); }
const $biz: Biz = globalProperties.$biz;
const $store: Store = globalProperties.$store;
const $data: vm.BfpViewModel = globalProperties.$data;
// ----
const $alert = globalProperties.$alert;
const $confirm = globalProperties.$confirm;
const $prompt = globalProperties.$prompt;
// ここまで
const save = () => {
    $store.save($data);
};


import { ref } from 'vue';
// @ts-ignore TODO: fix alias settings
import Header from '@/components/common/Header.vue';
// @ts-ignore TODO: fix alias settings
import EntityCardComponent from '@/components/pages/entities/EntityCardComponent.vue';
// @ts-ignore TODO: fix alias settings
import ModalEntityEdit from '@/components/pages/entities/ModalEntityEdit.vue';

const show = ref(false);
const isedit = ref(false);
const entity = ref<vm.VMEntity | null>(null);

const onAppendEntity = () => {
    entity.value = $biz.getEmptyEntity();
    isedit.value = false;
    show.value = true;
};

const onEntityOk = (new_entity:vm.VMEntity) => {
    if(!isedit.value){
        $data.entities.push(new_entity);
    }else{/* do nothing */}
    save();
    show.value = false;
};
const onEntityCancel = () => {
    show.value = false;
};
const onEntityRemove = () => {
    //remove
    save();
    show.value = false;
};
</script>