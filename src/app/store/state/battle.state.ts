import * as fromRoot from './app.state';

export interface BattleState extends fromRoot.State{
    battle: IBattleState;
}

export interface IBattleState{
    compareByRepos: boolean;
    compareByGists: boolean;
    compareByBlog: boolean;
    compareByFollowers: boolean;
    compareByCompany: boolean;
    compareByDate: boolean;
}

export const initialBattleState: IBattleState ={
    compareByRepos: true,
    compareByGists: true,
    compareByBlog: true,
    compareByFollowers: true,
    compareByCompany:true,
    compareByDate:true
};