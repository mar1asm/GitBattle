import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBattleState } from '../state/battle.state';

export const getBattleState = createFeatureSelector<IBattleState>('battle');