import { Transaction } from '../entities/transaction.entity';

export abstract class ITransactionRepository {
  abstract save(data: Transaction): Promise<Transaction>;
  abstract getAll(userId: string): Promise<Transaction[]>;
}
