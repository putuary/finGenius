import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { Router, RouterModule } from '@angular/router';
import { Role } from '../types/User.interface';

fdescribe('TokenService', () => {
  let service: TokenService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [TokenService],
    });
    service = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  it('should set and get access token', () => {
    const accessToken = 'testAccessToken';
    service.setAccessToken(accessToken);
    expect(service.getAccessToken()).toEqual(accessToken);
  });

  it('should set and get refresh token', () => {
    const refreshToken = 'testRefreshToken';
    service.setToken('testAccessToken', refreshToken);
    expect(service.getRefreshToken()).toEqual(refreshToken);
  });

  it('should set and get role', () => {
    const role = 'ADMIN';
    service.setRole(Role.ADMIN);
    expect(service.getRole()).toEqual(role);
  });

  it('should destroy token and navigate to login', () => {
    spyOn(router, 'navigateByUrl');
    service.destroyToken();
    expect(localStorage.length).toBe(0);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
