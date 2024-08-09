import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILogin,
  IRegsiter,
  IResLogin,
  IResRefreshToken,
} from '../types/Auth.interface';
import { Observable } from 'rxjs';
import { IResponse, IResponseMessage } from '../types/Response.interface';
import { IUser } from '../types/User.interface';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  register(payload: IRegsiter): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(
      `${environment.BASE_URL}/auth/register/user`,
      payload
    );
  }

  login(payload: ILogin): Observable<IResponse<IResLogin>> {
    return this.http.post<IResponse<IResLogin>>(
      `${environment.BASE_URL}/auth/login`,
      payload
    );
  }

  refreshToken(): Observable<IResponse<IResRefreshToken>> {
    return this.http.put<IResponse<IResRefreshToken>>(
      `${environment.BASE_URL}/auth/refresh-token`,
      {
        refreshToken: this.tokenService.getRefreshToken(),
      }
    );
  }

  forgotPassword(
    email: string | null | undefined
  ): Observable<IResponseMessage> {
    return this.http.post<IResponseMessage>(
      `${environment.BASE_URL}/auth/forgot-password`,
      {
        email,
      }
    );
  }

  resetPassword(token: string, password: string): Observable<IResponseMessage> {
    return this.http.post<IResponseMessage>(
      `${environment.BASE_URL}/auth/reset-password`,
      {
        token,
        password,
      }
    );
  }
}
