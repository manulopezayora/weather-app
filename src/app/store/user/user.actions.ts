import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load User',
  props<{ user: User }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const logoutUser = createAction('[User] Log Out User');

export const logoutUserSuccess = createAction('[User] Log Out User Success');

export const logoutUserFailure = createAction(
  '[User] Log Out User Failure',
  props<{ error: string }>()
);

export const addToFavorite = createAction(
  '[User] Add To Favorite',
  props<{ id: number }>()
);

export const addToFavoriteSuccess = createAction(
  '[User] Add To Favorite Success',
  props<{ id: number }>()
);

export const addToFavoriteFailure = createAction(
  '[User] Add To Favorite Failure',
  props<{ error: string }>()
);

export const removeFromFavorite = createAction(
  '[User] Remove Form Favorite',
  props<{ id: number }>()
);

export const removeFromFavoriteSuccess = createAction(
  '[User] Remove Form Favorite Success',
  props<{ id: number }>()
);

export const removeFromFavoriteFailure = createAction(
  '[User] Remove Form Favorite Failure',
  props<{ error: string }>()
);
