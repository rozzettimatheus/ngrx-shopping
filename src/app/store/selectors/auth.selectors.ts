import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthLinksViewModel {
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  ({ user }): boolean => user.id !== null
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  ({ user }): boolean => user.isadmin
);

export const selectAuthLinksViewModel = createSelector(
  selectIsLoggedIn,
  selectIsAdmin,
  (isLoggedIn: boolean, isAdmin: boolean): AuthLinksViewModel => ({
    isLoggedIn,
    isAdmin,
  })
);
