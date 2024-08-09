import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, IResponseMessage } from '../types/Response.interface';
import { ITypes } from '../types/Finance.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private readonly http: HttpClient) {}

  createType(name: string): Observable<IResponse<ITypes>> {
    return this.http.post<IResponse<ITypes>>(`${environment.BASE_URL}/type`, {
      name,
    });
  }

  getAllType(): Observable<IResponse<ITypes[]>> {
    return this.http.get<IResponse<ITypes[]>>(`${environment.BASE_URL}/type`);
  }

  getTypeById(id: string): Observable<IResponse<ITypes>> {
    return this.http.get<IResponse<ITypes>>(
      `${environment.BASE_URL}/type/${id}`
    );
  }

  deleteType(id: string): Observable<IResponseMessage> {
    return this.http.delete<IResponseMessage>(
      `${environment.BASE_URL}/type/${id}`
    );
  }
}
