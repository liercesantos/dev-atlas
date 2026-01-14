import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { InputType, PartialType as GqlPartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectDto extends GqlPartialType(PartialType(CreateProjectDto)) {}
