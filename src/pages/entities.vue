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
                 v-for="(entity, index) in $data.entities" :key="`${index}-${entity.name}`"
            >
                <EntityCardComponent
                    :entity="entity"
                    @edit="onEditEntity"
                    @save="onSaveEntity"
                ></EntityCardComponent>

            </div><!--column-->

        </div><!--columns-->
    </div>
</section>

<ModalEntityEdit
    :show="modal_show" :isedit="modal_isedit" :entity="modal_entity"
    @ok="onEntityEditOk" @cancel="onEntityEditCancel" @remove="onEntityEditRemove"
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
const $util: vm.BfpViewModel = globalProperties.$util;
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

const modal_show = ref(false);
const modal_isedit = ref(false);
const modal_entity = ref<vm.VMEntity | null>(null);

const onAppendEntity = () => {
    modal_entity.value = $biz.getEmptyEntity();
    modal_isedit.value = false;
    modal_show.value = true;
};
const onEditEntity = (entiy:vm.VMEntity) => {
    modal_entity.value = entiy;
    modal_isedit.value = true;
    modal_show.value = true;
};

const onEntityEditOk = (entity:vm.VMEntity) => {
    console.log("onEntityEditOk");
    if(!modal_isedit.value){
        //TODO: preset
        $data.entities.push(entity);
    }else{/* do nothing */}
    save();
    modal_show.value = false;
};
const onEntityEditCancel = () => {
    modal_show.value = false;
};
const onEntityEditRemove = (entity:vm.VMEntity) => {
    $confirm(
        "主体の削除",
        `「${entity.name}」を削除しますか？`,
        (ok:boolean) => {
            const index = $data.entities.findIndex(e => e.id === entity.id);
            if(ok && index >= 0){
                $data.entities.splice(index, 1);
                save();
                modal_show.value = false;
            }
        }
    );
};

const onSaveEntity = () => {
    save();
};
</script>