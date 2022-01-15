import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/resources/auth';
import * as fromProductModels from '../products/resources/product';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { Pagination } from 'src/app/shared/models/pagination';

import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { loadProducts } from './state/product.actions';
import * as fromProductSelectors from './state/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  vm$: Observable<fromProductSelectors.ProductsViewModel>;

  constructor(
    public router: Router,
    private paginationService: PaginationService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(
      select(fromProductSelectors.selectProductsViewModel)
    );

    const url = this.paginationService.createUrl(
      '0',
      '999',
      '1',
      '9',
      environment.baseUrl + 'products?'
    );

    this.loadProducts(url);
  }

  loadProducts(url: string) {
    this.store.dispatch(loadProducts({ url }));
  }

  onPriceFilterChange(item: fromProductModels.PriceFilter) {
    this.loadProducts(
      this.paginationService.createUrl(
        item.min,
        item.max,
        '1',
        '25',
        environment.baseUrl + 'products?'
      )
    );
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
