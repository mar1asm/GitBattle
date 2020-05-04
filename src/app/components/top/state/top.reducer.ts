import * as fromRoot from '../../../state/app.state';
import { TopActions, TopActionTypes } from './top.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    top: TopState;
}

export interface TopState {
    sortBy:string;
    sortByLanguage:string;
}

const initialState: TopState = {
    sortBy: 'followers',
    sortByLanguage: 'Any'
};

export const getTopState= createFeatureSelector<TopState>('top');

export function reducer(state = initialState, action: TopActions): TopState {
    switch (action.type) {
        case TopActionTypes.SetSortBy:
            return {
                ...state,
                sortBy: action.payload
            };
        case TopActionTypes.SetSortByLanguage: 
            return {
                ...state,
                sortByLanguage: action.payload
            };

        default:
            return state;
    }
}