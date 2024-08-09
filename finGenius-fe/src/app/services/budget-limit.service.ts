import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../types/Response.interface';
import { IBudgetLimit, ICategory, IGetBudget } from '../types/Finance.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BudgetLimitService {
  constructor(private readonly http: HttpClient) {}

  getAllBudget(): Observable<IResponse<IGetBudget[]>>{
    return this.http.get<IResponse<IGetBudget[]>>(
      `${environment.BASE_URL}/budget`
    );
  }

  updateBudget(
    id: string,
    payload: { categoryId: string; amount: number }
  ): Observable<IResponse<IBudgetLimit>> {
    return this.http.put<IResponse<IBudgetLimit>>(
      `${environment.BASE_URL}/budget/${id}`,
      payload
    );
  }

  createBudget(payload: {
    categoryId: string;
    amount: number;
  }): Observable<IResponse<IBudgetLimit>> {
    return this.http.post<IResponse<IBudgetLimit>>(
      `${environment.BASE_URL}/budget`,
      payload
    );
  }

  changeActiveStatus(id: string): Observable<IResponse<IBudgetLimit>> {
    return this.http.put<IResponse<IBudgetLimit>>(
      `${environment.BASE_URL}/budget/active/${id}`,
      {}
    );
  }
}
