import { ICategory, TransactionType } from './Finance.interface';

export interface ICreateTransaction {
  name: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface ITransaction {
  id: string;
  name: string;
  description: string;
  category: ICategory;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IReqParamTransaction {
  query: string;
  filterBy: string;
  filter: string;
  startDate: string;
  endDate: string;
}

export interface IReqParamSumTransaction {
  Type: string;
  startDate: string;
  endDate: string;
}

export interface ISumTransaction {
  userId: string;
  nameCategory: string;
  colorCategory: string;
  amountTransactionCategorySum: number;
  percentageTransactionCategorySum: number;
}

export interface ICommonTransaction {
  totalAmount: number;
  transactions: ITransaction[];
}
