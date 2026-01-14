import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from '../../domain/entities/project.entity';

@ObjectType()
export class PaginatedProjects {
  @Field(() => [Project])
  items!: Project[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  skip!: number;

  @Field(() => Int)
  take!: number;
}
