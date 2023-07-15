import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser, User } from '../entities/user.entity';
import { IUserRepository } from '../db/user.repository.interface';
import { IPasswordHash } from 'src/utils/hashPassword/passwordHash.interface';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHash: IPasswordHash,
  ) {}
  async create(data: IUser): Promise<User> {
    const user = User.create(data);
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new HttpException('User already Exists', HttpStatus.BAD_REQUEST);
    }
    const passwordHashed = await this.passwordHash.hash(user.password);
    user.password = passwordHashed;
    await this.userRepository.create(user);
    return user;
  }
}
