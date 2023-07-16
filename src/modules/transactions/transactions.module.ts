import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ITransactionRepository } from './db/transaction.repository.interface';
import { TransactionRepository } from './db/transaction.prisma.repository';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionUseCase } from './useCases/create-transaction.usecase';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    PrismaService,
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
  ],
})
export class TransactionsModule {}
