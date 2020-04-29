import * as fromRoot from '../../../state/app.state';
import { TopActions, TopActionTypes } from './top.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    top: TopState;
}

export interface TopState {
    sortByFollowers: boolean;
    sortByRepos: boolean;

    sortByLanguageJs: boolean;
    sortByLanguageCpp: boolean;
    sortByLanguagePython: boolean;
}

const initialState: TopState = {
    sortByFollowers: true,
    sortByRepos: false,
    sortByLanguageJs: true,
    sortByLanguageCpp: true,
    sortByLanguagePython: true
};

export const getTopState= createFeatureSelector<TopState>('top');

export function reducer(state = initialState, action: TopActions): TopState {
    switch (action.type) {
        case TopActionTypes.SetSortByFollowers:
            return {
                ...state,
                sortByFollowers: action.payload
            };
        case TopActionTypes.SetSortByRepos:
            return {
                ...state,
                sortByRepos: action.payload
            };
        case TopActionTypes.SetSortByLanguageJs: 
            return {
                ...state,
                sortByLanguageJs: action.payload
            };
        case TopActionTypes.SetSortByLanguageCpp: 
            return {
                ...state,
                sortByLanguageCpp: action.payload
            };
        case TopActionTypes.SetSortByLanguagePython: 
            return {
                ...state,
                sortByLanguagePython: action.payload
            };

        default:
            return state;
    }
}