import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../reducers/customer-support.reducer';
import * as customerSupportReducer from '../reducers/customer-support.reducer';

export interface CustomerSupportViewModel {
  name: string;
  isSentSuccess: boolean;
}

export const selectCustomerSupportFeature = createFeatureSelector<State>(
  customerSupportReducer.customerSupportFeatureKey
);

// reference
export const selectName = createSelector(
  selectCustomerSupportFeature,
  (state: State) => state.name
);

export const selectCustomerSupportModel = createSelector(
  selectCustomerSupportFeature,
  (state: State): CustomerSupportViewModel => ({
    isSentSuccess: state.isSentSuccess,
    name: state.name,
  })
);
