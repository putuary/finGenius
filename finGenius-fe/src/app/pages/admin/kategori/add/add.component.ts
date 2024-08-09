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
import { DropdownModule } from 'primeng/dropdown';
import { ITypes } from '../../../../types/Finance.interface';
import Swal from 'sweetalert2';
import { TypeService } from '../../../../services/type.service';
import { CategoryService } from '../../../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    BadgeDashboardComponent,
    ButtonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    ColorPickerModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [MessageService],
})
export class AddComponent {
  FormCategory: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
  });

  type: ITypes[] = [];

  constructor(
    private readonly router: Router,
    private readonly typeService: TypeService,
    private readonly categoryService: CategoryService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.typeService.getAllType().subscribe({
      next: (response) => {
        this.type = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  createCategory(): void {
    if (this.FormCategory.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada yang kosong',
      });
      return;
    }

    this.categoryService
      .createCategory({
        name: this.FormCategory.value.name,
        icon: this.FormCategory.value.icon,
        color: this.FormCategory.value.color,
        typeId: this.FormCategory.value.typeId,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/kategori');
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
      });
  }

  onSubmit() {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda ingin menambahkan Kategori Baru?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createCategory();
      }
    });
  }
}
