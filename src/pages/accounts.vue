<template>

<Header>
    <template #title>💳accounts</template>
    <template #actions>

        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary" @click="onAppendAccount">
                    口座の追加
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
                 v-for="(account, index) in $data.accounts" :key="`${index}-${account.name}`"
            >
                <AccountCardComponent
                    :key="`TODO: not work.. why?: ${account.id}-${$data.defaultaccountid}`"
                    :account="account"
                    :isDefault="$data.defaultaccountid === account.id"
                    @edit="onEditAccount"
                    @save="onSaveAccount"
                    @default="onDefaultAccount"
                ></AccountCardComponent>
            </div><!--column-->

        </div><!--columns-->
    </div>
</section>

<ModalAccountEdit
    :show="modal_show" :isedit="modal_isedit" :account="modal_account"
    @ok="onAccountEditOk" @cancel="onAccountEditCancel" @remove="onAccountEditRemove"
></ModalAccountEdit>


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
import Header from '@/components/common/Header.vue';
import AccountCardComponent from '@/components/pages/accounts/AccountCardComponent.vue';
import ModalAccountEdit from '@/components/pages/accounts/ModalAccountEdit.vue';

const modal_show = ref(false);
const modal_isedit = ref(false);
const modal_account = ref<vm.VMAccount | null>(null);

const onAppendAccount = () => {
    modal_account.value = $biz.getEmptyAccount();
    modal_isedit.value = false;
    modal_show.value = true;
};
const onEditAccount = (account:vm.VMAccount) => {
    modal_account.value = account;
    modal_isedit.value = true;
    modal_show.value = true;
};
const onAccountEditOk = (account:vm.VMAccount) => {
    if(!modal_isedit.value){
        $data.accounts.push(account);
    }else{/* do nothing */}
    save();
    modal_show.value = false;
};
const onAccountEditCancel = () => {
    modal_show.value = false;
};
const onAccountEditRemove = (account:vm.VMAccount) => {
    $confirm(
        "口座の削除",
        `「${account.name}」を削除しますか？`,
        (ok:boolean) => {
            const index = $data.accounts.findIndex(a => a.id === account.id);
            if(ok && index >= 0){
                $data.accounts.splice(index, 1);
                save();
                modal_show.value = false;
            }
        }
    );
};

const onSaveAccount = () => {
    save();
};
const onDefaultAccount = (account:vm.VMAccount) => {
    $confirm(
        "デフォルト口座の変更",
        `「${account.name}」をデフォルト口座にしますか？`,
        (ok:boolean) => {
            if(ok){
                $data.defaultaccountid = account.id;
                save();
            }
        }
    );
};
</script>