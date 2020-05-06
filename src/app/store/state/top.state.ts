import * as fromRoot from '../state/app.state';

export interface State extends fromRoot.State {
    top: ITopState;
}

export interface ITopState {
    sortBy:string;
    sortByLanguage:string;
}

export const initialTopState: ITopState = {
    sortBy: 'followers',
    sortByLanguage: 'Any'
};