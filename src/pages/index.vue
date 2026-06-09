<template>

<section class="section">
    <div class="container">

        <section>
            <p class="title">Data</p>
            <textarea class="textarea" v-model="json"></textarea>
            <button class="button is-danger"
                @click="$confirm('Clear', 'localstorageをクリア', (e:boolean) => e && $store.clear())"
            >Clear</button>
        </section>

        <section>
            <p class="title">Page</p>
            <ul>
                <li><RouterLink to="/summary" class="has-text-link">📈summary</RouterLink></li>
            </ul>
            <ul>
                <li><RouterLink to="/accounts" class="has-text-link">💳accounts</RouterLink></li>
            </ul>
            <ul>
                <li><RouterLink to="/entities" class="has-text-link">👤entities</RouterLink></li>
            </ul>
            <ul>
                <li><RouterLink to="/📊trial" class="has-text-link">📊trial</RouterLink></li>
            </ul>
        </section>

        <section>
            <p class="title">Component test</p>
            <HogeComponent text="hoge hoge ho--"></HogeComponent>
        </section>

        <section>
            <p class="title">Modal</p>

            <ModalBase :show="isBaseShow" @ok="modalBase.close" @cancel="modalBase.close">
                <p>it's a ModalBase component!</p>
            </ModalBase>
            <button class="button" @click="modalBase.show">Base</button>

            <button class="button" @click="$alert('Alert', '😲Alert', () => console.log('Alert confirmed'))">Alert</button>
            <button class="button" @click="$confirm('Confirm', '❔Confirm message', (result: boolean) => console.log(`Confirm result: ${result}`))">Confirm</button>
            <button class="button" @click="$prompt('Prompt', '📝Prompt message', 'text', 'Default value', (result: string | null) => console.log(`Prompt result: ${result}`))">Prompt</button>

        </section>

    </div>
</section>




</template>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import HogeComponent from "@/components/pages/index/hogeComponent.vue"


// @ts-ignore TODO: fix alias settings
import ModalBase from '@/components/common/ModalBase.vue';
import { ref } from 'vue';
const isBaseShow = ref(false);
const modalBase = {
    isshow: ref(isBaseShow),
    show: () => {
        modalBase.isshow.value = true;
        console.log('ModalBase Show clicked');
    },
    close: (e:boolean) => {
        console.log(`ModalBase closed: ${e}`);
        modalBase.isshow.value = false;
    }

};


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

console.debug({
    globalProperties,
    biz: $biz,
    store: $store,
    data: $data,
    alertShow: $alert,
    confirmShow: $confirm,
    promptShow: $prompt
});

console.log($biz);
const data = $store.load();
const json = JSON.stringify(data, null, 2);

</script>

