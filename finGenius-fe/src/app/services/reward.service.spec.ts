import { TestBed } from '@angular/core/testing';

import { RewardService } from './reward.service';
import { HttpClient } from '@angular/common/http';
import { IReward, IRewardCreate } from '../types/reward.interface';
import { of } from 'rxjs';
import { IResponseMessage } from '../types/Response.interface';

fdescribe('RewardService', () => {
  let service: RewardService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let expectedRewards: IReward[] = [
    {
      id: '1',
      name: 'Reward 1',
      description: 'Description 1',
      linkFile: 'Link 1',
      streak: 1,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Reward 2',
      description: 'Description 2',
      linkFile: 'Link 2',
      streak: 2,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RewardService,
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
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(RewardService);
  });

  it('should created reward', (done) => {
    const mockReward: IRewardCreate = {
      name: 'Reward 1',
      description: 'Description 1',
      linkFile: 'Link 1',
      streak: 1,
    };

    httpClientSpy.post.and.returnValue(of({ data: expectedRewards[0] }));

    service.createReward(mockReward).subscribe({
      next: (response) => {
        expect(expectedRewards[0]).toEqual(response.data);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });

  it('shoud get all reward', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedRewards }));

    service.getAllReward().subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedRewards);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });

  it('should get reward with param 1', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedRewards[0] }));

    service.getRewardById('1').subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedRewards[0]);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });

  it('should updated reward', (done) => {
    const id: string = '1';
    const mockReward: IRewardCreate = {
      name: 'Reward 1',
      description: 'Description 1',
      linkFile: 'Link 1',
      streak: 1,
    };

    httpClientSpy.put.and.returnValue(of({ data: expectedRewards[0] }));

    service.updateReward(id, mockReward).subscribe({
      next: (response) => {
        expect(expectedRewards[0]).toEqual(response.data);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });

  it('should be deleted reward with params 1', (done) => {
    const id: string = '1';
    const expectedResponse: IResponseMessage = {
      code: 200,
      message: 'SuccessFully Deleted Reward',
      time: '2024-05-16T14:41:01.521+07:00',
    };

    httpClientSpy.delete.and.returnValue(of(expectedResponse));

    service.deleteReward(id).subscribe({
      next: (response) => {
        expect(expectedResponse).toEqual(response);
        expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });
});
