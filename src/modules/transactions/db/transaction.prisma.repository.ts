import { ITransactionRepository } from './transaction.repository.interface';
import { Transaction } from '../entities/transaction.entity';
import { PrismaService } from 'src/utils/db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}
  async save(data: Transaction): Promise<Transaction> {
    return await this.prisma.transaction.create({
      data,
    });
  }
  async getAll(userId: string): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }
}
