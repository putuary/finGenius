import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpClient } from '@angular/common/http';
import {
  ICommonTransaction,
  ICreateTransaction,
  IReqParamSumTransaction,
  IReqParamTransaction,
  ISumTransaction,
  ITransaction,
} from '../types/transaction.interface';
import { ICreateCategory, TransactionType } from '../types/Finance.interface';
import { of } from 'rxjs';

fdescribe('TransactionService', () => {
  let service: TransactionService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  const expectedResult: ITransaction = {
    id: '1',
    name: 'Transaction 1',
    description: 'Description 1',
    category: {
      id: '1',
      name: 'Category 1',
      color: '#000000',
      icon: 'fa-solid fa-bars',
      type: {
        id: '1',
        name: TransactionType.INCOME,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    amount: 50000,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const expectedCommonResult: ICommonTransaction = {
    totalAmount: 1000000,
    transactions: [
      {
        id: '1',
        name: 'Transaction 1',
        description: 'Description 1',
        category: {
          id: '1',
          name: 'Category 1',
          color: '#000000',
          icon: 'fa-solid fa-bars',
          type: {
            id: '1',
            name: TransactionType.INCOME,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
          },
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        amount: 50000,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  };

  const expectedSumTransaction: ISumTransaction[] = [
    {
      userId: '1',
      nameCategory: 'Category 1',
      colorCategory: '#000000',
      amountTransactionCategorySum: 500000,
      percentageTransactionCategorySum: 50.5,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', [
            'get',
            'post',
            'put',
            'delete',
          ]),
        },
      ],
    });
    service = TestBed.inject(TransactionService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should create transaction', (done) => {
    const payload: ICreateTransaction = {
      name: 'transaction 1',
      description: 'description 1',
      amount: 200000,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    httpClient.post.and.returnValue(of({ data: expectedResult }));
    service.createTransaction(payload, '1').subscribe({
      next: (data) => {
        expect(data.data).toEqual(expectedResult);
        done();
      },
      error: done.fail,
    });
  });

  it('should get all transactions', (done) => {
    const payload: IReqParamTransaction = {
      query: 'query',
      filterBy: 'category',
      filter: 'makan',
      startDate: 'date1',
      endDate: 'date2',
    };

    httpClient.get.and.returnValue(of({ data: expectedCommonResult }));
    service.getAllTransaction(payload).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedCommonResult);
        done();
      },
      error: done.fail,
    });
  });

  it('should all transaction sum', (done) => {
    const payload: IReqParamSumTransaction = {
      Type: TransactionType.INCOME,
      startDate: 'date 1',
      endDate: 'date 2',
    };

    httpClient.get.and.returnValue(of({ data: expectedSumTransaction }));

    service.getTransactionSum(payload).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedSumTransaction);
        done();
      },
      error: done.fail,
    });
  });
});
