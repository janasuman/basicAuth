import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { loginReq, loginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginResSubject = new Subject<loginResponse>();
  errorSubject = new Subject<string>();
  tokenKey = 'auth';

  constructor(private http: HttpClient) {}

  getLoginResponse(): Observable<loginResponse> {
    return this.loginResSubject.asObservable();
  }
  getErrorRespose(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  login(req: loginReq): void {
    this.http
      .post<loginResponse>(`${environment.apiUrl}/api/v1/login`, req)
      .subscribe({
        next: (resp: loginResponse) => {
          this.loginResSubject.next(resp);
          this.setToken(resp.Token);
        },
        error: (error: HttpErrorResponse) => {
          this.errorSubject.next(error.error[0].message);
        },
      });
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  logout(): void {
    this.clearToken();
    // Redirect to login page
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
