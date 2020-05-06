import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProfileState, ProfileState } from '../state/profile.state';

export const getProfileState = createFeatureSelector<IProfileState>('profile');

export const getFirstProfile= createSelector(
    getProfileState,
    (state:IProfileState) => state.firstProfile
);

export const getSecondProfile= createSelector(
    getProfileState,
    (state:IProfileState) => state.secondProfile
);

export const haveLoaded =createSelector(
    getProfileState,
    (state: IProfileState) => [state.firstProfileLoaded, state.secondProfileLoaded]
);


export const getError= createSelector(
    getProfileState,
    (state:IProfileState) => state.error
);