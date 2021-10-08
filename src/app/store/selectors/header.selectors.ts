import { createSelector } from '@ngrx/store';
import * as fromAuthSelectors from './auth.selectors';

export interface HeaderViewModel {
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export const selectHeaderViewModel = createSelector(
  fromAuthSelectors.selectIsLoggedIn,
  fromAuthSelectors.selectIsAdmin,
  (isLoggedIn: boolean, isAdmin: boolean): HeaderViewModel => ({
    isLoggedIn,
    isAdmin,
  })
);
