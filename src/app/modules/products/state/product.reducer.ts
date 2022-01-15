import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromProductActions from './product.actions';
import { Product } from '../../cart/resources/cart';
import { Pagination } from 'src/app/shared/models/pagination';

export const productsFeatureKey = 'products';

export interface State extends EntityState<Product> {
  // additional entities state properties
  pagination: Pagination;
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  sortComparer: sortByName,
  // selectId: selectProductId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  pagination: null,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(fromProductActions.loadProductsSuccess, (state, action) =>
    adapter.setAll(action.paginatedResult.result, {
      ...state,
      pagination: action.paginatedResult.pagination,
    })
  ),
  on(fromProductActions.loadProductsFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export function sortByName(a: Product, b: Product): number {
  return a.name.localeCompare(b.name);
}

// if PK is not 'id'
// export function selectProductId(a: Product): string {
//   return a.primaryId
// }
