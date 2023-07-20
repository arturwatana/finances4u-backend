import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { PrismaService } from 'src/utils/db/prisma.service';
import { IUserRepository } from './db/user.repository.interface';
import { UserPrismaRepository } from './db/user.prisma.repository';
import { IPasswordHash } from 'src/utils/hashPassword/passwordHash.interface';
import { PasswordBcryptHash } from 'src/utils/hashPassword/passwordHash.bcrypt.implementation';
import { UpdateUserUseCase } from './useCases/update-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    UpdateUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IPasswordHash,
      useClass: PasswordBcryptHash,
    },
  ],
})
export class UserModule {}
