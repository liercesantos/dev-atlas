import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from '../../domain/entities/blog-post.entity';

@ObjectType()
export class PaginatedBlogPosts {
  @Field(() => [BlogPost])
  @ApiProperty({ type: [BlogPost] })
  items!: BlogPost[];

  @Field(() => Int)
  @ApiProperty()
  total!: number;

  @Field(() => Int)
  @ApiProperty()
  skip!: number;

  @Field(() => Int)
  @ApiProperty()
  take!: number;
}
