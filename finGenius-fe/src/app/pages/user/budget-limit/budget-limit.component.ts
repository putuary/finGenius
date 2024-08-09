import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { IBudgetLimit, ICategory } from '../../../types/Finance.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BudgetLimitService } from '../../../services/budget-limit.service';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../../services/token.service';
import { IUser } from '../../../types/User.interface';

@Component({
  selector: 'app-budget-limit',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './budget-limit.component.html',
  styleUrls: ['./budget-limit.component.scss'],
  providers: [MessageService]
})
export class BudgetLimitComponent implements OnInit {
  budgetLimit: IBudgetLimit[] = [];
  budgetStatus: boolean[] = [];
  visible = false;
  errorVisible = false;
  selectedItem: IBudgetLimit | null = null;
  newLimit: number | null = null;
  category: ICategory[] = [];
  budget: any[] = [];
  currentUser: IUser | null = null;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly budgetService: BudgetLimitService,
    private readonly tokenService: TokenService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getCategory();
    this.getBudget();
  }

  getCurrentUser(): void {
    this.currentUser = this.tokenService.getUser();
  }

  changeBudgetStatus(index: number) {
    const budget = this.budgetLimit[index];

    if (budget.amount >= 0 && budget.amount <= 100) {
      this.errorVisible = true;
      return;
    }

    this.budgetService.changeActiveStatus(budget.id).subscribe({
      next: (response) => {
        budget.active = !budget.active;
        this.budgetStatus[index] = budget.active;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Budget ${budget.active ? 'locked' : 'unlocked'} successfully.`,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error changing budget status', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      }
    });
  }

  getCategory(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.category = response.data.filter((cat: ICategory) => cat.type.name === 'Expense');
        console.log(this.category);
        this.updateBudgetLimit();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    });
  }

  getBudget(): void {
    this.budgetService.getAllBudget().subscribe({
      next: (response) => {
        this.budget = response.data;
        this.updateBudgetLimit();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    });
  }

  updateBudgetLimit() {
    this.budgetLimit = this.category.map(category => {
      const budget = this.budget.find(b => b.categoryId === category.id);
      if (budget) {
        return {
          id: budget.id,
          user: { id: budget.userId, ...this.currentUser } as IUser,
          category: category,
          amount: budget.amount,
          createdAt: budget.createdAt,
          updatedAt: budget.updatedAt,
          active: budget.active
        } as IBudgetLimit;
      } else {
        return {
          id: '',
          user: this.currentUser as IUser,
          category: category,
          amount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: false
        } as IBudgetLimit;
      }
    });
    this.budgetStatus = this.budgetLimit.map(budget => budget.active);
  }

  showDialog(item: IBudgetLimit) {
    this.selectedItem = item;
    this.newLimit = item.amount;
    this.visible = true;
  }

  saveNewLimit() {
    console.log('saveNewLimit() executed!');
    if (this.newLimit !== null && this.selectedItem !== null) {
      const updatedItem = { ...this.selectedItem, amount: this.newLimit };
      console.log('Updated Item:', updatedItem);

      const payload = {
        categoryId: updatedItem.category.id,
        amount: updatedItem.amount
      };

      if (updatedItem.amount < 100) {
        updatedItem.active = false;
      }

      if (updatedItem.id === '') {
        this.budgetService.createBudget(payload).subscribe({
          next: (res) => {
            console.log('Budget created successfully', res);
            this.getBudget();
            this.visible = false;
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error creating budget', err);
            this.showErrorMessage(err);
            this.visible = false;
          }
        });
      } else {
        this.budgetService.updateBudget(updatedItem.id, payload).subscribe({
          next: (res) => {
            console.log('Budget updated successfully', res);
            this.updateBudgetInUI(updatedItem);
            this.getBudget();
            this.visible = false;
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error updating budget', err);
            this.showErrorMessage(err);
            this.visible = false;
          }
        });
      }
    } else {
      console.error('No new limit set or selected item is null');
      this.visible = false;
    }
  }

  showErrorMessage(error: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    });
  }

  updateBudgetInUI(updatedBudget: IBudgetLimit) {
    const index = this.budgetLimit.findIndex(b => b.id === updatedBudget.id);
    if (index !== -1) {
      this.budgetLimit[index] = updatedBudget;
      this.budgetStatus[index] = updatedBudget.active;
    } else {
      this.budgetLimit.push(updatedBudget);
      this.budgetStatus.push(updatedBudget.active);
    }
  }
}
