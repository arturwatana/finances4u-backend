import { ITransaction } from '../dto/transaction.dto';
const dayjs = require('dayjs');
import { randomUUID } from 'node:crypto';

export class Transaction {
  id: string;
  name: string;
  value: number;
  userId: string;
  createdAt: string;
  transactionDate: string;

  private constructor(data: ITransaction) {
    this.id = randomUUID();
    this.name = data.name;
    this.value = data.value;
    this.userId = data.userId;
    this.transactionDate = data.transactionDate;

    this.createdAt = dayjs().format('DD/MM/YYYY hh:mm:ss');
  }

  static create(data: ITransaction): Transaction {
    const transaction = new Transaction(data);
    return transaction;
  }
}
