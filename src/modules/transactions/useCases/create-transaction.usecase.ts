import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../db/transaction.repository.interface';
import { Transaction } from '../entities/transaction.entity';

type RequestTransaction = {
  name: string;
  value: number;
  transactionDate: string;
};

@Injectable()
export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(
    { name, value, transactionDate }: RequestTransaction,
    userId: string,
  ): Promise<Transaction> {
    const transaction = Transaction.create({
      name,
      value,
      userId,
      transactionDate,
    });

    return await this.transactionRepository.save(transaction);
  }
}
