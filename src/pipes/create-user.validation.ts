import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateUserPipe implements PipeTransform {
  transform({ email, password, name }: User, metadata: ArgumentMetadata) {
    if (!name || !email || !password) {
      throw new HttpException('invalid informations', HttpStatus.BAD_GATEWAY);
    }

    return {
      email,
      password,
      name,
    };
  }
}
