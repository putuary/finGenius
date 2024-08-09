import { Component } from '@angular/core';
import { BadgeDashboardComponent } from '../../../../components/badge-dashboard/badge-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ITypes } from '../../../../types/Finance.interface';
import { TypeService } from '../../../../services/type.service';
import { CategoryService } from '../../../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-update',
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
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [MessageService],
})
export class UpdateComponent {
  FormCategory: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
  });
  type: ITypes[] = [];
  id: string = '';

  constructor(
    private router: Router,
    private readonly typeService: TypeService,
    private readonly categoryService: CategoryService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllType();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCategoryById(this.id);
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

  getCategoryById(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.FormCategory = new FormGroup({
          name: new FormControl(response.data.name, [Validators.required]),
          icon: new FormControl(response.data.icon, [Validators.required]),
          color: new FormControl(response.data.color, [Validators.required]),
          typeId: new FormControl(response.data.type.id, [Validators.required]),
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  updateCategoryById(): void {
    if (this.FormCategory.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada yang kosong',
      });
      return;
    }

    this.categoryService
      .updateCategory(this.id, {
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
          console.log(err.error);
        },
      });
  }

  onSubmit() {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda ingin Edit Kategori Ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCategoryById();
      }
    });
  }
}
