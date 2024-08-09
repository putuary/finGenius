import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Role } from '../types/User.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const { getAccessToken, getRole } = inject(TokenService);

  const router: Router = inject(Router);
  const isLogin: boolean = getAccessToken() ? true : false;

  if (!isLogin) {
    router.navigateByUrl('/login');
    return false;
  }

  if (getRole() !== (route.data['role'] as Role)) {
    router.navigateByUrl('/forbidden');
    return false;
  }

  return isLogin;
};
