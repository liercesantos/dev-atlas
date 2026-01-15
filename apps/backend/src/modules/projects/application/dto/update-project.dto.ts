import { CreateProjectDto } from './create-project.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
