import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../components/badge-dashboard/badge-dashboard.component';
import { ITypes } from '../../../types/Finance.interface';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TypeService } from '../../../services/type.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tipe',
  standalone: true,
  imports: [
    BadgeDashboardComponent,
    TableModule,
    ButtonModule,
    ToastModule,
    DatePipe,
  ],
  templateUrl: './tipe.component.html',
  styleUrl: './tipe.component.scss',
  providers: [MessageService],
})
export class TipeComponent {
  type: ITypes[] = [];

  constructor(
    private readonly typeService: TypeService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllType();
  }

  getAllType(): void {
    this.typeService.getAllType().subscribe({
      next: (response) => {
        this.type = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  createType(name: string): void {
    this.typeService.createType(name).subscribe({
      next: (response) => {
        this.taostAlert('success', 'Success', 'Tipe Berhasil ditambahkan');
        this.getAllType();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    this.getAllType();
  }

  deleteType(id: string): void {
    this.typeService.deleteType(id).subscribe({
      next: (response) => {
        this.taostAlert('success', 'Success', response.message);
        this.getAllType();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  addType() {
    Swal.fire({
      title: 'Tambah Tipe',
      input: 'text',
      inputLabel: 'Nama Tipe',
      inputPlaceholder: 'Masukkan Tipe',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createType(result.value);
      }
    });
  }

  deleteTypeAlert(id: string) {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin Menghapus Tipe Catatan keuangan Ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteType(id);
      }
    });
  }

  taostAlert(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
