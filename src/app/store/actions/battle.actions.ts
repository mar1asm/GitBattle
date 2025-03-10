import { Action } from '@ngrx/store';

export enum BattleActionTypes {
    CompareByRepos = '[Battle] Compare By Repos',
    CompareByGists = '[Battle] Compare By Gists',
    CompareByBlog = '[Battle] Compare By Blog',
    CompareByFollowers = '[Battle] Compare By Followers',
    CompareByCompany = '[Battle] Compare By Company',
    CompareByDate = '[Battle] Compare By Date'

}

export class CompareByRepos implements Action {
    readonly type = BattleActionTypes.CompareByRepos;

    constructor(public payload: boolean) { }
}

export class CompareByGists implements Action {
    readonly type = BattleActionTypes.CompareByGists;

    constructor(public payload: boolean) { }
}

export class CompareByBlog implements Action {
    readonly type = BattleActionTypes.CompareByBlog;

    constructor(public payload: boolean) { }
}

export class CompareByFollowers implements Action {
    readonly type = BattleActionTypes.CompareByFollowers;

    constructor(public payload: boolean) { }
}

export class CompareByCompany implements Action {
    readonly type = BattleActionTypes.CompareByCompany;

    constructor(public payload: boolean) { }
}

export class CompareByDate implements Action {
    readonly type = BattleActionTypes.CompareByDate;

    constructor(public payload: boolean) { }
}



export type BattleActions = CompareByBlog 
    | CompareByRepos 
    | CompareByGists 
    | CompareByFollowers 
    | CompareByDate 
    | CompareByCompany;