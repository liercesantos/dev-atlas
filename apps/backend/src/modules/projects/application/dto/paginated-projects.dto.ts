import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../domain/entities/project.entity';

@ObjectType()
export class PaginatedProjects {
  @Field(() => [Project])
  @ApiProperty({ type: [Project] })
  items!: Project[];

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
