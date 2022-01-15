import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from 'ngx-alerts';
import { tap } from 'rxjs/operators';

import * as fromAuthActions from '../actions/auth.actions';
import * as fromProductActions from '../../modules/products/state/product.actions';

@Injectable()
export class AlertEffects {
  checkingInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginModal, fromAuthActions.loginPage),
        tap(() => this.alert.info('Checking your info'))
      ),
    { dispatch: false }
  );

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap(({ user: { username } }) =>
          this.alert.success(`Welcome back ${username}!`)
        )
      ),
    { dispatch: false }
  );

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() => this.alert.danger('Unable to login. Check your credentials'))
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alert.warning('You are logged out'))
      ),
    { dispatch: false }
  );

  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => setTimeout(() => this.alert.info('Come back soon!'), 2000))
      ),
    { dispatch: false }
  );

  unableToLoadProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.loadProductsFailure),
        tap(() =>
          setTimeout(() => this.alert.danger('Unable to load products'), 2000)
        )
      ),

    { dispatch: false }
  );

  constructor(private actions$: Actions, private alert: AlertService) {}
}
