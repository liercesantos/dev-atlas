import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './infra/repositories/prisma-users.repository';
import { UsersService } from './application/services/users.service';

@Module({
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: PrismaUsersRepository,
    },
    UsersService,
  ],
  exports: ['IUsersRepository', UsersService],
})
export class UsersModule {}
