import { ProfileActions, ProfileActionTypes } from '../actions/profile.actions';
import { IProfileState, initialProfileState } from '../state/profile.state';


export function reducer(state = initialProfileState, action: ProfileActions): IProfileState {

    switch (action.type) {
        case ProfileActionTypes.ResetProfiles:{
            return{
                ...initialProfileState
            }
        }
        case ProfileActionTypes.SetFirstProfile:
            return {
                ...state,
                firstProfileLoading:true,
                firstProfileLoaded:false
            }
        case ProfileActionTypes.SetFirstProfileSuccess:
            return {
                ...state,
                firstProfile: action.payload,
                firstProfileLoading: false,
                firstProfileLoaded: true
            };
        case ProfileActionTypes.SetFirstProfileFail:
            return {
                ...state,
                error: action.payload,
                firstProfileLoading: false,
                firstProfileLoaded: false
            };

        case ProfileActionTypes.SetSecondProfile:
            return {
                ...state,
                secondProfileLoading: true,
                firstProfileLoaded:false
            };
        case ProfileActionTypes.SetSecondProfileSuccess:
            return {
                ...state,
                secondProfile:action.payload,
                secondProfileLoading: false,
                secondProfileLoaded: true
            };
        case ProfileActionTypes.SetSecondProfileFail:
            return {
                ...state,
                secondProfileLoading: false,
                secondProfileLoaded: false
            }
        default:
            return state;
    }
}