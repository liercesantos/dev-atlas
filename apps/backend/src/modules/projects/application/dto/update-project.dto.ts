import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
