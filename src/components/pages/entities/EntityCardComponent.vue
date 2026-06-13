<template>

<div class="card">
    <header class="card-header">
        <p class="card-header-title" :title="props.entity.name">
            {{ props.entity.name }}
        </p>
        <p class="card-header-title is-flex-grow-0">
            <button class="button is-small" @click="onEditEntity(props.entity)">📝</button>
        </p>
    </header>

    <RulePanelComponent
        :key="`record-${props.entity.id}-${props.entity.rules.length}`"
        :rules="props.entity.rules"
        @remove="onRemoveRule"
        @edit="onEditRule"
    ></RulePanelComponent>


    <footer class="card-footer">
        <p class="card-footer-item is-clickable" @click="onAppendRule">🧾費目を追加</p>
    </footer>
</div>

<ModalEditRuleComponent
    :show="modal_show" :isedit="modal_isedit" :record="modal_rule"
    @ok="onRuleEditOk" @cancel="onRuleEditCancel" @remove="onRuleEditRemove"
></ModalEditRuleComponent>

</template>

<style scoped>

</style>


<script setup lang="ts">

/**
 * 全頁定型のコード
 */
import { getCurrentInstance } from 'vue'
import { Biz } from '../../../biz/biz';
import { Store } from '../../../biz/store';
import * as vm from '../../../biz/bfpviewmodel';

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
import { ref } from 'vue';

// @ts-ignore TODO: fix alias settings
import RulePanelComponent from '@/components/pages/entities/RulePanelComponent.vue';
// @ts-ignore TODO: fix alias settings
import ModalEditRuleComponent from '@/components/pages/entities/ModalEditRuleComponent.vue';


const emit = defineEmits(['edit', 'save']);
const props = defineProps<{
    entity:vm.VMEntity;
}>();


const onEditEntity = (entity:vm.VMEntity) => {
    emit('edit', entity);
}



const onRemoveRule = (rule:vm.VMRule) => {
    const index = props.entity.rules.findIndex(r => r.id === rule.id);
    if(index >= 0){
        props.entity.rules.splice(index, 1);
    }
    emit('save');
}



const modal_show = ref(false);
const modal_isedit = ref(false);
const modal_rule = ref<vm.VMRule | null>(null);


const onAppendRule = () => {
    modal_rule.value = $biz.getEmptyRule();
    modal_isedit.value = false;
    modal_show.value = true;
};
const onEditRule = (rule:vm.VMRule) => {
    modal_rule.value = rule;
    modal_isedit.value = true;
    modal_show.value = true;
};

const onRuleEditOk = (rule:vm.VMRule) => {
    if(!modal_isedit.value){
        props.entity.rules.push(rule);
    }else{/* do nothing */}
    emit('save');
    modal_show.value = false;
};
const onRuleEditCancel = () => {
    modal_show.value = false;
};
const onRuleEditRemove = (rule:vm.VMRule) => {
    const length = props.entity.rules.length;
    if(length <= 1){ return; }
    const index = props.entity.rules.findIndex(r => r.id === rule.id);
    if(index < 0){ return; }

    const removefunc = (ok:boolean) => {
        if(ok){
            props.entity.rules.splice(index, 1);
            emit('save');
            modal_show.value = false;
        }
    };
    $confirm(
        "収支ルールの削除",
        `「${rule.name}」を削除しますか？`,
        removefunc,
    );
};

</script>

