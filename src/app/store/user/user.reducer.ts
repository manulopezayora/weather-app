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
  })),
  on(UserActions.logoutUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.logoutUserSuccess, (state) => ({
    ...state,
    user: null,
    loading: false
  })),
  on(UserActions.logoutUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.addToFavorite, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.addToFavoriteSuccess, (state, { id }) => {
    if (!state.user) {
      return state;
    }

    return {
      ...state,
      user: {
        ...state.user,
        favorites: [...new Set([...(state.user?.favorites ?? []), id])],
      },
      loading: false,
      error: null
    }
  }),
  on(UserActions.addToFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.removeFromFavorite, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.removeFromFavoriteSuccess, (state, { id }) => {
    if (!state.user) {
      return state;
    }

    return {
      ...state,
      user: {
        ...state.user,
        favorites: state.user.favorites?.filter(fav => fav !== id),
      },
      loading: false,
      error: null
    }
  }),
  on(UserActions.removeFromFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
