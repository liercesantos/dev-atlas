import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './infra/repositories/prisma-users.repository';

@Module({
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: PrismaUsersRepository,
    },
  ],
  exports: ['IUsersRepository'],
})
export class UsersModule {}
