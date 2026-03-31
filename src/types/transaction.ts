export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: string;
}

export interface AccountData {
  balance: number;
  ownerName: string;
  accountNumber: string;
}
