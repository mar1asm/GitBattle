import { Action } from '@ngrx/store';
import { IProfile } from '../../profile/profile';

export enum BattleActionTypes {
    CompareByRepos = '[Battle] Compare By Repos',
    CompareByGists = '[Battle] Compare By Gists',
    CompareByBlog = '[Battle] Compare By Blog',
    CompareByFollowers = '[Battle] Compare By Followers',
    CompareByCompany = '[Battle] Compare By Company',
    CompareByVechime = '[Battle] Compare By Vechime',
    CompareByCompleteness = '[Battle] Compare By Completeness',

    SetFirstProfile='[Battle] Set First Profile',
    SetSecondProfile='[Battle] Set Second Profile'
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

export class CompareByVechime implements Action {
    readonly type = BattleActionTypes.CompareByVechime;

    constructor(public payload: boolean) { }
}

export class CompareByCompleteness implements Action {
    readonly type = BattleActionTypes.CompareByCompleteness;

    constructor(public payload: boolean) { }
}

export class SetFirstProfile implements Action {
    readonly type= BattleActionTypes.SetFirstProfile;

    constructor(public payload: IProfile) { }
}

export class SetSecondProfile implements Action {
    readonly type= BattleActionTypes.SetSecondProfile;

    constructor(public payload: IProfile) { }
}

export type BattleActions = CompareByBlog 
    | CompareByRepos 
    | CompareByGists 
    | CompareByFollowers 
    | CompareByVechime 
    | CompareByCompleteness 
    | CompareByCompany
    | SetFirstProfile
    | SetSecondProfile;