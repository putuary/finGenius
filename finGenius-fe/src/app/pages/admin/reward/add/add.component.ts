import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../../components/badge-dashboard/badge-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { RewardService } from '../../../../services/reward.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    BadgeDashboardComponent,
    ButtonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [MessageService],
})
export class AddComponent {
  FormReward: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    linkFile: new FormControl('', [Validators.required]),
    streak: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly rewardService: RewardService,
    private readonly messageService: MessageService
  ) {}

  createReward(): void {
    if (this.FormReward.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada yang kosong',
      });
      return;
    }

    this.rewardService.createReward(this.FormReward.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/reward');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda ingin tambah data reward?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createReward();
      }
    });
  }
}
