import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store';
import * as fromAuthActions from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private store: Store<AppState>) {}

  onSubmit(f: NgForm) {
    const { username, password } = f.value;

    this.store.dispatch(fromAuthActions.loginPage({ username, password }));
  }
}
