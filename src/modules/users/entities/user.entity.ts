import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';
export type IUser = {
  name: string;
  email: string;
  password: string;
};
export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  private constructor({ email, name, password }: IUser) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = dayjs().format('DD/MM/YYYY HH:MM:SS');
    this.updatedAt = dayjs().format('DD/MM/YYYY HH:MM:SS');
  }

  static create(data: IUser): User {
    const user = new User(data);
    return user;
  }
}
