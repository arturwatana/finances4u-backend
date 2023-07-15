import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { SignInModule } from './modules/signIn/signIn.module';

@Module({
  imports: [UserModule, SignInModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
