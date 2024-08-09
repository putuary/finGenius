import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../../types/User.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    ToastModule,
    ProgressSpinnerModule,
    ProgressBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  hidePassword = true;
  isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    this.isLoading = true;

    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (response) => {
          this.tokenService.setToken(
            response.data.accessToken,
            response.data.refreshToken
          );
          this.getUserForRole();

          this.isLoading = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });

          this.isLoading = false;
        },
      });
  }

  getUserForRole(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.tokenService.setRole(response.data.role);

        if (response.data.role === Role.ADMIN) {
          this.router.navigateByUrl('/dashboard');
        } else if (response.data.role === Role.USER) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }
}
