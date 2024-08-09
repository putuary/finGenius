import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import {
  IBudgetLimit,
  ICategory,
  IGetBudget,
  TransactionType,
} from '../../../types/Finance.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IUser } from '../../../types/User.interface';
import { UserService } from '../../../services/user.service';
import { TransactionService } from '../../../services/transaction.service';
import { ISumTransaction } from '../../../types/transaction.interface';
import { DateService } from '../../../services/date.service';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink } from '@angular/router';
import { BudgetLimitService } from '../../../services/budget-limit.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    CurrencyPipe,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    RouterLink,
    CalendarModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  categories: ICategory[] = [];
  tempCategories: ICategory[] = [];
  data: any;
  options: any;
  budget: IGetBudget[] = [];

  categorySelected!: ICategory;
  visible: boolean = false;
  showWarning: boolean = false;

  dateNow: Date = new Date();

  user!: IUser;

  categoryValueIsNotNull: boolean = false;
  visibleModalFilter: boolean = false;

  startDate: string = '';
  endDate: string = '';

  statisticsChart: ISumTransaction[] = [];

  totalExpense: number = 0;
  totalIncome: number = 0;

  income: number = 0;

  currentDate: string = '';

  selectedType: { name: string; value: string } = {
    name: '',
    value: '',
  };

  type: { name: string; value: string }[] = [
    {
      name: 'All',
      value: '',
    },
    {
      name: TransactionType.INCOME,
      value: TransactionType.INCOME,
    },
    {
      name: TransactionType.EXPENSE,
      value: TransactionType.EXPENSE,
    },
  ];

  formTransaction: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    createdAt: new FormControl('', [Validators.required]),
  });

  quotes: { quote: string; author: string; category: string } = {
    quote: '',
    author: '',
    category: '',
  };

  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly dateService: DateService,
    private readonly messageService: MessageService,
    private readonly budgetService: BudgetLimitService
  ) {
    this.getBudgetLimit();
  }

  ngOnInit(): void {
    const { startOfMonth, endOfMonth } =
      this.dateService.getStartAndEndOfMonth();

    this.startDate = startOfMonth;
    this.endDate = endOfMonth;
    this.currentDate = this.dateService.getCurrentDateForInput();

    this.refreshData();

    this.getQuotes();
  }

  getQuotes() {
    this.transactionService.getQuotes().subscribe({
      next: (response) => {
        this.quotes = response[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.user = response.data;
        this.income = this.user.balance;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  getBudgetLimit(): void {
    this.budgetService.getAllBudget().subscribe({
      next: (response) => {
        this.budget = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.tempCategories = response.data;
        this.filterCategories();
        if (this.income === 0) {
          this.categories = response.data.filter(
            (data) => data.type.name === TransactionType.INCOME
          );
        } else {
          this.categories = response.data;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  getTransactionSum(): void {
    this.transactionService
      .getTransactionSum({
        Type: this.selectedType.value,
        startDate: this.startDate,
        endDate: this.endDate,
      })
      .subscribe({
        next: (response) => {
          this.statisticsChart = response.data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  getTotalExpense(): void {
    this.transactionService
      .getTransactionSum({
        Type: TransactionType.EXPENSE,
        startDate: this.startDate,
        endDate: this.endDate,
      })
      .subscribe({
        next: (response) => {
          this.totalExpense = response.data.reduce(
            (accumulator, transactionExpense) => {
              return (
                accumulator + transactionExpense.amountTransactionCategorySum
              );
            },
            0
          );
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  getTotalIncome(): void {
    this.transactionService
      .getTransactionSum({
        Type: TransactionType.INCOME,
        startDate: this.startDate,
        endDate: this.endDate,
      })
      .subscribe({
        next: (response) => {
          this.totalIncome = response.data.reduce(
            (accumulator, transactionIncome) => {
              return (
                accumulator + transactionIncome.amountTransactionCategorySum
              );
            },
            0
          );
          this.filterCategories();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  filterCategories(): void {
    if (this.totalIncome === 0) {
      this.categories = this.tempCategories.filter(
        (category) => category.type.name === 'Income'
      );
    } else {
      this.categories = this.tempCategories;
    }
  }

  calculateCategoryExpenses(): { [key: string]: number } {
    const categoryExpenses: { [key: string]: number } = {};

    this.statisticsChart.forEach((transaction) => {
      const category = this.tempCategories.find(
        (cat) => cat.name === transaction.nameCategory
      );
      if (category) {
        if (!categoryExpenses[category.id]) {
          categoryExpenses[category.id] = 0;
        }
        categoryExpenses[category.id] +=
          transaction.amountTransactionCategorySum;
      }
    });

    return categoryExpenses;
  }

  isExpenseLimitExceeded(categoryName: string): boolean {
    const categoryExpense =
      this.statisticsChart.find((txn) => txn.nameCategory === categoryName)
        ?.amountTransactionCategorySum || 0;
    if (categoryExpense === undefined) {
      return false;
    }

    const budgetLimitObj = this.budget.find(
      (b) => b.categoryName === categoryName
    );
    if (!budgetLimitObj) {
      return false;
    }
    const budgetLimit = budgetLimitObj.amount || 0;

    if (!budgetLimitObj || !budgetLimitObj.active) {
      return false;
    }

    return categoryExpense >= 0.2 * budgetLimit;
  }

  openModal(selectedCategory: ICategory): void {
    this.visible = true;
    this.categorySelected = selectedCategory;
    this.showWarning = this.isExpenseLimitExceeded(selectedCategory.name);
  }

  saveTransaction(): void {
    if (this.formTransaction.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form tidak boleh ada yang kosong',
      });
      return;
    }

    this.transactionService
      .createTransaction(
        {
          name: this.formTransaction.value.name,
          description: this.formTransaction.value.description,
          amount: this.formTransaction.value.amount,
          createdAt: this.dateService.formatCreatedAtTime(
            this.formTransaction.value.createdAt
          ),
        },
        this.categorySelected.id
      )
      .subscribe({
        next: (response) => {
          this.visible = false;
          this.refreshData();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
          });
        },
      });
  }

  openFilterModal() {
    this.visibleModalFilter = true;
  }

  filterData() {
    this.refreshData();
    this.visibleModalFilter = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Filter success',
    });
  }

  refreshData() {
    this.getProfile();
    this.getTransactionSum();
    this.getTotalExpense();
    this.getTotalIncome();
    this.getAllCategory();

    setTimeout(() => {
      this.initChart();
    }, 500);
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.statisticsChart.map((data) => data.nameCategory),
      datasets: [
        {
          data: this.statisticsChart.map((data) =>
            data.percentageTransactionCategorySum.toFixed(2)
          ),
          backgroundColor: this.statisticsChart.map(
            (data) => data.colorCategory
          ),
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
}
