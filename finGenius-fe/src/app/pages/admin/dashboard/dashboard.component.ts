import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../components/badge-dashboard/badge-dashboard.component';
import { TableModule } from 'primeng/table';
import { IUser, Role } from '../../../types/User.interface';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BadgeDashboardComponent, TableModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  data: IUser[] = [];

  defaultImage: string = './assets/images/user.png';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUser();
  }

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }

  getAllUser(): void {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.data = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
