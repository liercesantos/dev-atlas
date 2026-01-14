import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBlogPostDto {
  @Field()
  @ApiProperty({ example: 'My First Blog Post' })
  @IsString()
  title!: string;

  @Field()
  @ApiProperty({ example: 'my-first-blog-post' })
  @IsString()
  slug!: string;

  @Field()
  @ApiProperty({ example: 'Full blog content in markdown' })
  @IsString()
  content!: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
