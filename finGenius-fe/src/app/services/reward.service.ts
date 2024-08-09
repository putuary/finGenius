import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, IResponseMessage } from '../types/Response.interface';
import { IReward, IRewardCreate } from '../types/reward.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  constructor(private http: HttpClient) {}

  createReward(payload: IRewardCreate): Observable<IResponse<IReward>> {
    return this.http.post<IResponse<IReward>>(
      `${environment.BASE_URL}/reward`,
      payload
    );
  }

  getAllReward(): Observable<IResponse<IReward[]>> {
    return this.http.get<IResponse<IReward[]>>(
      `${environment.BASE_URL}/reward`
    );
  }

  getRewardById(id: string): Observable<IResponse<IReward>> {
    return this.http.get<IResponse<IReward>>(
      `${environment.BASE_URL}/reward/${id}`
    );
  }

  updateReward(
    id: string,
    payload: IRewardCreate
  ): Observable<IResponse<IReward>> {
    return this.http.put<IResponse<IReward>>(
      `${environment.BASE_URL}/reward/${id}`,
      payload
    );
  }

  deleteReward(id: string): Observable<IResponseMessage> {
    return this.http.delete<IResponseMessage>(
      `${environment.BASE_URL}/reward/${id}`
    );
  }
}
