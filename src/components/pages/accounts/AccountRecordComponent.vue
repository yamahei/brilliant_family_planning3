<template>

<div class="record-table-height-controller">
    <table v-if="props.records.length > 0" class="table is-hoverable mx-auto">
        <thead>
            <tr>
                <th class="has-background-primary-100">年月</th>
                <th class="has-background-primary-100">残高</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(record, index) in sorted_records"
                :key="`${index}-${record.yearmonth}`"
                @click="onEditRecord(record)"
                class="is-clickable"
            >
                <td class="yearmonth">{{ record.yearmonth }}</td>
                <td class="balance">{{ $util.commaFilter(record.balance) }}</td>
            </tr>
        </tbody>
    </table>
    <div v-else class="notification">
        実残高がないと、この口座では試算残高の累積ができません。
    </div>
</div>

</template>

<style scoped>
.record-table-height-controller {
    max-height: 12rem;
    overflow:auto;
}
.record-table-height-controller table th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>


<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { Store } from '@/biz/store';
import { Util } from '@/biz/util';
import * as vm from '@/biz/bfpviewmodel';

const globalProperties = getCurrentInstance()?.appContext.config.globalProperties;
if(!globalProperties){ throw new Error("Failed to get global properties. Make sure this code is running within the setup function of a Vue component."); }
const $store: Store = globalProperties.$store;
const $data: vm.BfpViewModel = globalProperties.$data;
const $util: Util = globalProperties.$util;

const emit = defineEmits(['edit']);
const props = defineProps<{
    records:vm.VMRecords;
}>();
const sorted_records = [...props.records].sort((a:vm.VMRecord,b:vm.VMRecord)=>{
    const a_ym = +(new Date(a.yearmonth));
    const b_ym = +(new Date(b.yearmonth));
    return b_ym - a_ym;
});


const onEditRecord = (record:vm.VMRecord) => {
    emit("edit", record);
};



</script>

