import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUpdateBalance } from '../types/balance.interface';
import { Observable } from 'rxjs';
import { IResponseMessage } from '../types/Response.interface';
import { environment } from '../../environments/environment.development';
import { ITransferBalance } from '../types/balance.interface';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private readonly http: HttpClient) {}

  updateBalanceSaving(payload: IUpdateBalance): Observable<IResponseMessage> {
    return this.http.put<IResponseMessage>(
      `${environment.BASE_URL}/balance/saving`,
      payload
    );
  }

  updateBalanceAsset(payload: IUpdateBalance): Observable<IResponseMessage> {
    return this.http.put<IResponseMessage>(
      `${environment.BASE_URL}/balance/asset`,
      payload
    );
  }

  pushBalance(payload: ITransferBalance): Observable<IResponseMessage> {
    return this.http.put<IResponseMessage>(
      `${environment.BASE_URL}/balance/push`,
      payload
    );
  }
}
