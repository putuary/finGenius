import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../components/badge-dashboard/badge-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ICategory } from '../../../types/Finance.interface';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-kategori',
  standalone: true,
  imports: [
    BadgeDashboardComponent,
    ButtonModule,
    ToastModule,
    TableModule,
    RouterLink,
    DatePipe,
    ColorPickerModule,
  ],
  templateUrl: './kategori.component.html',
  styleUrl: './kategori.component.scss',
  providers: [MessageService],
})
export class KategoriComponent {
  category: ICategory[] = [];

  constructor(
    private readonly messageService: MessageService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.category = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getAllCategory();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  deleteCategoryAlert(id: string) {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin Menghapus Kategori?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory(id);
      }
    });
  }
}
