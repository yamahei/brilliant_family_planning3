<template>

<table class="table">
    <thead>
        <tr>
            <th rowspan="3" class="ym">年月</th>
            <th colspan="3">主体A</th>
            <th>主体B</th>
            <th colspan="3">銀行（累積残高）</th>
            <th colspan="3">銀行（単年月収支）</th>
        </tr>
        <tr>
            <th colspan="2">カテゴリa</th>
            <th>カテゴリb</th>
            <th>カテゴリc</th>
            <th rowspan="2">銀行ア</th>
            <th rowspan="2">銀行イ</th>
            <th rowspan="2">総計</th>
            <th rowspan="2">銀行ア</th>
            <th rowspan="2">銀行イ</th>
            <th rowspan="2">総計</th>
        </tr>
        <tr>
            <th>イベント1</th>
            <th>イベント2</th>
            <th>イベント3</th>
            <th>イベント4</th>
        </tr>
    </thead>
    <tbody>
        <tr><th>2026-01</th><td>-1000</td><td>500</td><td>0</td><td>0</td><td>44500</td><td>250000</td><td>294500</td><td>-500</td><td>0</td><td>-500</td></tr>
        <tr><th>2026-02</th><td>0</td><td>500</td><td>0</td><td>0</td><td>45000</td><td>250000</td><td>295000</td><td>500</td><td>0</td><td>500</td></tr>
        <tr><th>2026-03</th><td>0</td><td>500</td><td>150000</td><td>-70000</td><td>45500</td><td>330000</td><td>375500</td><td>500</td><td>80000</td><td>80500</td></tr>
        <tr><th>2026-04</th><td>0</td><td>500</td><td>0</td><td>0</td><td>46000</td><td>330000</td><td>376000</td><td>500</td><td>0</td><td>500</td></tr>
        <tr><th>2026-05</th><td>0</td><td>500</td><td>0</td><td>0</td><td>46500</td><td>330000</td><td>376500</td><td>500</td><td>0</td><td>500</td></tr>
        <tr><th>2026-06</th><td>-1000</td><td>500</td><td>0</td><td>0</td><td>46000</td><td>330000</td><td>376000</td><td>-500</td><td>0</td><td>-500</td></tr>
    </tbody>
</table>

</template>

<style scoped>
    th {
        white-space: nowrap;
        background-color: #f5f5f5;
        text-align: center !important;
        vertical-align: middle;
        max-width: 240px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    td {
        padding-right: 0.5rem !important;
        text-align: right !important;
        vertical-align: middle;
        font-family: Consolas, "Andale Mono", "Courier New", Courier, Monaco, monospace;
    }

    /**
     * CSSのposition: stickyでテーブルのヘッダー行・列を固定する
     * https://qiita.com/orangain/items/6268b6528ab33b27f8f2
     */
    thead th {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1;
    }
    thead tr:nth-child(1) th { top: 0; }
    thead tr:nth-child(2) th { top: 40px; }
    thead tr:nth-child(3) th { top: 80px; }

</style>


<script setup lang="ts">

// @ts-ignore TODO: fix alias settings
import * as vm from '@/biz/bfpviewmodel';

</script>

