import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { storageKey } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  user = localStorage.getItem(storageKey);
  canActivate(): boolean {
    if (!this.user) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
