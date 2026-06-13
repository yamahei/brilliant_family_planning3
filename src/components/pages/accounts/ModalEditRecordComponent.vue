

<template>

<ModalBase :show="props?.show" :title="`残高`" @ok="onOk" @cancel="onCancel">
    <p>
        <span>実際の残高を入れてください。</span>
    </p>
    <div class="field">
        <div class="control">
            <input class="input" :type="'month'" :placeholder="'📅年月'" :disabled="props.isedit" v-model="yearmonth" />
        </div>
        <div class="control">
            <input class="input" :type="'number'" :placeholder="'💰残高'"  v-model="balance" />
        </div>
    </div>
    <div class="field">
        <div class="control">
            <div class="buttons">
                <button class="button is-danger" :disabled="!props.isedit" @click="onRemove">
                    この口座を削除する
                </button>
            </div>
        </div>
        <p class="help">
            口座は少なくとも1件必要です。
        </p>
    </div>


</ModalBase>

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
import { ref, watch } from 'vue';

// @ts-ignore TODO: fix alias settings
import ModalBase from '@/components/common/ModalBase.vue';



const emit = defineEmits(["ok", "cancel", "remove"]);
const props = defineProps<{
    show: boolean;
    isedit: boolean;
    record: vm.VMRecord;
}>();

const this_yearmonth = props.record?.yearmonth;
const yearmonth = ref(this_yearmonth);
const balance = ref(props.record?.balance ?? 0);
watch(props, () => {
    yearmonth.value = props.record?.yearmonth;
    balance.value = props.record?.balance ?? 0;
});


const onOk = () => {
    const new_record_yearmonth = yearmonth.value;
    const new_record_balance = Number(balance.value);
    if(!new_record_yearmonth){ return; }
    if(isNaN(new_record_balance)){ return; }

    props.record.yearmonth = new_record_yearmonth;
    props.record.balance = new_record_balance;
    emit("ok", props.record);

};
const onCancel = () => {
    emit("cancel", null);
};
const onRemove = () => {
    emit("remove", props.record);
};


</script>
