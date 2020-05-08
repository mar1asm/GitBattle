import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as profileActions from '../actions/profile.actions'
import * as fromService from '../../services/profile.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IProfile } from '../../profile/IProfile';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class profileEffects {
    constructor(private actions$: Actions,
                private profileService: fromService.ProfileService) { }

    @Effect()
    setFirstProfile$: Observable<Action> = this.actions$.pipe(
        ofType<profileActions.SetFirstProfile>(
            profileActions.ProfileActionTypes.SetFirstProfile
        ),
        mergeMap((action: profileActions.SetFirstProfile) => 
        this.profileService.getProfileData(action.payload).pipe(
            map((profile: IProfile) => new profileActions.SetFirstProfileSuccess(profile)),
            catchError(error => of(new profileActions.SetFirstProfileFail(error))),
            )
        )
    );

    @Effect()
    setSecondProfile$: Observable<Action> = this.actions$.pipe(
        ofType<profileActions.SetSecondProfile>(
            profileActions.ProfileActionTypes.SetSecondProfile
        ),
        mergeMap((action: profileActions.SetSecondProfile) => 
        this.profileService.getProfileData(action.payload).pipe(
            map((profile: IProfile) => new profileActions.SetSecondProfileSuccess(profile)),
            catchError(error => of(new profileActions.SetSecondProfileFail(error))),
            )
        )
    );
};