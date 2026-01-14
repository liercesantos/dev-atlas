import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { BlogService } from '../../application/services/blog.service';
import { CreateBlogPostDto } from '../../application/dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../../application/dto/update-blog-post.dto';
import { BlogPostFilterDto } from '../../application/dto/blog-post-filter.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { GetUser } from '@/shared/decorators/get-user.decorator';
import { CacheControl } from '@/shared/decorators/cache-control.decorator';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @UseInterceptors(CacheInterceptor)
  @CacheControl('public, max-age=60')
  @Get()
  @ApiOperation({ summary: 'Get all blog posts with pagination and filters' })
  findAll(@Query() filter: BlogPostFilterDto) {
    return this.blogService.findAll(filter);
  }

  @Public()
  @UseInterceptors(CacheInterceptor)
  @CacheControl('public, max-age=60')
  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Public()
  @UseInterceptors(CacheInterceptor)
  @CacheControl('public, max-age=60')
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a blog post by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  create(
    @GetUser('id') userId: string,
    @Body() createBlogPostDto: CreateBlogPostDto,
  ) {
    return this.blogService.create(userId, createBlogPostDto);
  }

  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog post' })
  update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogService.update(id, updateBlogPostDto);
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
