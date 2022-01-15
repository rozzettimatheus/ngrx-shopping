import { createAction, props } from '@ngrx/store';

import { Product } from '../../cart/resources/cart';
import { PaginatedResult } from '../resources/product';

// Load Products

export const loadProducts = createAction(
  '[Products Component] Load Products',
  props<{ url: string }>()
);

export const loadAdminProducts = createAction(
  '[Products List Component] Load Products',
  props<{ url: string }>()
);

export const loadProductsSuccess = createAction(
  '[Product Effect] Load Products Success',
  props<{ paginatedResult: PaginatedResult<Product[]> }>()
);

export const loadProductsFailure = createAction(
  '[Product Effect] Load Products Failure',
  props<{ error: any }>()
);
