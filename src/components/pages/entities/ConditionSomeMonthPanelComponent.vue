<template>

    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field is-flex-grow-0">
                <p class="control">
                    <span class="tag is-info">指定月</span>
                </p>
            </div>
            <div class="field is-flex-grow-0 flex-last-order">
                <p class="control">
                    <button class="button is-small" @click="onDeleteCondition">🗑️</button>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <label class="checkbox">
                        結果を反転する
                        <input class="toggle is-small" type="checkbox" v-model="not"/>
                    </label>
                </p>
            </div>
        </div>
    </div>
    <div class="field has-addons">
        <p class="control">
            <button class="button is-small"
                 v-for="month in 12"
                 :key="`${month}-months.length`"
                 :class="isMonthelectedClass(month as vm.types.BFPType_Month)"
                 @click="onMonthToggled(month as vm.types.BFPType_Month)"
            >{{ month }}</button>
        </p>
    </div>

</template>

<style scoped>
input[type=checkbox].toggle.is-small {
  --size:16px;
}
.flex-last-order {
    order: 65535;
}
input.input.is-narrow {
    max-width: 8rem;
}
</style>


<script setup lang="ts">
import * as vm from '@/biz/bfpviewmodel';
import { ref, watch } from 'vue';

const emit = defineEmits(["remove"]);
const props = defineProps<{
    condition: vm.types.BFPRuleArg_SomeMonth;
}>();

const not = ref(!props.condition.not);
watch(not, ()=> {
    props.condition.not = !not.value;
}, { immediate: true, deep: true });
const months = ref<vm.types.BFPType_Month[]>([...props.condition.months]);
watch(months, ()=> {
    props.condition.months = [...months.value];
}, { immediate: true, deep: true });

const SELECTED_CLASSNAME = "is-info";
const isMonthelectedClass = (month:vm.types.BFPType_Month)=> {
    return months.value.includes(month) ? SELECTED_CLASSNAME : "";
};
const onMonthToggled = (month:vm.types.BFPType_Month)=> {
    console.debug("onMonthToggled", {month});
    if(months.value.includes(month)){
        months.value = months.value.filter(m => m !== month);
    }else{
        months.value.push(month);
    }
    console.debug({month:months.value});
};

const onDeleteCondition = ()=> {
    emit("remove", props.condition);
};
</script>

