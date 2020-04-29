import * as fromRoot from '../../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BattleActions, BattleActionTypes } from './battle.actions';
import { IProfile } from '../../profile/profile';

export interface State extends fromRoot.State{
    battle: BattleState;
}

export interface BattleState{
    compareByRepos: boolean;
    compareByGists: boolean;
    compareByBlog: boolean;
    compareByFollowers: boolean;
    compareByCompany: boolean;
    compareByVechime: boolean;
    compareByCompleteness: boolean;
}

const initialState: BattleState ={
    compareByRepos: true,
    compareByGists: true,
    compareByBlog: true,
    compareByFollowers: true,
    compareByCompany:true,
    compareByVechime:true,
    compareByCompleteness:true,
};

export const getBattleState = createFeatureSelector<BattleState>('battle');



export function reducer(state=initialState, action:BattleActions): BattleState
{
    switch(action.type){
        
        case BattleActionTypes.CompareByRepos:
            return{
                ...state,
                compareByRepos: action.payload
            };
        
        case BattleActionTypes.CompareByGists:
            return {
                ...state,
                compareByGists: action.payload
            };
        case BattleActionTypes.CompareByBlog:
            return {
                ...state,
                compareByBlog: action.payload
            };
        case BattleActionTypes.CompareByFollowers:
            return {
                ...state,
                compareByFollowers: action.payload
            };
        case BattleActionTypes.CompareByCompany:
            return {
                ...state,
                compareByCompany: action.payload
            };
        case BattleActionTypes.CompareByVechime:
            return {
                ...state,
                compareByVechime: action.payload
            };
        case BattleActionTypes.CompareByCompleteness:
            return {
                ...state,
                compareByCompleteness: action.payload
            };
        

        default:
            return state;
    }
}