

<template>

<ModalBase :show="props?.show" :title="`収支の主体`" @ok="onOk" @cancel="onCancel">
    <p>
        <span>名前を決めてください</span>
    </p>
    <div class="field">
        <div class="control">
            <input class="input" :type="'text'" :placeholder="'👤主体の名前'"  v-model="name" />
        </div>
    </div>
    <div class="field">
        <div class="control">
            <div class="select">
                <select v-model="presetentityid" :disabled="props.isedit">
                    <option value="">プリセットを使わない</option>
                </select>
            </div>
        </div>
        <p class="help">
            プリセットを使って、簡単にルールを作成できます
        </p>
    </div>
    <div class="field">
        <div class="control">
            <div class="buttons">
                <button class="button is-danger" :disabled="!props.isedit" @click="onRemove">
                    この主体を削除する
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

/* overscroll-behavior: none; */
.select, .select select {
    width: 100%;
}

</style>



<script setup lang="ts">
import * as vm from '@/biz/bfpviewmodel.ts';

import ModalBase from '@/components/common/ModalBase.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(["ok", "cancel", "remove"]);
const props = defineProps<{
    show: boolean;
    isedit: boolean;
    entity: vm.VMEntity;
}>();


const name = ref(props.entity?.name ?? "👤主体の名前");
const presetentityid = ref(props.entity?.presetentityid ?? "");
watch(props, () => {
    name.value = props.entity?.name ?? "";
    presetentityid.value = props.entity?.presetentityid ?? "";
}, { immediate: true, deep: true });


const onOk = () => {
    const new_entity_name = name.value.trim();
    const new_presetklassid = presetentityid.value;
    if (new_entity_name) {
        props.entity.name = new_entity_name;
        props.entity.presetentityid = new_presetklassid;
        emit("ok", props.entity);
    }
};
const onCancel = () => {
    emit("cancel", null);
};
const onRemove = () => {
    emit("remove", props.entity);
};


</script>
