
import * as vm from './bfpviewmodel.ts';
import {Biz} from './biz.ts';

export class Store {

    private key: string = "BFPViewModel";
    private static instance: Store;

    //=====
    // 制御関連
    //=====

    public static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    private constructor() {
    }

    public load(): vm.BfpViewModel {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : Biz.getInstance().getEmptyViewModel();
    }

    public save(data: vm.BfpViewModel): void {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

}