<template>

<div class="card">
    <header class="card-header">
        <p class="card-header-title is-flex-grow-0">
            <p v-if="props.isDefault">⭐</p>
            <button v-else class="button is-small" @click="onDefaultAccount(props.account)">☆</button>
        </p>
        <p class="card-header-title">{{ props.account.name }}</p>
        <p class="card-header-title is-flex-grow-0">
            <button class="button is-small" @click="onEditAccount(props.account)">📝</button>
        </p>
    </header>

    <div class="card-content">
        <div class="content">
            <AccountHistoryComponent></AccountHistoryComponent>
        </div>
    </div>

</div>

</template>

<style scoped>

</style>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';
// @ts-ignore TODO: fix alias settings
import AccountHistoryComponent from '@/components/pages/accounts/AccountHistoryComponent.vue';

const emit = defineEmits(['edit', 'default']);
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



const appendHistory = () => {
    //TODO: show modal to input history data, then emit event to parent component to append history
    console.log('append history');
}

const deleteAccount = () => {
    //TODO: show confirmation modal, then emit event to parent component to delete account
    console.log('delete account');
}

</script>

