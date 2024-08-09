export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  role: Role;
  balance: number;
  balanceSaving: number;
  balanceAsset: number;
  streak: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserUpdate {
  email: string;
  password?: string;
  fullname: string;
  balance?: number;
  balanceSaving?: number;
  balanceAsset?: number;
}
