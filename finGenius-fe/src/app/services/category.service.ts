import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, ICreateCategory } from '../types/Finance.interface';
import { Observable } from 'rxjs';
import { IResponse, IResponseMessage } from '../types/Response.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  createCategory(payload: ICreateCategory): Observable<IResponse<ICategory>> {
    return this.http.post<IResponse<ICategory>>(
      `${environment.BASE_URL}/category`,
      payload
    );
  }

  getAllCategory(): Observable<IResponse<ICategory[]>> {
    return this.http.get<IResponse<ICategory[]>>(
      `${environment.BASE_URL}/category`
    );
  }

  getCategoryById(id: string): Observable<IResponse<ICategory>> {
    return this.http.get<IResponse<ICategory>>(
      `${environment.BASE_URL}/category/${id}`
    );
  }

  updateCategory(
    id: string,
    payload: ICreateCategory
  ): Observable<IResponse<ICategory>> {
    return this.http.put<IResponse<ICategory>>(
      `${environment.BASE_URL}/category/${id}`,
      payload
    );
  }

  deleteCategory(id: string): Observable<IResponseMessage> {
    return this.http.delete<IResponseMessage>(
      `${environment.BASE_URL}/category/${id}`
    );
  }
}
