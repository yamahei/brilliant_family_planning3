<template>

<div class="card">
    <header class="card-header">
        <p class="card-header-title is-flex-grow-0">
            <p v-if="props.isDefault">⭐</p>
            <button v-else class="button is-small" @click="onDefaultAccount(props.account)">☆</button>
        </p>
        <p class="card-header-title" :title="props.account.name">
            {{ props.account.name }}
        </p>
        <p class="card-header-title is-flex-grow-0">
            <button class="button is-small" @click="onEditAccount(props.account)">📝</button>
        </p>
    </header>

    <div class="card-content">
        <div class="content">
            <AccountRecordComponent
                :key="`record-${props.account.id}-${props.account.records.length}`"
                :records="props.account.records"
                @remove="onRemoveRecord"
                @edit="onEditRecord"
            ></AccountRecordComponent>
        </div>
    </div>

    <footer class="card-footer">
        <p class="card-footer-item is-clickable" @click="onAppendRecord">🏦残高を追加</p>
    </footer>
</div>

<ModalEditRecordComponent
    :show="modal_show" :isedit="modal_isedit" :record="modal_record"
    @ok="onRecordEditOk" @cancel="onRecordEditCancel" @remove="onRecordEditRemove"
></ModalEditRecordComponent>

</template>

<style scoped>
</style>


<script setup lang="ts">
/**
 * 全頁定型のコード
 */
import { getCurrentInstance } from 'vue'
import { Biz } from '@/biz/biz';
import { Store } from '@/biz/store';
import * as vm from '@/biz/bfpviewmodel';

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

import AccountRecordComponent from '@/components/pages/accounts/AccountRecordComponent.vue';
import ModalEditRecordComponent from '@/components/pages/accounts/ModalEditRecordComponent.vue';

const emit = defineEmits(['edit', 'default', 'save']);
const props = defineProps<{
    account:vm.VMAccount;
    isDefault:boolean;
}>();


const onDefaultAccount = (account:vm.VMAccount) => {
    emit('default', account);
}
const onEditAccount = (account:vm.VMAccount) => {
    emit('edit', account);
}




const onRemoveRecord = (record:vm.VMRecord) => {
    const index = props.account.records.findIndex(r => r.id === record.id);
    if(index >= 0){
        props.account.records.splice(index, 1);
    }
    emit('save');
};



const modal_show = ref(false);
const modal_isedit = ref(false);
const modal_record = ref<vm.VMRecord | undefined>(undefined);

const onAppendRecord = () => {
    modal_record.value = $biz.getEmptyRecord();
    modal_isedit.value = false;
    modal_show.value = true;
};
const onEditRecord = (entiy:vm.VMRecord) => {
    modal_record.value = entiy;
    modal_isedit.value = true;
    modal_show.value = true;
};

const onRecordEditOk = (record:vm.VMRecord) => {
    if(!modal_isedit.value){
        const dblrecord = props.account.records.find(r => r.yearmonth === record.yearmonth);
        if(dblrecord){ return; }
        props.account.records.push(record);
    }else{/* do nothing */}
    emit('save');
    modal_show.value = false;
};
const onRecordEditCancel = () => {
    modal_show.value = false;
};
const onRecordEditRemove = (record:vm.VMRecord) => {
    const length = props.account.records.length;
    if(length <= 1){ return; }
    const index = props.account.records.findIndex(r => r.id === record.id);
    if(index < 0){ return; }

    const removefunc = (ok:boolean) => {
        if(ok){
            props.account.records.splice(index, 1);
            emit('save');
            modal_show.value = false;
        }
    };
    $confirm(
        "残高の削除",
        `「${record.yearmonth}」の残高を削除しますか？`,
        removefunc,
    );
};

</script>

