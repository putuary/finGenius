import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { IUser, IUserUpdate } from '../../../types/User.interface';
import { BalanceService } from '../../../services/balance.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

enum balance {
  asset = 'asset',
  saving = 'saving',
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CurrencyPipe,
    InputNumberModule,
    ToastModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  selectedCategory: string = '';
  newAmount: string = '';
  balanceAmount: string = '';

  visibleUpdateSavings: boolean = false;
  visibleUpdateAssets: boolean = false;
  visibleUpdateBalance: boolean = false;
  visbleUpdateProfile: boolean = false;
  visibleModalAvatar: boolean = false;

  user!: IUser;

  file: any;

  defaultImage: string =
    'https://pm1.aminoapps.com/6859/4791b169bde6378ebd4cb54fe1a849e1d16afc37v2_00.jpg';

  formUpdateProfile: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
  });

  loading: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly balanceService: BalanceService,
    private readonly messageService: MessageService,
    private readonly tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res.data;
        this.formUpdateProfile.setValue({
          email: res.data.email,
          password: '',
          fullname: res.data.fullname,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }

  openDialogAssets(): void {
    this.visibleUpdateAssets = true;
  }

  openDialogSavings(): void {
    this.visibleUpdateSavings = true;
  }

  openDialogBalance(): void {
    this.visibleUpdateBalance = true;
  }

  openDialogProfile(): void {
    this.visbleUpdateProfile = true;
  }

  openDialogAvatar(): void {
    this.visibleModalAvatar = true;
  }

  onUpload(event: any) {
    this.file = event.target.files[0];
  }

  updateAvatar() {
    this.loading = true;

    const formData = new FormData();
    formData.append('avatar', this.file);

    this.userService.updateAvatar(formData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getProfile();
        this.visibleModalAvatar = false;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error({ error });
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error,
        });
        this.visibleModalAvatar = false;
        this.loading = false;
      },
    });

    this.loading = false;
  }

  pushBalance(from: string, to: string) {
    const amount = parseInt(this.balanceAmount, 10);
    this.balanceAmount = '';
    if (!isNaN(amount) && amount > 0) {
      this.balanceService.pushBalance({ from, to, amount }).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Successful',
            detail: response.message,
          });
          this.refreshUserData();
          this.closeAllModals();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Transaction Failed',
            detail: 'Failed to update balance',
          });
          this.closeAllModals();
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid amount or insufficient funds',
      });
      this.closeAllModals();
    }
  }

  closeAllModals() {
    this.visibleUpdateSavings = false;
    this.visibleUpdateAssets = false;
    this.visibleUpdateBalance = false;
  }

  updateUserProfile() {
    const payload: IUserUpdate = {
      email: this.user.email,
      fullname: this.user.fullname,
      balance: this.user.balance,
      balanceSaving: this.user.balanceSaving,
      balanceAsset: this.user.balanceAsset,
    };
    this.userService.updateProfile(payload).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Profile Updated',
          detail: 'User profile and balances updated successfully',
        });
        this.getProfile();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to Update Profile',
          detail: 'Error updating user profile and balances',
        });
      },
    });
  }

  updateProfile() {
    this.loading = true;

    if (this.formUpdateProfile.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada yang kosong',
      });
      return;
    }

    this.userService.updateProfile(this.formUpdateProfile.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getProfile();
        this.visbleUpdateProfile = false;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
        this.visbleUpdateProfile = false;
        this.loading = false;
      },
    });
  }

  logout() {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.destroyToken();
      }
    });
  }

  private refreshUserData(): void {
    this.getProfile();
  }
}
