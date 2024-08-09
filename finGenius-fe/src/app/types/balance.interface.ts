export interface IUpdateBalance {
  balance: number;
}

export interface ITransferBalance {
  from: string;
  to: string;
  amount: number;
}
