import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import {
  ICategory,
  ICreateCategory,
  TransactionType,
} from '../types/Finance.interface';
import { of } from 'rxjs';

fdescribe('CategoryService', () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const expectedCategory: ICategory[] = [
    {
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
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
    service = TestBed.inject(CategoryService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created a new category', (done) => {
    const payload: ICreateCategory = {
      name: 'Category 1',
      color: '#000000',
      icon: 'fa-solid fa-bars',
      typeId: '1',
    };

    httpClientSpy.post.and.returnValue(of({ data: expectedCategory[0] }));

    service.createCategory(payload).subscribe({
      next: (data) => {
        expect(data.data).toEqual(expectedCategory[0]);
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
      error: () => {
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should get all categories', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedCategory }));
    service.getAllCategory().subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedCategory);
        expect(httpClientSpy.get).toHaveBeenCalled();
        done();
      },
      error: () => {
        expect(httpClientSpy.get).toHaveBeenCalled();
        done();
      },
    });
  });

  it('Should get category by id', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedCategory[0] }));

    service.getCategoryById('1').subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedCategory[0]);
        expect(httpClientSpy.get).toHaveBeenCalled();
        done();
      },
      error: () => {
        expect(httpClientSpy.get).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should update category', (done) => {
    const payload: ICreateCategory = {
      name: 'Category 1',
      color: '#000000',
      icon: 'fa-solid fa-bars',
      typeId: '1',
    };
    httpClientSpy.put.and.returnValue(of({ data: expectedCategory[0] }));
    service.updateCategory('1', payload).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedCategory[0]);
        expect(httpClientSpy.put).toHaveBeenCalled();
        done();
      },
      error: () => {
        expect(httpClientSpy.put).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should delete category', (done) => {
    httpClientSpy.delete.and.returnValue(of({ message: 'Category deleted' }));
    service.deleteCategory('1').subscribe({
      next: (response) => {
        expect(response.message).toEqual('Category deleted');
        expect(httpClientSpy.delete).toHaveBeenCalled();
        done();
      },
      error: () => {
        expect(httpClientSpy.delete).toHaveBeenCalled();
        done();
      },
    });
  });
});
