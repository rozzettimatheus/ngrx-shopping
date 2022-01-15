import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

import * as fromAuthActions from '../actions/auth.actions';
import * as fromProductActions from '../../modules/products/state/product.actions';

@Injectable()
export class SpinnerEffects {
  // quando nao da dispatch em nenhuma action
  spinnerOn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginPage,
          fromAuthActions.loginModal,
          fromProductActions.loadProducts,
          fromProductActions.loadAdminProducts
        ),
        tap(() => this.spinner.show())
      ),
    { dispatch: false }
  );

  spinnerOff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromAuthActions.loginFailure,
          fromProductActions.loadProductsSuccess,
          fromProductActions.loadProductsFailure
        ),
        tap(() => this.spinner.hide())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}
}
