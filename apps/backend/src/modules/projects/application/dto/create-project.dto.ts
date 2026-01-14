import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean, IsUrl } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectDto {
  @Field()
  @ApiProperty({ example: 'My Awesome Project' })
  @IsString()
  title!: string;

  @Field()
  @ApiProperty({ example: 'A brief description' })
  @IsString()
  description!: string;

  @Field()
  @ApiProperty({ example: 'Full project content in markdown' })
  @IsString()
  content!: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'https://github.com/user/repo' })
  @IsOptional()
  @IsUrl()
  repoUrl?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'https://project.com' })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @Field(() => [String], { nullable: true })
  @ApiPropertyOptional({ example: ['React', 'NestJS'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field({ nullable: true })
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
