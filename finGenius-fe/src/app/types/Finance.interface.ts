import { IUser } from './User.interface';

export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export interface ITypes {
  id: string;
  name: TransactionType;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: ITypes;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCategory {
  name: string;
  icon: string;
  color: string;
  typeId: string;
}

export interface IBudgetLimit {
  id: string;
  user: IUser;
  category: ICategory;
  amount: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface IGetBudget{
  id: string;
  user: IUser;
  categoryName: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}
