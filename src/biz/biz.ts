//import { Storage } from './lib/_storage.ts';
import * as vm from './bfpviewmodel.ts';
import * as core from "./lib/bfp/rule/main.ts";


export class Biz {
    private static instance: Biz;

    //=====
    // 制御関連
    //=====

    public static getInstance(): Biz {
        if (!Biz.instance) {
            Biz.instance = new Biz();
        }
        return Biz.instance;
    }

    private constructor() {
    }


    private getUniqueId(): string {
        const radix = 36;
        const func = (n:number)=>{ return n.toString(radix); };
        const pre = Math.floor(Math.random() * radix);
        const timestamp = +new Date();
        const id = `${func(pre)}${func(timestamp)}`;
        return id;
    }

    //=====
    // 業務関連
    //=====

    public getThisMonth(): core.type.BFPType_Month {
        const now = new Date();
        return (now.getMonth() + 1) as core.type.BFPType_Month;
    }
    public getThisYearMonth(): core.type.BFPType_YearMonth {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: (now.getMonth() + 1) as core.type.BFPType_Month,
        };
    }
    public yearMonthToString(yearmonth:core.type.BFPType_YearMonth): string {
        const year = `${yearmonth.year}`;
        const month = `00${yearmonth.month}`.slice(-2);
        return `${year}-${month}`;
    }
    public stringToYearmonth(yearmonth:string):core.type.BFPType_YearMonth {
        const errormessage = `stringToYearmonth: argument '${yearmonth}' is invalid.`;

        if(!yearmonth.match(/\d{4}-\d{2}/)){ throw new Error(errormessage); }
        const [year, month] = yearmonth.split("-").map(e => Number(e));

        if(![1,2,3,4,5,6,7,8,9,10,11,12].includes(month)){ throw new Error(errormessage); }
        return {
            year: Number(year) as core.type.BFPType_Year,
            month: Number(month) as core.type.BFPType_Month,
        };

    }

    public getEmptyViewModel(): vm.BfpViewModel {
        const account = this.getEmptyAccount();
        return {
            accounts: [account],
            defaultaccountid: account.id,
            entities: [],
        };
    }

    public getEmptyAccount(): vm.VMAccount {
        return {
            id: this.getUniqueId(),
            name: "口座名",
            memo: "何用の口座かなどのメモ",
            records: [],
        };
    }
    public getEmptyRecord(): vm.VMRecord {
        return {
            id: this.getUniqueId(),
            yearmonth: this.yearMonthToString(this.getThisYearMonth()),
            memo: null,
            balance: 0,
        }
    }

    public getEmptyEntity(): vm.VMEntity {
        return {
            id: this.getUniqueId(),
            sortorder: 0,
            fromYM: null,
            toYM: null,
            name: vm.ObjectNames.Klass,
            presetentityid: null,
            rules: [],
        };
    }

    public getEmptyRule(): vm.VMRule {
        return {
            id: this.getUniqueId(),
            sortorder: 0,
            fromYM: null,
            toYM: null,
            name: vm.ObjectNames.Rule,
            amount: 0,
            classname: null,
            presetruleid: null,
            conditions: [],
        };
    }

    public getEmptyConditionYearMonths(): core.type.BFPRuleArg_YearMonths {
        const yeaemonth = this.getThisYearMonth();
        return {
            id: this.getUniqueId(),
            type: core.type.BFPConst_RuleNames.BFPType_RuleNameYM,
            sortorder: 0,
            fromYM: null,
            toYM: null,
            not: false,
            yearmonths: [yeaemonth],
        };
    }
    public getEmptyConditionSomeMonths(): core.type.BFPRuleArg_SomeMonth {
        const month = this.getThisMonth();
        return {
            id: this.getUniqueId(),
            type: core.type.BFPConst_RuleNames.BFPType_RuleNameSM,
            sortorder: 0,
            fromYM: null,
            toYM: null,
            not: false,
            months: [month],
        }
    }
    public getEmptyConditionSomeMonthStepYear(): core.type.BFPRuleArg_SomeMonthStepYear {
        const month = this.getThisMonth();
        return {
            id: this.getUniqueId(),
            type: core.type.BFPConst_RuleNames.BFPType_RuleNameSMSY,
            sortorder: 0,
            fromYM: null,
            toYM: null,
            not: false,
            months: [month],
            step: 1,
        }
    }
}