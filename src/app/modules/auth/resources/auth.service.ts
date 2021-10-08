import { Injectable } from '@angular/core';
import * as fromAuthModels from './auth';
import { of, Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .get(this.baseUrl + '?username=' + username)
      .pipe(
        switchMap((users) =>
          users[0] ? of(users[0]) : throwError('Unable to login')
        )
      );
  }
}
