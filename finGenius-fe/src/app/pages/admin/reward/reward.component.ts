import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../components/badge-dashboard/badge-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { IReward } from '../../../types/reward.interface';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { RewardService } from '../../../services/reward.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [
    BadgeDashboardComponent,
    ButtonModule,
    TableModule,
    RouterLink,
    ToastModule,
  ],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss',
  providers: [MessageService],
})
export class RewardComponent {
  reward: IReward[] = [];

  constructor(
    private messageService: MessageService,
    private readonly rewardService: RewardService
  ) {}

  ngOnInit() {
    this.getAllReward();
  }

  getAllReward(): void {
    this.rewardService.getAllReward().subscribe({
      next: (response) => {
        this.reward = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  deleteRewardById(id: string): void {
    this.rewardService.deleteReward(id).subscribe({
      next: (response) => {
        console.log(response);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getAllReward();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  deleteReward(id: string) {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin Menghapus Reward Ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRewardById(id);
      }
    });
  }
}
