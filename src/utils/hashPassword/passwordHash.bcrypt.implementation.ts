import { Injectable } from '@nestjs/common';
import { IPasswordHash } from './passwordHash.interface';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordBcryptHash implements IPasswordHash {
  async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }
  async compare(password: string, passwordHash: string): Promise<boolean> {
    return await compare(password, passwordHash);
  }
}
