import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BalanceService } from './balance.service';
import { HttpClient } from '@angular/common/http';
import { ITransferBalance, IUpdateBalance } from '../types/balance.interface';
import { of } from 'rxjs';

fdescribe('BalanceService', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let service: BalanceService;
  let httpMock: HttpTestingController;

  let expectedBalance: IUpdateBalance = {
    balance: 20000,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BalanceService],
    });
    service = TestBed.inject(BalanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update balance saving', (done) => {
    httpClient.put.and.returnValue(of({ message: 'success' }));

    service.updateBalanceSaving(expectedBalance).subscribe({
      next: (res) => {
        expect(res.message).toBe('success');
        done();
      },
      error: () => done.fail,
    });
  });

  it('should update balance asset', (done) => {
    httpClient.put.and.returnValue(of({ message: 'success' }));

    service.updateBalanceAsset(expectedBalance).subscribe({
      next: (res) => {
        expect(res.message).toBe('success');
        done();
      },
      error: () => done.fail,
    });
  });

  it('should push balance', (done) => {
    const payload: ITransferBalance = {
      from: 'saving',
      to: 'asset',
      amount: 10000,
    };

    httpClient.put.and.returnValue(of({ message: 'success' }));

    service.pushBalance(payload).subscribe({
      next: (res) => {
        expect(res.message).toBe('success');
        done();
      },
      error: () => done.fail,
    });
  });
});
