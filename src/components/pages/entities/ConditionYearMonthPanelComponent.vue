<template>

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
            <div class="field">
                <p class="control">
                    <input class="input is-small is-narrow" type="month"/>
                </p>
            </div>
        </div>
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

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';

//TODO: define property: category: VMCategory



</script>

