import { Component } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { DateService } from '../../../services/date.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ITransaction } from '../../../types/transaction.interface';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TransactionType } from '../../../types/Finance.interface';
import { RippleModule } from 'primeng/ripple';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ToastModule,
    PaginatorModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    RouterLink,
    DialogModule,
    RippleModule,
    DatePipe,
  ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
  providers: [MessageService],
})
export class LogsComponent {
  query: string = '';
  startDate: string = '';
  endDate: string = '';

  totalAmount: number = 0;
  transactions: ITransaction[] = [];
  selectedTransaction!: ITransaction;

  visible: boolean = false;

  disableFilter: boolean = false;
  selectedFilter: boolean = false;

  visibleModalDetail: boolean = false;

  selectedFilterBy: { name: string; value: string } = {
    name: '',
    value: '',
  };

  selectedTypeFilter: { name: string; value: string } = {
    name: '',
    value: '',
  };

  filterBy: { name: string; value: string }[] = [
    {
      name: 'All',
      value: '',
    },
    {
      name: 'Category',
      value: 'category',
    },
    {
      name: 'Type',
      value: 'type',
    },
  ];

  typeFilter: { name: string; value: string }[] = [
    {
      name: TransactionType.INCOME,
      value: TransactionType.INCOME,
    },
    {
      name: TransactionType.EXPENSE,
      value: TransactionType.EXPENSE,
    },
  ];

  categoryFilter: { name: string; value: string }[] = [];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly dateService: DateService,
    private readonly location: Location,
    private readonly categoryService: CategoryService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    const { startOfMonth, endOfMonth } =
      this.dateService.getStartAndEndOfMonth();

    this.startDate = startOfMonth;
    this.endDate = endOfMonth;

    this.getAllTransaction();

    this.getAllCategory();
  }

  onFilterByChange() {
    if (this.selectedFilterBy.value === '') {
      this.disableFilter = false;
      this.selectedFilter = false;
      return;
    }

    this.disableFilter = true;
    this.selectedFilter = true;
  }

  onFilterChange() {
    if (this.selectedTypeFilter.value === '') {
      this.disableFilter = true;
      return;
    }

    this.disableFilter = false;
  }

  goBack() {
    this.location.back();
  }

  getAllTransaction(): void {
    this.transactionService
      .getAllTransaction({
        query: this.query,
        filterBy: this.selectedFilterBy.value,
        filter: this.selectedTypeFilter.value,
        startDate: this.startDate,
        endDate: this.endDate,
      })
      .subscribe({
        next: (response) => {
          this.totalAmount = response.data.totalAmount;
          this.transactions = response.data.transactions.reverse();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        response.data.forEach((data) => {
          this.categoryFilter = [
            ...this.categoryFilter,
            { name: data.name, value: data.name },
          ];
        });
      },
    });
  }

  openModalFilter(): void {
    this.visible = true;
  }

  filterClick(): void {
    this.getAllTransaction();
    this.visible = false;
  }

  openModalDetailTransaction(transaction: ITransaction) {
    this.selectedTransaction = transaction;
    this.visibleModalDetail = true;
  }

  alertDeleteTransaction(id: string) {
    this.visibleModalDetail = false;
    Swal.fire({
      title: 'Warning!',
      text: 'Are you sure you want to delete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTransaction(id);
      }
    });
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getAllTransaction();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      },
    });
  }
}
