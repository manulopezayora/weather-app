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
