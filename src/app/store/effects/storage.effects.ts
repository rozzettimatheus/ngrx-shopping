import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { storageKey } from '../../modules/auth/resources/auth';
import * as fromAuthActions from '../actions/auth.actions';

@Injectable()
export class StorageEffects {
  removeUserFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => {
          if (localStorage.getItem(storageKey)) {
            localStorage.removeItem(storageKey);
          }
        })
      ),
    { dispatch: false }
  );

  addUserFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap(({ user }) => {
          localStorage.setItem(
            '[ngrx_shoppingapp] user_info',
            JSON.stringify(user)
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
