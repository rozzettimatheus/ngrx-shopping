import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store';
import * as fromAuthActions from '../store/actions/auth.actions';
import { storageKey, User } from '../modules/auth/resources/auth';
import { MockApiCartService } from '../modules/cart/resources/mock-api-cart.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(
    private cartService: MockApiCartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem(storageKey));

    if (user) {
      this.updateShoppingCart(user.id);
      this.store.dispatch(fromAuthActions.browserReload({ user }));
    }
  }

  updateShoppingCart(userid) {
    const observer = {
      next: (cart) => {
        this.cartService.updatedCartSelection(cart);
      },
      error: (err) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }
}
