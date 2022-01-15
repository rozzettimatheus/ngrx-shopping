import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { AlertService } from 'ngx-alerts';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { loadAdminProducts } from '../state/product.actions';
import { Observable } from 'rxjs';

import * as fromProductSelectors from '../state/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: MockProductApiService,
    private alertService: AlertService,
    private paginationService: PaginationService,
    private store: Store<AppState>
  ) {}

  currentUrl: string;
  vm$: Observable<fromProductSelectors.ProductsViewModel>;

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromProductSelectors.selectProductsViewModel)
    );

    const url = this.paginationService.createUrl(
      '0',
      '999',
      '1',
      '25',
      environment.baseUrl + 'products?'
    );

    this.loadProducts(url);
  }

  loadProducts(url: string) {
    this.store.dispatch(loadAdminProducts({ url }));
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        this.loadProducts(this.currentUrl);
        this.alertService.success('Product Deleted');
      },
      error: (err) => {
        console.error(err);
        this.alertService.danger('Unable To Delete Product');
      },
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
