import { Action } from '@ngrx/store';
import { IProfile } from '../profile';

export enum ProfileActionTypes{
    SetFirstProfile='[Profile] Set First Profile',
    SetSecondProfile='[Profile] Set Second Profile'
}

export class SetFirstProfile implements Action{
    readonly type=ProfileActionTypes.SetFirstProfile;
    constructor(public payload: IProfile) { };
}

export class SetSecondProfile implements Action{
    readonly type=ProfileActionTypes.SetSecondProfile;
    constructor(public payload: IProfile) { };
}

export type ProfileActions=SetFirstProfile
    | SetSecondProfile;