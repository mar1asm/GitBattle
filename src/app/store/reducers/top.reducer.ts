
import { TopActions, TopActionTypes } from '../actions/top.actions';
import { ITopState,initialTopState } from '../state/top.state';


export function reducer(state = initialTopState, action: TopActions): ITopState {
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