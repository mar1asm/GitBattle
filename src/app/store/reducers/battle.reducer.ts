import { BattleActions, BattleActionTypes } from '../actions/battle.actions';
import { IBattleState, initialBattleState } from '../state/battle.state';



export function reducer(state=initialBattleState, action:BattleActions): IBattleState
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
        case BattleActionTypes.CompareByDate:
            return {
                ...state,
                compareByDate: action.payload
            };

        default:
            return state;
    }
}