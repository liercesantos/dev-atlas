import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType()
export class Project {
  @Field(() => ID)
  @ApiProperty()
  id!: string;

  @Field()
  @ApiProperty()
  title!: string;

  @Field()
  @ApiProperty()
  description!: string;

  @Field()
  @ApiProperty()
  content!: string;

  @Field({ nullable: true })
  @ApiPropertyOptional()
  imageUrl?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional()
  repoUrl?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional()
  liveUrl?: string;

  @Field(() => [String])
  @ApiProperty({ type: [String] })
  tags!: string[];

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

  constructor(partial: Partial<Project>) {
    Object.assign(this, partial);
  }
}
