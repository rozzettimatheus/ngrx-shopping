import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CustomerSupportService } from '../../shared/services/customer-support.service';

import * as fromCustomerSupportActions from '../actions/customer-support.actions';

@Injectable()
export class CustomerSupportEffects {
  sendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerSupportActions.sendingCustomerSupportMessage),
      mergeMap(({ data }) =>
        this.customerSupportService
          .sendMessage(data)
          .pipe(
            map((isValid) =>
              fromCustomerSupportActions.sendMessageStatus({
                isSentSuccess: isValid,
              })
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private customerSupportService: CustomerSupportService
  ) {}
}
