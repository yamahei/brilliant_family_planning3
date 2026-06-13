import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { Biz } from './biz/biz.ts';
import { Store } from './biz/store.ts';
import { Util } from "./biz/util.ts";

import App from './App.vue'

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior() {//遷移時にページのトップにスクロールする
        return { top: 0 }
    },
});

const biz = Biz.getInstance();
const store = Store.getInstance(biz.getEmptyViewModel());
const data  = store.load();
const util = Util.getInstance();

const app = createApp(App);
app.use(router);
app.mount('#app');
app.config.globalProperties.$biz = biz;
app.config.globalProperties.$store = store;
app.config.globalProperties.$data = data;
app.config.globalProperties.$util = util;
app.config.errorHandler = (err, vm, info) => {
    console.error([
        "errorHandler gets error.",
        "log error information and redirect to /500.",
    ].join("\n"));
    console.debug({err, vm, info});
    router.replace("/500");
};