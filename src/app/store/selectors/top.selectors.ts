import { ITopState } from '../state/top.state';
import { createFeatureSelector } from '@ngrx/store';

export const getTopState= createFeatureSelector<ITopState>('top');