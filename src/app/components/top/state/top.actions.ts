import { Action } from '@ngrx/store';

export enum TopActionTypes{
    SetSortByFollowers='[Top] Set Sort By Followers',
    SetSortByRepos='[Top] Set Sort By Repos',
    SetSortByLanguageJs='[Top] Set Sort By Language Js',
    SetSortByLanguageCpp='[Top] Set Sort By Language Cpp',
    SetSortByLanguagePython='[Top] Set Sort By Language Python'

}

export class SetSortByFollowers implements Action{
    readonly type=TopActionTypes.SetSortByFollowers;
    constructor(public payload: boolean) { };
}

export class SetSortByRepos implements Action{
    readonly type=TopActionTypes.SetSortByRepos;
    constructor(public payload: boolean) { };
}

export class SetSortByLanguageJs implements Action{
    readonly type=TopActionTypes.SetSortByLanguageJs;
    constructor(public payload: boolean) { };
}

export class SetSortByLanguageCpp implements Action{
    readonly type=TopActionTypes.SetSortByLanguageCpp;
    constructor(public payload: boolean) { };
}

export class SetSortByLanguagePython implements Action{
    readonly type=TopActionTypes.SetSortByLanguagePython;
    constructor(public payload: boolean) { };
}


export type TopActions=SetSortByFollowers
    |SetSortByRepos
    |SetSortByLanguageJs
    |SetSortByLanguageCpp
    |SetSortByLanguagePython;