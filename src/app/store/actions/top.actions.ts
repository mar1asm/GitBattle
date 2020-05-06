import { Action } from '@ngrx/store';

export enum TopActionTypes{
    SetSortBy='[Top] Set Sort By',
    SetSortByLanguage='[Top] Set Sort By Language',

}

export class SetSortBy implements Action{
    readonly type=TopActionTypes.SetSortBy;
    constructor(public payload: string) { };
}


export class SetSortByLanguage implements Action{
    readonly type=TopActionTypes.SetSortByLanguage;
    constructor(public payload: string) { };
}



export type TopActions=SetSortBy
    |SetSortByLanguage;