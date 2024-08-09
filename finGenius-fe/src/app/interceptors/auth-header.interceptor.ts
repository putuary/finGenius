import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const { getAccessToken } = inject(TokenService);

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return next(newReq);
};
