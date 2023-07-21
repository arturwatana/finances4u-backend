import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { SignInModule } from './modules/signIn/signIn.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PasswordBcryptHash } from './utils/hashPassword/passwordHash.bcrypt.implementation';

@Module({
  imports: [UserModule, SignInModule, TransactionsModule],
  controllers: [],
  providers: [
    PasswordBcryptHash,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
