import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BlogPost {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  slug!: string;

  @Field()
  content!: string;

  @Field()
  published!: boolean;

  @Field()
  authorId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  constructor(partial: Partial<BlogPost>) {
    Object.assign(this, partial);
  }
}
