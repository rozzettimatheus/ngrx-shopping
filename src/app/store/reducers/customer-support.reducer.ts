import { Action, createReducer, on } from '@ngrx/store';
import * as fromCustomerSupportActions from '../actions/customer-support.actions';

export const customerSupportFeatureKey = 'customerSupport';

export interface State {
  name: string;
  isSentSuccess: boolean | null;
}

export const initialState: State = {
  name: null,
  isSentSuccess: null,
};

export const reducer = createReducer(
  initialState,
  on(
    fromCustomerSupportActions.sendingCustomerSupportMessage,
    (state, action) => ({
      ...state,
      name: action.data.name,
    })
  ),
  on(fromCustomerSupportActions.sendMessageStatus, (state, action) => ({
    ...state,
    isSentSuccess: action.isSentSuccess,
  })),
  on(fromCustomerSupportActions.clearForm, (state, action) => ({
    ...state,
    name: null,
    isSentSuccess: null,
  }))
);
