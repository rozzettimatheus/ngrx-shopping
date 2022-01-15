import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouterStore from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import * as fromCustomerSupport from './reducers/customer-support.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromProduct from '../modules/products/state/product.reducer';

export interface AppState {
  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
  router: fromRouterStore.RouterReducerState;
  [fromProduct.productsFeatureKey]: fromProduct.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  router: fromRouterStore.routerReducer,
  [fromProduct.productsFeatureKey]: fromProduct.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [
      //  debug
    ]
  : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
