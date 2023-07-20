import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { IUserRepository } from './db/user.repository.interface';
import { CreateUserSchemaDTO } from './entities/user.dto';
import { AuthGuard } from '../providers/auth-guard.provider';
import { CreateUserPipe } from 'src/pipes/create-user.validation';
import { UpdateUserUseCase } from './useCases/update-user.usecase';
import { IUser } from './entities/user.entity';
import { ReqProps } from '../transactions/transactions.controller';

@Controller('/users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private userRepository: IUserRepository,
  ) {}
  @Post()
  @UsePipes(new CreateUserPipe())
  create(@Body() data: CreateUserSchemaDTO) {
    const userCreated = this.createUserUseCase.create(data);
    return userCreated;
  }

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userRepository.getAll();
  }

  @Put()
  @UseGuards(AuthGuard)
  updateUser(@Body() data: IUser, @Request() req: ReqProps) {
    return this.updateUserUseCase.execute(req.user.sub, data);
  }
}
