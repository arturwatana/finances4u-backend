import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { IUserRepository } from './db/user.repository.interface';
import { CreateUserSchemaDTO } from './entities/user.dto';

@Controller('/users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userRepository: IUserRepository,
  ) {}
  @Post()
  // @UsePipes(new CreateUserPipe())
  create(@Body() data: CreateUserSchemaDTO) {
    const userCreated = this.createUserUseCase.create(data);
    return userCreated;
  }

  @Get()
  getUsers() {
    return this.userRepository.getAll();
  }
}