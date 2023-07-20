import { Module } from '@nestjs/common';
import { IPasswordHash } from 'src/utils/hashPassword/passwordHash.interface';
import { PasswordBcryptHash } from 'src/utils/hashPassword/passwordHash.bcrypt.implementation';
import { SignInController } from './signIn.controller';
import { IUserRepository } from '../users/db/user.repository.interface';
import { UserPrismaRepository } from '../users/db/user.prisma.repository';
import { PrismaService } from 'src/utils/db/prisma.service';
import { SignInUseCase } from './useCases/signIn.usecase';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'finances4u',
      signOptions: { expiresIn: '30000s' },
    }),
  ],
  controllers: [SignInController],
  providers: [
    PrismaService,
    SignInUseCase,
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
export class SignInModule {}
