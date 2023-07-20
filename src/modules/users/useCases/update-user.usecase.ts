import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from '../db/user.repository.interface';
import { IUser, User } from '../entities/user.entity';
import * as dayjs from 'dayjs';
import { IPasswordHash } from 'src/utils/hashPassword/passwordHash.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHash: IPasswordHash,
  ) {}
  async execute(id: string, payload: IUser) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_GATEWAY);
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(
      payload.email,
    );
    if (emailAlreadyExists) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const updatedUser: User = {
      id: user.id,
      name: payload.name ? payload.name : user.name,
      email: payload.email ? payload.email : user.email,
      password: payload.password
        ? await this.passwordHash.hash(payload.password)
        : user.password,
      createdAt: user.createdAt,
      updatedAt: dayjs().format('DD/MM/YYYY HH:MM:SS'),
    };

    return await this.userRepository.updateUser(updatedUser);
  }
}
