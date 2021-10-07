import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../app/store';
import * as fromSelectors from '../../../app/store/selectors/customer-support.selectors';
import * as fromActions from '../../store/actions/customer-support.actions';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  isSendSuccess: boolean | null = null;
  viewModel$: Observable<fromSelectors.CustomerSupportViewModel>;

  ngOnInit(): void {
    this.viewModel$ = this.store.pipe(
      select(fromSelectors.selectCustomerSupportModel)
    );
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(
      fromActions.sendingCustomerSupportMessage({ data: f.value })
    );
  }

  clearFeedback() {
    this.store.dispatch(fromActions.clearForm());
  }
}
