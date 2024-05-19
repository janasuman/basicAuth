import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { logOutResponse, loginReq, loginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginResSubject = new Subject<loginResponse>();
  logoutResSubject = new Subject<logOutResponse>();
  errorSubject = new Subject<string>();
  tokenKey = 'auth';

  constructor(private http: HttpClient,private router: Router) {}

  getLoginResponse(): Observable<loginResponse> {
    return this.loginResSubject.asObservable();
  }
  getErrorRespose(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  getLogOutResponse(): Observable<logOutResponse> {
    return this.logoutResSubject.asObservable();
  }

  login(req: loginReq): void {
    this.http
      .post<loginResponse>(`${environment.apiUrl}/login`, req)
      .subscribe({
        next: (resp: loginResponse) => {
          this.loginResSubject.next(resp);
          this.setToken(resp.Token);
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = this.getErrorMessage(error);
          this.errorSubject.next(errorMessage);
        },
      });
  }

  logoutapi(): void {
    this.http
      .post<logOutResponse>(`${environment.apiUrl}/logout`, {})
      .subscribe({
        next: (resp: logOutResponse) => {
          console.warn(resp);
          this.logoutResSubject.next(resp);
          this.logout();
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = this.getErrorMessage(error);
          this.errorSubject.next(errorMessage);
        },
      });
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey) ;
  }

  logout(): void {
    this.clearToken();
    // Redirect to login page
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    // Implement your logic to check if the user is authenticated
    // For example, check if a token exists in local storage
    const token = this.getToken();
    return !!token;
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (
      error.error &&
      Array.isArray(error.error) &&
      error.error.length > 0 &&
      error.error[0].message
    ) {
      return error.error[0].message;
    } else if (error.error && typeof error.error === 'string') {
      return error.error;
    } else if (error.message) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
}
