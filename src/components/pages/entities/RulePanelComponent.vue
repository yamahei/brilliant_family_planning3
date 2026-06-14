<template>
    <div class="mb-2" v-if="props.rules.length > 0">
        <nav class="panel is-radiusless is-shadowless mb-0">
            <p class="panel-tabs">
                <a :class="currentTab === '' ? 'is-active' : ''"
                    @click="onClickTab('')"
                >
                    全て
                </a>
                <a :class="currentTab === tab ? 'is-active' : ''"
                    v-for="(tab, index) in tabs"
                    :key="`${index}-${tab}-${tabs.length}`"
                    @click="onClickTab(tab)"
                >
                    {{ tab }}
                </a>
            </p>
            <a class="panel-block"
                v-for="rule in currentRules"
                :key="`${rule.id}-${rule.name}-${rule.amount}-${rule.conditions.length}`"
                @click="onEditRule(rule)"
            >
                {{ rule.name }}
            </a>
        </nav>

    </div>
    <div v-else>
        <div class="panel-block">
            <div class="notification">
                費目には、1つ以上の条件が必要です。
            </div>
        </div>
    </div>

</template>

<style scoped>


</style>


<script setup lang="ts">

import * as vm from '@/biz/bfpviewmodel';

import { ref, watch } from 'vue';


const emit = defineEmits(["edit"]);
const props = defineProps<{
    rules: vm.VMRules;
}>();

const getTabList = (rules:vm.VMRules):string[] => {
    const classnamelist = rules.map(r => r.classname ?? "").filter(c => !!c);
    const uniquelist = [...new Set(classnamelist)].sort();
    console.debug({rules,classnamelist,uniquelist});
    return uniquelist;
};
const currentRules = ref<vm.VMRules>(props.rules);
const tabs = ref<string[]>([]);
const currentTab = ref("");
watch(props, () => {
    currentRules.value = props.rules;
    tabs.value = getTabList(props.rules);
    currentTab.value = "";
}, { immediate: true, deep: true });
const onClickTab = (classname:string) => {
    console.debug("onClickTab", {classname});
    currentTab.value = classname;
    currentRules.value = props.rules.filter(r => {
        return classname ? classname === r.classname : true;
    });
};

const onEditRule = (rule:vm.VMRule) => {
    emit("edit", rule);
};


</script>

