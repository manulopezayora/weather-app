import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
