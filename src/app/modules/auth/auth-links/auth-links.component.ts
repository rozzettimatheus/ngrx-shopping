import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../resources/auth.service';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ModalService } from '../resources/modal.service';
import * as fromAuthSelectors from '../../../store/selectors/auth.selectors';
import * as fromAuthActions from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
  vm$: Observable<fromAuthSelectors.AuthLinksViewModel>;

  constructor(
    public authService: AuthService,
    private cartService: MockApiCartService,
    private modalService: ModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  logout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  updateShoppingCart(userid) {
    const observer = {
      next: (cartlist) => {
        this.cartService.updatedCartSelection(cartlist);
      },
      error: (err) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }

  openModal() {
    this.modalService.show(LoginModalComponent);
  }
}
