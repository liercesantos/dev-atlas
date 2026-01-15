import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class BlogPost {
  @Field(() => ID)
  @ApiProperty()
  id!: string;

  @Field()
  @ApiProperty()
  title!: string;

  @Field()
  @ApiProperty()
  slug!: string;

  @Field()
  @ApiProperty()
  content!: string;

  @Field()
  @ApiProperty()
  published!: boolean;

  @Field()
  @ApiProperty()
  authorId!: string;

  @Field()
  @ApiProperty()
  createdAt!: Date;

  @Field()
  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<BlogPost>) {
    Object.assign(this, partial);
  }
}
