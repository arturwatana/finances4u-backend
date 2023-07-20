import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract create(data: User): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract updateUser(data: User): Promise<User>;
}
