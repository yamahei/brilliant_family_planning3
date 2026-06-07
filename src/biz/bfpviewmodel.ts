import * as types from "./lib/bfp/rule/types.ts";

/*
    Names
*/
export const ObjectNames = {
    Klass: "収支メンバー",
    Category: "用途",
    Rule: "ルール",
    Condition: "条件",
}

/*
    VMAccounts
*/

export type VMRecord = {
    yearmonth: NonNullable<types.BFPType_YearMonth>;
    memo: string | null;
    balance : number;
};
export type VMRecords = VMRecord[];

export type VMAccount = {
    id: string;//Biz.getUniqueId()で生成する
    name: string;
    memo: string | null;
    records: NonNullable<VMRecords>;
};
export type VMAccounts = VMAccount[];

/*
    VMKlasses
*/
export const VMRuleNotes = [
    {
        type: types.BFPConst_RuleNames.BFPType_RuleNameSM,
        name: "指定月",
        description: "毎年 4月と10月など、指定した月に毎年発生するルール",
    },
    {
        type: types.BFPConst_RuleNames.BFPType_RuleNameSMSY,
        name: "複雑なルール",
        description: "x年ごとの指定月に発生するルール（毎年はx=1）",
    },
    {
        type: types.BFPConst_RuleNames.BFPType_RuleNameYM,
        name: "特定年月",
        description: "1999年12月など、特定の年月にだけ発生するルール",
    }
];

//費目
export type VMRule = {
    sortorder: number;
    name: string;
    amount: number;
    presetruleid: string | null;
    conditions: NonNullable<types.BFPRules>;
    accountid?: string | null;
}
export type VMRules = VMRule[];

//分類
export type VMCategory = {
    sortorder: number;
    name: string;
    presetcategoryid: string | null;
    rules: NonNullable<VMRules>;
};
export type VMCategories = VMCategory[];

//主体
export type VMKlass = {
    sortorder: number;
    name: string;
    presetklassid: string | null;
    categories: NonNullable<VMCategories>;
};
export type VMKlasses = VMKlass[];

/*
    SummaryCaches
*/

// export type VMSummaryCache = {
//     yearmonth: NonNullable<types.BFPType_YearMonth>;
//     balance: number;
//     income: number;
//     outgo: number;
// };
// export type VMSummaryCaches = VMSummaryCache[];

/*
    ViewModel
*/
export type BfpViewModel = {
    accounts: NonNullable<VMAccounts>;
    defaultaccountid: string;
    klasses: NonNullable<VMKlasses>;
    // summarycaches: NonNullable<VMSummaryCaches>;
    // presetvalues: null;//TODO
};