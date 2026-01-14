import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  content!: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  repoUrl?: string;

  @Field({ nullable: true })
  liveUrl?: string;

  @Field(() => [String])
  tags!: string[];

  @Field()
  published!: boolean;

  @Field()
  authorId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  constructor(partial: Partial<Project>) {
    Object.assign(this, partial);
  }
}
