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
