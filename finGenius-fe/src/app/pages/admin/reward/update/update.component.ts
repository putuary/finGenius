import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../../components/badge-dashboard/badge-dashboard.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';
import { RewardService } from '../../../../services/reward.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    BadgeDashboardComponent,
    ButtonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [MessageService],
})
export class UpdateComponent {
  FormReward: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    linkFile: new FormControl('', [Validators.required]),
    streak: new FormControl('', [Validators.required]),
  });

  id: string = '';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly rewardService: RewardService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getRewardById(this.id);
  }

  getRewardById(id: string): void {
    this.rewardService.getRewardById(id).subscribe({
      next: (response) => {
        this.FormReward = new FormGroup({
          name: new FormControl(response.data.name, [Validators.required]),
          description: new FormControl(response.data.description, [
            Validators.required,
          ]),
          linkFile: new FormControl(response.data.linkFile, [
            Validators.required,
          ]),
          streak: new FormControl(response.data.streak, [Validators.required]),
        });
      },
    });
  }

  updateRewardById(): void {
    if (this.FormReward.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada yang kosong',
      });
      return;
    }

    this.rewardService.updateReward(this.id, this.FormReward.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/reward');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  onSubmit() {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda ingin update data reward?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateRewardById();
      }
    });
  }
}
