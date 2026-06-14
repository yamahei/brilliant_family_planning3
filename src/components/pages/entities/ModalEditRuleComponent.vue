

<template>

<ModalBase :show="props?.show" :title="`費目`" @ok="onOk" @cancel="onCancel">
    <div class="field">
        <div class="control">
            <input class="input" :type="'text'" :placeholder="'費目名'" v-model="name" />
        </div>
    </div>
    <div class="field">
        <div class="control">
            <input class="input" :type="'number'" :placeholder="'金額'"  v-model="amount" />
        </div>
        <p class="help">
            マイナス（-）は支出、プラス（+）は収入です。
        </p>
    </div>
    <div class="field">
        <div class="control is-expanded">
            <div class="select">
                <select v-model="accountid">
                    <option value="">（デフォルト口座）</option>
                    <option v-for="(account, index) in $data.accounts" :key="index" :value="account.id">
                        {{ account.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <input class="input" :type="'text'" :placeholder="'グループ名'" v-model="classname" />
        </div>
        <p class="help">
            費目をタブグループで分類したい場合に入力します。
        </p>
    </div>

    <div class="field">
        <div class="control">
            <div class="buttons">
                <button class="button is-danger" :disabled="!props.isedit" @click="onRemove">
                    この費目を削除する
                </button>
            </div>
        </div>
    </div>

    <hr/>

    <div>
        <h3>発動条件</h3>

        <div class="field">
            <div class="control">

                <div class="dropdown is-hoverable is-up">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>条件を追加する</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a class="dropdown-item" @click="onAppendConditionSM">
                                <span class="tag is-info">指定月</span>
                                指定した月（毎年）
                            </a>
                            <a class="dropdown-item" @click="onAppendConditionSMSY">
                                <span class="tag is-success">隔年月</span>
                                指定した月（隔年）
                            </a>
                            <a class="dropdown-item" @click="onAppendConditionYM">
                                <span class="tag is-warning">特定日</span>
                                特定の年月（1回）
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="card">
            <div class="card-content">

                <div class="content condition-panel"
                    v-for="condition in props.rule?.conditions"
                    v-if="props.rule?.conditions.length > 0"
                >
                    <component
                        :is="getConditionComponent(condition.type)"
                        :condition="condition"
                    ></component>
                </div>
                <div v-else class="notification">
                    費目には、1つ以上の条件が必要です。
                </div>

            </div>
        </div>
    </div>


</ModalBase>

</template>


<style scoped>
.condition-panel:not(:last-child) {
    border-bottom: 3px solid var(--bulma-hr-background-color);
}
</style>



<script setup lang="ts">
/**
 * 全頁定型のコード
 */
import { getCurrentInstance } from 'vue'
import { Biz } from '../../../biz/biz';
import { Store } from '../../../biz/store';
import * as vm from '../../../biz/bfpviewmodel';

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
import { ref, watch } from 'vue';

// @ts-ignore TODO: fix alias settings
import ModalBase from '@/components/common/ModalBase.vue';
// @ts-ignore TODO: fix alias settings
import ConditionSomeMonthPanelComponent from '@/components/pages/entities/ConditionSomeMonthPanelComponent.vue';
// @ts-ignore TODO: fix alias settings
import ConditionStepYearPanelComponent from '@/components/pages/entities/ConditionStepYearPanelComponent.vue';
// @ts-ignore TODO: fix alias settings
import ConditionYearMonthPanelComponent from '@/components/pages/entities/ConditionYearMonthPanelComponent.vue';


const emit = defineEmits(["ok", "cancel", "remove"]);
const props = defineProps<{
    show: boolean;
    isedit: boolean;
    rule: vm.VMRule;
}>();

console.debug({rule:props.rule});

const name = ref(props.rule?.name ?? "費目の名前");
const amount = ref(props.rule?.amount ?? 0);
const classname = ref(props.rule?.classname ?? null);
const accountid = ref(props.rule?.accountid ?? null);

watch(props, () => {
    name.value = props.rule?.name ?? "";
    amount.value = props.rule?.amount ?? 0;
    classname.value = props.rule?.classname ?? null;
    accountid.value = props.rule?.accountid ?? "";
}, { immediate: true, deep: true });



const onOk = () => {
    console.debug("onOk:1");
    const new_rule_name = name.value;
    const new_rule_amount = amount.value;
    const new_rule_classname = classname.value || null;
    const new_rule_accountid = accountid.value || null;
    console.debug({new_rule_name, new_rule_amount, new_rule_classname, new_rule_accountid});
    if(!new_rule_name){ return; }
    if(!new_rule_amount){ return; }
    console.debug("onOk:2");

    props.rule.name = new_rule_name;
    props.rule.amount = new_rule_amount;
    props.rule.classname = new_rule_classname;
    props.rule.accountid = new_rule_accountid;
    emit("ok", props.rule);
};
const onCancel = () => {
    emit("cancel", null);
};
const onRemove = () => {
    emit("remove", props.rule);
};



const getConditionComponent = (type: vm.types.BFPType_RuleNames) => {
    switch (type) {
        case vm.types.BFPConst_RuleNames.BFPType_RuleNameSM:
            return ConditionSomeMonthPanelComponent;
        case vm.types.BFPConst_RuleNames.BFPType_RuleNameSMSY:
            return ConditionStepYearPanelComponent;
        case vm.types.BFPConst_RuleNames.BFPType_RuleNameYM:
            return ConditionYearMonthPanelComponent;
        default:
            throw new Error(`Unknown type '${type}'.`);
    }
}

const onAppendConditionSM = () => {
    const condition = $biz.getEmptyConditionSomeMonths();
    props.rule.conditions.push(condition);
    // save();//TODO: need save?
};
const onAppendConditionSMSY = () => {
    const condition = $biz.getEmptyConditionSomeMonthStepYear();
    props.rule.conditions.push(condition);
    // save();//TODO: need save?
};
const onAppendConditionYM = () => {
    console.debug("onAppendConditionYM");
    const condition = $biz.getEmptyConditionYearMonths();
    props.rule.conditions.push(condition);
    // save();//TODO: need save?
};


</script>
