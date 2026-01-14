import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BlogPostFilterDto {
  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ minimum: 0, default: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  skip?: number = 0;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  take?: number = 10;

  @Field({ nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
