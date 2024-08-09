import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import {
  ILogin,
  IRegsiter,
  IResLogin,
  IResRefreshToken,
} from '../types/Auth.interface';
import { of } from 'rxjs';
import { IUser, Role } from '../types/User.interface';
import { IResponseMessage } from '../types/Response.interface';

fdescribe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
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
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('Should be registered', (done) => {
    const payload: IRegsiter = {
      email: 'j@j.com',
      password: 'AseDef30-',
      fullname: 'John',
    };

    const expectedRegisterRespose: IUser = {
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
    };

    httpClientSpy.post.and.returnValue(of({ data: expectedRegisterRespose }));

    service.register(payload).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedRegisterRespose);
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
      error: () => done.fail(),
    });
  });

  it('Should be login', (done) => {
    const payload: ILogin = {
      email: 'j@j.com',
      password: 'AseDef30-',
    };

    const expectedLoginRespose: IResLogin = {
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
    };

    httpClientSpy.post.and.returnValue(of({ data: expectedLoginRespose }));

    service.login(payload).subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedLoginRespose);
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
      error: () => done.fail(),
    });
  });

  it('shoud be refreshToken', (done) => {
    const expectedResponse: IResRefreshToken = {
      accessToken: 'testAccessToken',
    };

    httpClientSpy.put.and.returnValue(of({ data: expectedResponse }));

    service.refreshToken().subscribe({
      next: (response) => {
        expect(response.data).toEqual(expectedResponse);
        expect(httpClientSpy.put).toHaveBeenCalled();
        done();
      },
      error: () => done.fail(),
    });
  });

  it('forgot password should work', (done) => {
    const email: string = 'j@j.com';
    const expectedResponse: IResponseMessage = {
      code: 200,
      message: 'Success',
      time: '2024-01-01T00:00:00.000Z',
    };

    httpClientSpy.post.and.returnValue(of(expectedResponse));

    service.forgotPassword(email).subscribe({
      next: (response) => {
        expect(response).toEqual(expectedResponse);
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
      error: () => done.fail(),
    });
  });

  it('should be reset password', (done) => {
    const token: string = 'testToken';
    const password: string = 'testPassword';

    const expectedResponse: IResponseMessage = {
      code: 200,
      message: 'Success',
      time: '2024-01-01T00:00:00.000Z',
    };

    httpClientSpy.post.and.returnValue(of(expectedResponse));

    service.resetPassword(token, password).subscribe({
      next: (response) => {
        expect(response).toEqual(expectedResponse);
        expect(httpClientSpy.post).toHaveBeenCalled();
        done();
      },
      error: () => done.fail(),
    });
  });
});
