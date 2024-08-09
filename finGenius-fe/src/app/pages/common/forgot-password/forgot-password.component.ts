import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [MessageService],
})
export class ForgotPasswordComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
  });

  isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {}

  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada kosong',
      });

      this.isLoading = false;

      return;
    }

    this.authService.forgotPassword(this.loginForm.value.email).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message,
        });
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

    this.isLoading = false;
  }
}
