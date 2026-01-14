import { PartialType } from '@nestjs/swagger';
import { CreateBlogPostDto } from './create-blog-post.dto';
import { InputType, PartialType as GqlPartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBlogPostDto extends GqlPartialType(PartialType(CreateBlogPostDto)) {}
