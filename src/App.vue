<!-- <script setup lang="ts">
import { RouterView } from 'vue-router'
</script> -->

<template>
    <main>
        <RouterView />

        <ModalAlert :show="isAlertShow" :title="alertTitle" :message="alertMessage" @ok="alertClose"></ModalAlert>
        <ModalConfirm :show="isConfirmShow" :title="confirmTitle" :message="confirmMessage" @ok="confirmClose(true)" @cancel="confirmClose(false)"></ModalConfirm>
        <ModalPrompt :show="isPromptShow" :title="promptTitle" :type="promptType" :defaultValue="promptDefaultValue" :message="promptMessage" @ok="promptClose" @cancel="promptClose"></ModalPrompt>
    </main>

</template>

<script setup lang="ts">

import { ref, getCurrentInstance } from 'vue';
const globalProperties = getCurrentInstance()?.appContext.config.globalProperties;

// @ts-ignore TODO: fix alias settings
import ModalAlert from '@/components/common/ModalAlert.vue';
const isAlertShow = ref(false);
const alertTitle = ref('Alert title');
const alertMessage = ref('Alert message');
const alertCallback = ref<() => void>(()=>{});
const alertClose = ()=>{
    alertCallback.value();
    isAlertShow.value = false;
    console.log(`ModalAlert closed`);
};
const alertShow = (title:string, message:string, callback:()=>void) => {
    alertTitle.value = title;
    alertMessage.value = message;
    alertCallback.value = callback;
    isAlertShow.value = true;
    console.log(`ModalAlert shown`);
};

// @ts-ignore TODO: fix alias settings
import ModalConfirm from '@/components/common/ModalConfirm.vue';
const isConfirmShow = ref(false);
const confirmTitle = ref('Confirm title');
const confirmMessage = ref('Confirm message');
const confirmCallback = ref<(result: boolean) => void>(()=>{});
const confirmClose = (e:boolean) => {
    confirmCallback.value(e);
    isConfirmShow.value = false;
    console.log(`ModalConfirm closed: ${e}`);
};
const confirmShow = (title:string, message:string, callback:(result: boolean) => void) => {
    confirmTitle.value = title;
    confirmMessage.value = message;
    confirmCallback.value = callback;
    isConfirmShow.value = true;
    console.log(`ModalConfirm shown`);
};

// @ts-ignore TODO: fix alias settings
import ModalPrompt from '@/components/common/ModalPrompt.vue';
const isPromptShow = ref(false);
const promptTitle = ref('Prompt title');
const promptMessage = ref('Prompt message');
const promptDefaultValue = ref('Default value');
const promptType = ref('text');
const promptCallback = ref<(result: string | null) => void>(()=>{});
const promptClose = (e:string|null) => {
    promptCallback.value(e);
    isPromptShow.value = false;
    console.log(`ModalPrompt closed: ${e}`);
};
const promptShow = (title:string, message:string, type:string, defaultValue:string, callback:(result: string | null) => void) => {
    promptTitle.value = title;
    promptMessage.value = message;
    promptType.value = type;
    promptDefaultValue.value = defaultValue;
    promptCallback.value = callback;
    isPromptShow.value = true;
    console.log(`ModalPrompt shown`);
};


if(globalProperties){
    globalProperties.$alert = alertShow;
    globalProperties.$confirm = confirmShow;
    globalProperties.$prompt = promptShow;
}


</script>