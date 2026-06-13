

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
                            <a class="dropdown-item">
                                <span class="tag is-info">指定月</span>
                                指定した月（毎年）
                            </a>
                            <a class="dropdown-item">
                                <span class="tag is-success">隔年月</span>
                                指定した月（隔年）
                            </a>
                            <a class="dropdown-item">
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

                <div class="content">

                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field is-flex-grow-0">
                                <p class="control">
                                    <span class="tag is-warning">特定日</span>
                                </p>
                            </div>
                            <div class="field is-flex-grow-0 flex-last-order">
                                <p class="control">
                                    <button class="button is-small">🗑️</button>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <label class="checkbox">
                                        結果を反転する
                                        <input class="toggle is-small" type="checkbox"/>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" type="month"/>
                        </p>
                    </div>

                </div>

                <div class="content">

                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field is-flex-grow-0">
                                <p class="control">
                                    <span class="tag is-info">指定月</span>
                                </p>
                            </div>
                            <div class="field is-flex-grow-0 flex-last-order">
                                <p class="control">
                                    <button class="button is-small">🗑️</button>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <label class="checkbox">
                                        結果を反転する
                                        <input class="toggle is-small" type="checkbox"/>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field has-addons">
                        <p class="control" v-for="month in 12">
                            <button class="button is-small">{{ month }}</button>
                        </p>
                    </div>

                </div>


                <div class="content">

                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field is-flex-grow-0">
                                <p class="control">
                                    <span class="tag is-success">隔年月</span>
                                </p>
                            </div>
                            <div class="field is-flex-grow-0 flex-last-order">
                                <p class="control">
                                    <button class="button is-small">🗑️</button>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <label>
                                        結果を反転する
                                        <input class="toggle is-small" type="checkbox"/>
                                    </label>
                                </p>
                            </div>
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input is-small" type="number" />
                                </p>
                                <p class="control">
                                    <label>年ごと</label>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field has-addons">
                        <p class="control" v-for="month in 12">
                            <button class="button is-small">{{ month }}</button>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>


</ModalBase>

</template>


<style scoped>
input[type=checkbox].toggle.is-small {
  --size:16px;
}
.flex-last-order {
    order: 65535;
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



const emit = defineEmits(["ok", "cancel", "remove"]);
const props = defineProps<{
    show: boolean;
    isedit: boolean;
    rule: vm.VMRule;
}>();

const name = ref(props.rule?.name ?? "費目の名前");
const amount = ref(props.rule?.amount ?? 0);
const classname = ref(props.rule?.classname ?? null);
const accountid = ref(props.rule?.accountid ?? null);

watch(props, () => {
    name.value = props.rule?.name ?? "";
    amount.value = props.rule?.amount ?? 0;
    classname.value = props.rule?.classname ?? null;
    accountid.value = props.rule?.accountid ?? "";
});



const onOk = () => {
    const new_rule_name = name.value;
    const new_rule_amount = amount.value;
    const new_rule_classname = classname.value || null;
    const new_rule_accountid = accountid.value || null;
    if(!new_rule_name){ return; }
    if(!new_rule_amount){ return; }

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


</script>
