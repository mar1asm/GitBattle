import { Action } from '@ngrx/store';
import { IProfile } from '../../components/profile/IProfile';

export enum ProfileActionTypes{
    SetFirstProfile='[Profile] Set First Profile',
    SetFirstProfileSuccess='[Profile] Set First Profile Success',
    SetFirstProfileFail='[Profile] Set First Profile Fail',
    SetSecondProfile='[Profile] Set Second Profile',
    SetSecondProfileSuccess='[Profile] Set Second Profile Success',
    SetSecondProfileFail='[Profile] Set Second Profile Fail',
    ResetProfiles='[Profile] Reset Profiles'

}

export class ResetProfiles implements Action{
    readonly type=ProfileActionTypes.ResetProfiles;
}

export class SetFirstProfile implements Action{
    readonly type=ProfileActionTypes.SetFirstProfile;

    constructor(public payload: string) { }
}

export class SetFirstProfileSuccess implements Action{
    readonly type=ProfileActionTypes.SetFirstProfileSuccess;
    constructor(public payload: IProfile) { }
}

export class SetFirstProfileFail implements Action{
    readonly type=ProfileActionTypes.SetFirstProfileFail;
    constructor(public payload: string) { }
}

export class SetSecondProfile implements Action{
    readonly type=ProfileActionTypes.SetSecondProfile;
    constructor(public payload: string) { }
}

export class SetSecondProfileSuccess implements Action{
    readonly type=ProfileActionTypes.SetSecondProfileSuccess;
    constructor(public payload: IProfile) { }
}

export class SetSecondProfileFail implements Action{
    readonly type=ProfileActionTypes.SetSecondProfileFail;
    constructor(public payload: string) { }
}

export type ProfileActions=SetFirstProfile
    | SetFirstProfileSuccess
    | SetFirstProfileFail
    | SetSecondProfile
    | SetSecondProfileSuccess
    | SetSecondProfileFail
    | ResetProfiles