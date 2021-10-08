import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromHeaderSelectors from '../../store/selectors/header.selectors';
import { AppState } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  vm$: Observable<fromHeaderSelectors.HeaderViewModel>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromHeaderSelectors.selectHeaderViewModel)
    );
  }
}
