import * as fromRoot from '../../../state/app.state';
import { IProfile } from '../profile';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileActions, ProfileActionTypes } from './profile.actions';

export interface State extends fromRoot.State{
    profile: ProfileState;
}

export interface ProfileState{
    firstProfile:IProfile;
    secondProfile:IProfile;
}

const initialState: ProfileState={
    firstProfile: null,
    secondProfile: null
};
export const getProfileState = createFeatureSelector<ProfileState>('profile');

export const getSetFirstProfile= createSelector(
    getProfileState,
    state => state.firstProfile
);

export const getSetSecondProfile= createSelector(
    getProfileState,
    state => state.secondProfile
);

export function reducer(state=initialState, action: ProfileActions): ProfileState{
    
    switch(action.type)
    {
        case ProfileActionTypes.SetFirstProfile:
            return{
                ...state,
                firstProfile: action.payload
            };

        case ProfileActionTypes.SetSecondProfile:
            return{
                ...state,
                secondProfile: action.payload
            }
        default: 
            return state;
    }
}