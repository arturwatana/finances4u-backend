import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '../providers/auth-guard.provider';
import { CreateTransactionUseCase } from './useCases/create-transaction.usecase';
import { ITransaction } from './dto/transaction.dto';
import { ITransactionRepository } from './db/transaction.repository.interface';

export type ReqProps = {
  user: {
    sub: string;
  };
} & Request;

@Controller('/transactions')
export class TransactionsController {
  constructor(
    private createTransactionUseCase: CreateTransactionUseCase,
    private transactionsRepository: ITransactionRepository,
  ) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: ITransaction, @Request() req: ReqProps) {
    return await this.createTransactionUseCase.execute(data, req.user.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTransactionsById(@Request() req: ReqProps) {
    return await this.transactionsRepository.getAll(req.user.sub);
  }
}
