import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserUpdate, Role } from '../types/User.interface';
import { of } from 'rxjs';

fdescribe('UserService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UserService;

  const expectedUsers: IUser[] = [
    {
      id: '1',
      fullname: 'John',
      email: 'j@j.com',
      avatar: 'avatar.png',
      balance: 0,
      balanceAsset: 0,
      balanceSaving: 0,
      streak: 0,
      role: Role.USER,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      fullname: 'Jane',
      email: 'j@j.com',
      avatar: 'avatar.png',
      balance: 0,
      balanceAsset: 0,
      balanceSaving: 0,
      streak: 0,
      role: Role.USER,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj(['HttpClient', 'get', 'post', 'put']);
    service = new UserService(httpClientSpy);
  });

  it('should get all user', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedUsers }));

    service.getAllUser().subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedUsers);
        done();
      },
      error: (error) => {
        fail('Expected successful response, but got an error: ' + error);
        done();
      },
    });
  });

  it('should get profile', (done) => {
    httpClientSpy.get.and.returnValue(of({ data: expectedUsers[0] }));

    service.getProfile().subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedUsers[0]);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });

  it('should update profile', (done) => {
    const payload: IUserUpdate = {
      email: 'j@j.com',
      fullname: 'John',
      password: 'AseDef30-',
    };

    httpClientSpy.put.and.returnValue(of({ data: expectedUsers[0] }));

    service.updateProfile(payload).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedUsers[0]);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });

  it('should update avatar', (done) => {
    const formData = new FormData();
    formData.append('avatar', new Blob());
    httpClientSpy.put.and.returnValue(of({ data: expectedUsers[0] }));

    service.updateAvatar(formData).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedUsers[0]);
        done();
      },
      error: (error) => {
        fail('Error: ' + error);
        done();
      },
    });
  });
});
