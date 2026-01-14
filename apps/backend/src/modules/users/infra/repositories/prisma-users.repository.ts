import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.mapToEntity(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.mapToEntity(user) : null;
  }

  async create(data: any): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });
    return this.mapToEntity(user);
  }

  async update(id: string, data: any): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.mapToEntity(user);
  }

  private mapToEntity(user: any): User {
    return new User(
      user.id,
      user.email,
      user.name,
      user.role,
      user.createdAt,
      user.updatedAt,
      user.password,
      user.refreshToken,
    );
  }
}
