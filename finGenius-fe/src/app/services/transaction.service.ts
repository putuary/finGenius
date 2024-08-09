import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICommonTransaction,
  ICreateTransaction,
  IReqParamSumTransaction,
  IReqParamTransaction,
  ISumTransaction,
  ITransaction,
} from '../types/transaction.interface';
import { Observable } from 'rxjs';
import { IResponse, IResponseMessage } from '../types/Response.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private readonly http: HttpClient) {}

  createTransaction(
    payload: ICreateTransaction,
    categoryId: string
  ): Observable<IResponse<ITransaction>> {
    const { name, description, amount, createdAt } = payload;
    return this.http.post<IResponse<ITransaction>>(
      `${environment.BASE_URL}/transaction`,
      {
        name,
        description,
        categoryId,
        amount,
        createdAt,
      }
    );
  }

  getAllTransaction(
    param: IReqParamTransaction
  ): Observable<IResponse<ICommonTransaction>> {
    return this.http.get<IResponse<ICommonTransaction>>(
      `${environment.BASE_URL}/transaction/filter`,
      {
        params: {
          ...param,
        },
      }
    );
  }

  getTransactionSum(
    param: IReqParamSumTransaction
  ): Observable<IResponse<ISumTransaction[]>> {
    return this.http.get<IResponse<ISumTransaction[]>>(
      `${environment.BASE_URL}/transaction/category-sum`,
      {
        params: {
          ...param,
        },
      }
    );
  }

  deleteTransaction(id: string): Observable<IResponseMessage> {
    return this.http.delete<IResponseMessage>(
      `${environment.BASE_URL}/transaction/${id}`
    );
  }

  getQuotes(): Observable<any> {
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/quotes?category=money',
      {
        headers: {
          'X-Api-Key': 'XtjTBswQURoxN5eU5HdneQ==oCL6aNvuKFx5kilk',
        },
      }
    );
  }
}
