import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    let hashedRefreshToken = null;
    if (refreshToken) {
      hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    }
    await this.usersRepository.update(userId, { refreshToken: hashedRefreshToken });
  }
}
