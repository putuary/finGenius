import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../types/Response.interface';
import { IUser, IUserUpdate } from '../types/User.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getAllUser(): Observable<IResponse<IUser[]>> {
    return this.http.get<IResponse<IUser[]>>(`${environment.BASE_URL}/user`);
  }

  getProfile(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(
      `${environment.BASE_URL}/user/profile`
    );
  }

  updateProfile(payload: IUserUpdate): Observable<IResponse<IUser>> {
    return this.http.put<IResponse<IUser>>(
      `${environment.BASE_URL}/user/profile/update`,
      payload
    );
  }

  updateAvatar(formData: FormData): Observable<IResponse<IUser>> {
    return this.http.put<IResponse<IUser>>(
      `${environment.BASE_URL}/user/update/avatar`,
      formData
    );
  }
}
