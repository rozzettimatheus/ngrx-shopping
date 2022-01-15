import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProductsReducer from './product.reducer';
import * as ProductModel from '../resources/product';

export const selectProducsStateSelector = createFeatureSelector(
  fromProductsReducer.productsFeatureKey
);

export const selectAllProducts = createSelector(
  selectProducsStateSelector,
  fromProductsReducer.selectAll
);

export const selectPagination = createSelector(
  selectProducsStateSelector,
  (state: fromProductsReducer.State) => state.pagination
);

export interface ProductsViewModel {
  pagination: ProductModel.Pagination;
  products: ProductModel.Product[];
}

export const selectProductsViewModel = createSelector(
  selectPagination,
  selectAllProducts,
  (pagination, products): ProductsViewModel => ({
    pagination,
    products,
  })
);
