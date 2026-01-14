import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BlogService } from '../../application/services/blog.service';
import { BlogPost } from '../../domain/entities/blog-post.entity';
import { CreateBlogPostDto } from '../../application/dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../../application/dto/update-blog-post.dto';
import { BlogPostFilterDto } from '../../application/dto/blog-post-filter.dto';
import { PaginatedBlogPosts } from '../../application/dto/paginated-blog-posts.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { GetUser } from '@/shared/decorators/get-user.decorator';
import { GqlAtGuard } from '../../../projects/infra/guards/gql-at.guard';
import { GqlRolesGuard } from '../../../projects/infra/guards/gql-roles.guard';

@Resolver(() => BlogPost)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @Query(() => PaginatedBlogPosts, { name: 'blogPosts' })
  findAll(@Args() filter: BlogPostFilterDto) {
    return this.blogService.findAll(filter);
  }

  @Public()
  @Query(() => BlogPost, { name: 'blogPost' })
  findOne(@Args('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Public()
  @Query(() => BlogPost, { name: 'blogPostBySlug' })
  findBySlug(@Args('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Roles('ADMIN', 'EDITOR')
  @UseGuards(GqlAtGuard, GqlRolesGuard)
  @Mutation(() => BlogPost)
  createBlogPost(
    @GetUser('id') userId: string,
    @Args('createBlogPostInput') createBlogPostDto: CreateBlogPostDto,
  ) {
    return this.blogService.create(userId, createBlogPostDto);
  }

  @Roles('ADMIN', 'EDITOR')
  @UseGuards(GqlAtGuard, GqlRolesGuard)
  @Mutation(() => BlogPost)
  updateBlogPost(
    @Args('id') id: string,
    @Args('updateBlogPostInput') updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogService.update(id, updateBlogPostDto);
  }

  @Roles('ADMIN')
  @UseGuards(GqlAtGuard, GqlRolesGuard)
  @Mutation(() => BlogPost)
  removeBlogPost(@Args('id') id: string) {
    return this.blogService.remove(id);
  }
}
