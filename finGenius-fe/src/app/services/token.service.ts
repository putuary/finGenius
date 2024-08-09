import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, Role } from '../types/User.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly router: Router) {}

  setToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  setRole(role: Role): void {
    localStorage.setItem('role', role);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken') || '';
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') || '';
  }

  getRole(): string | null {
    return localStorage.getItem('role') || '';
  }

  destroyToken(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
