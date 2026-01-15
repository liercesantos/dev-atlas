import { CreateBlogPostDto } from './create-blog-post.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}
