import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    PasswordModule,
    ProgressSpinnerModule,
    ToastModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [MessageService],
})
export class ResetPasswordComponent {
  FormResetPassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  isLoading: boolean = false;
  token: string = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
  }

  onSubmit(): void {
    this.isLoading = true;

    if (
      this.FormResetPassword.value.password !==
      this.FormResetPassword.value.confirmPassword
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Password dan Confirm Password Tidak Valid',
      });

      this.isLoading = false;

      return;
    }

    if (this.FormResetPassword.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form Tidak Boleh Kosong',
      });

      this.isLoading = false;

      return;
    }

    this.authService
      .resetPassword(this.token, this.FormResetPassword.value.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
