

<template>

<ModalBase :show="props?.show" :title="`口座`" @ok="onOk" @cancel="onCancel">
    <p>
        <span>名前を決めてください</span>
    </p>
    <div class="field">
        <div class="control">
            <input class="input" :type="'text'" :placeholder="'💳口座の名前'"  v-model="name" />
        </div>
    </div>
    <div class="field">
        <div class="control">
            TODO: 残高
        </div>
        <p class="help">
            残高の履歴がないと、この口座の累積残高を試算できません。
        </p>
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
            削除すると、配下のルールも削除されます。<br/>
            この操作は取り消せませんので、注意してください。
        </p>
    </div>


</ModalBase>

</template>


<style scoped>

</style>



<script setup lang="ts">
// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel.ts';

// @ts-ignore TODO: fix alias settings
import ModalBase from '@/components/common/ModalBase.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(["ok", "cancel", "remove"]);
const props = defineProps<{
    show: boolean;
    isedit: boolean;
    account: vm.VMAccount;
}>();


const name = ref(props.account?.name ?? "💳口座の名前");
watch(props, () => {
    name.value = props.account?.name ?? "";
}, { immediate: true, deep: true });


const onOk = () => {
    const new_account_name = name.value.trim();
    if (new_account_name) {
        props.account.name = new_account_name;
        emit("ok", props.account);
    }
};
const onCancel = () => {
    emit("cancel", null);
};
const onRemove = () => {
    emit("remove", props.account);
};


</script>
