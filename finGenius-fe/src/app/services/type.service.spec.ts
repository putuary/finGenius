import { of } from 'rxjs';
import { ITypes, TransactionType } from '../types/Finance.interface';
import { TypeService } from './type.service';
import { HttpClient } from '@angular/common/http';

fdescribe('TypeService', () => {
  let service: TypeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let expectedTypes: ITypes[] = [
    {
      id: '1',
      name: TransactionType.INCOME,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      name: TransactionType.EXPENSE,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj([
      'HttpClient',
      'get',
      'post',
      'put',
      'delete',
    ]);
    service = new TypeService(httpClientSpy);
  });

  it('should be create a new type', (done) => {
    const nameType: string = TransactionType.INCOME;

    httpClientSpy.post.and.returnValue(of({ data: expectedTypes[0] }));

    service.createType(nameType).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedTypes[0]);
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
      error: (error) => {
        fail('Expected successful response, but got an error: ' + error);
        done();
      },
    });
  });

  it('should get all type', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedTypes }));

    service.getAllType().subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedTypes);
        expect(httpClientSpy.get).toHaveBeenCalled();
        done();
      },
      error: (error) => {
        fail('Expected successful response, but got an error: ' + error);
        done();
      },
    });
  });

  it('Should get type by id', (done) => {
    const id: string = '2';

    httpClientSpy.get.and.returnValue(of({ data: expectedTypes[1] }));

    service.getTypeById(id).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedTypes[1]);
        expect(httpClientSpy.get).toHaveBeenCalled();
        done();
      },
      error: (error) => {
        fail('Expected successful response, but got an error: ' + error);
        done();
      },
    });
  });

  it('should delete type', (done) => {
    const id: string = '2';

    httpClientSpy.delete.and.returnValue(of({ message: 'ok' }));

    service.deleteType(id).subscribe({
      next: (response) => {
        expect(response.message).toEqual('ok');
        expect(httpClientSpy.delete).toHaveBeenCalled();
        done();
      },
      error: (error) => {
        fail('Expected successful response, but got an error: ' + error);
        done();
      },
    });
  });
});
