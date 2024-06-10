import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTH_URL } from '../app.constant';
import { BehaviorSubject, Subject } from 'rxjs';

export const AUTHENTICATED_USER: string = 'userEmail';
export const TOKEN: string = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userEmail: string, password: string) {
    return this.http
      .post<any>(`${API_AUTH_URL}/login`, {
        email: userEmail,
        password: password,
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTHENTICATED_USER, userEmail);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          // this.router.navigate(['/products']);
          // window.location.reload();
        })
      );
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('userEmail');
    return !(user === null);
  }
}
