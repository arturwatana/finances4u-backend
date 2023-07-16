export type ITransaction = {
  name: string;
  value: number;
  userId: string;
  transactionDate: string;
};

export type Transaction = {
  id: string;
  name: string;
  value: number;
  userId: string;
  createdAt: string;
  transactionDate: string;
};
