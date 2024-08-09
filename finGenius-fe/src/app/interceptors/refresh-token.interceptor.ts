import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        console.log('Refresh Token Error:', error);

        return authService.refreshToken().pipe(
          switchMap((response) => {
            const token: string = response.data.accessToken;
            tokenService.setAccessToken(token);

            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
            return next(req);
          }),
          catchError((err: HttpErrorResponse) => {
            console.log(err.error);
            return throwError(() => err.error.message);
          })
        );
      }

      return throwError(() => error.error.message);
    })
  );
};
