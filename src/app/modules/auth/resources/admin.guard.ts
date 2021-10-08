import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../../../store';
import { selectIsAdmin } from '../../../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAdmin),
      map((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/home']);

          return false;
        }

        return true;
      })
    );
  }
}
