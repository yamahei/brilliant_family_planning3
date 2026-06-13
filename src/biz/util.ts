//import { Storage } from './lib/_storage.ts';

export class Util {
    private static instance: Util;

    //=====
    // 制御関連
    //=====

    public static getInstance(): Util {
        if (!Util.instance) {
            Util.instance = new Util();
        }
        return Util.instance;
    }

    private constructor() {
    }

    public commaFilter(num:number|null):string{
        return (num === null) ? "" : num.toLocaleString();
    }

}