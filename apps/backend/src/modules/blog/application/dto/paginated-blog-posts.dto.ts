import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BlogPost } from '../../domain/entities/blog-post.entity';

@ObjectType()
export class PaginatedBlogPosts {
  @Field(() => [BlogPost])
  items: BlogPost[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}
