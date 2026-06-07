<template>

<div class="card">
    <header class="card-header">
        <div class="field has-addons is-flex-grow-1">
            <p class="control is-expanded is-flex-grow-1">
                <input class="input" type="text" placeholder="銀行名を編集中…" @blur="finishEditAccount" />
            </p>
            <p class="control">
                <a class="button" @click="setDefaultAccount">☆</a>
            </p>
        </div>
    </header>
    <header class="card-header" @click="startEditAccount(1)">
        <p class="card-header-title">銀行名（表示）</p>
        <p class="card-header-title">☆</p>
    </header>

    <div class="card-content">
        <div class="content">
            <AccountHistoryComponent></AccountHistoryComponent>
        </div>
    </div>

    <footer class="card-footer">
        <p class="card-footer-item is-flex-grow-2 is-clickable" @click="appendHistory">🧾残高を追加</p>
        <p class="card-footer-item has-text-danger" @click="deleteAccount">🗑️削除</p>
    </footer>
</div>

</template>

<style scoped>

</style>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';
// @ts-ignore TODO: fix alias settings
import AccountHistoryComponent from '@/components/pages/accounts/AccountHistoryComponent.vue';

//TODO: define property: account: AccountViewModel

let editing_account:unknown = null;

const startEditAccount = (account: number) => {
    if(!editing_account){
      console.log('edit account', account);
      editing_account = account;
    }
}

const finishEditAccount = () => {
    if(!editing_account){ return }

    const valid = true; //TODO: validate account name
    if(valid){
        console.log('finish edit account', editing_account);
        editing_account = null;
    }
}

const setDefaultAccount = () => {
    //TODO: emit event to parent component to set default account
    console.log('set default account');
}

const appendHistory = () => {
    //TODO: show modal to input history data, then emit event to parent component to append history
    console.log('append history');
}

const deleteAccount = () => {
    //TODO: show confirmation modal, then emit event to parent component to delete account
    console.log('delete account');
}

</script>

