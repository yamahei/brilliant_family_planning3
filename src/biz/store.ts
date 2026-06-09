
import * as vm from './bfpviewmodel.ts';
import {Biz} from './biz.ts';

export class Store {

    private key: string = "BFPViewModel";
    private static instance: Store;
    private emptydata: vm.BfpViewModel | null;

    //=====
    // 制御関連
    //=====

    public static getInstance(emptydata: vm.BfpViewModel): Store {
        if (!Store.instance) {
            Store.instance = new Store(emptydata);
        }
        return Store.instance;
    }

    private constructor(emptydata: vm.BfpViewModel) {
        this.emptydata = emptydata;
    }

    public load(): vm.BfpViewModel {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : this.emptydata!;
    }

    public save(data: vm.BfpViewModel): void {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    public clear(): void {
        localStorage.removeItem(this.key);
    }

}