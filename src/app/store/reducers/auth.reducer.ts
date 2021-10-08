import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/modules/auth/resources/auth';
import * as fromAuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
  error: any;
}

export const initialState: State = {
  user: {
    email: null,
    username: null,
    id: null,
    isadmin: null,
  },
  error: null,
};

export const reducer = createReducer(
  initialState,
  // if action payload is equal
  on(
    fromAuthActions.loginSuccess,
    fromAuthActions.browserReload,
    (state, action) => ({
      ...state,
      user: action.user,
      error: null,
    })
  ),
  on(fromAuthActions.loginFailure, (state, action) => ({
    ...state,
    user: { ...initialState.user },
    error: action.error,
  })),
  on(fromAuthActions.logout, (state, action) => ({
    ...state,
    ...initialState,
  }))
);
