import { IUserRepository } from './db/user.repository.interface';
import { User } from './entities/user.entity';

export class UserRepository implements IUserRepository {
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.users;
  }
  async create(data: User): Promise<User> {
    this.users.push(data);
    return data;
  }
}
