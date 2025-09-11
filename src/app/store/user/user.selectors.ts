import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectFavoriteIds = createSelector(
  selectUser,
  (user) => user?.favorites ?? []
);
