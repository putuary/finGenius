import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { customEmailValidator } from '../../../validators/custom-email.validator';
import { customPasswordValidator } from '../../../validators/custom-password.validator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, customEmailValidator]),
    password: new FormControl('', [
      Validators.required,
      customPasswordValidator,
    ]),
  });

  hidePassword = true;
  submitted = false;
  isLoading = false;

  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onRegister() {
    this.isLoading = true;

    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email atau Password tidak valid',
      });

      this.isLoading = false;
      return;
    }

    this.authService
      .register({
        email: this.registerForm.value.email,
        fullname: this.registerForm.value.fullname,
        password: this.registerForm.value.password,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Berhasil Registrasi, silahkan login',
          });

          this.registerForm.reset();

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });

          this.isLoading = false;
        },
      });
  }
}
