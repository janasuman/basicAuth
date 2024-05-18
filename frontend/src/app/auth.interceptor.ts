import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization',authToken)
  });
  return next(reqWithHeader);
};


