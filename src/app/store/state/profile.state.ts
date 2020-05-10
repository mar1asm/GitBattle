import { IProfile } from '../../shared/IProfile';
import * as fromRoot from './app.state';

export interface ProfileState extends fromRoot.State{
    profile: IProfileState;
}

export interface IProfileState{
    firstProfile:IProfile;
    firstProfileLoading: boolean;
    firstProfileLoaded: boolean;
    secondProfile:IProfile;
    secondProfileLoading: boolean;
    secondProfileLoaded: boolean;
    error: string;
}

export const initialProfileState: IProfileState={
    firstProfile: null,
    firstProfileLoading:false,
    firstProfileLoaded:false,
    secondProfile: null,
    secondProfileLoading:false,
    secondProfileLoaded: false,
    error: ''
};