import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MockProductApiService } from '../resources/mock-product-api.service';

import * as fromProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  // load products API effect
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProductActions.loadProducts,
        fromProductActions.loadAdminProducts
      ),
      mergeMap((action) =>
        this.productService.getProducts(action.url).pipe(
          map(
            (paginatedResult) =>
              fromProductActions.loadProductsSuccess({ paginatedResult }),
            catchError((error) =>
              of(fromProductActions.loadProductsFailure({ error }))
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: MockProductApiService
  ) {}
}
