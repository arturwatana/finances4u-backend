import { PrismaService } from 'src/utils/db/prisma.service';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }
  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user || null;
  }

  async updateUser(data: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
    return updatedUser;
  }
  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
}
