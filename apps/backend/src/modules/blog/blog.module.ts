import { Module } from '@nestjs/common';
import { BlogService } from './application/services/blog.service';
import { BlogController } from './infra/controllers/blog.controller';
import { PrismaBlogRepository } from './infra/repositories/prisma-blog.repository';
import { BlogResolver } from './infra/resolvers/blog.resolver';

@Module({
  controllers: [BlogController],
  providers: [
    BlogService,
    BlogResolver,
    {
      provide: 'IBlogRepository',
      useClass: PrismaBlogRepository,
    },
  ],
  exports: [BlogService],
})
export class BlogModule {}
