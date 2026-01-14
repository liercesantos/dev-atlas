import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IBlogRepository } from '../../domain/repositories/blog.repository.interface';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';
import { BlogPostFilterDto } from '../dto/blog-post-filter.dto';
import { PaginatedBlogPosts } from '../dto/paginated-blog-posts.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject('IBlogRepository')
    private readonly blogRepository: IBlogRepository,
  ) {}

  async findAll(filter: BlogPostFilterDto): Promise<PaginatedBlogPosts> {
    const { skip, take, search, published } = filter;

    const where: any = {};

    if (published !== undefined) {
      where.published = published;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.blogRepository.findAll({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.blogRepository.count(where),
    ]);

    return {
      items,
      total,
      skip,
      take,
    };
  }

  async findOne(id: string) {
    const post = await this.blogRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.blogRepository.findBySlug(slug);
    if (!post) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }
    return post;
  }

  async create(authorId: string, dto: CreateBlogPostDto) {
    const existing = await this.blogRepository.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException(`Blog post with slug "${dto.slug}" already exists`);
    }
    return this.blogRepository.create({
      ...dto,
      authorId,
    });
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    await this.findOne(id);
    if (dto.slug) {
      const existing = await this.blogRepository.findBySlug(dto.slug);
      if (existing && existing.id !== id) {
        throw new ConflictException(`Blog post with slug "${dto.slug}" already exists`);
      }
    }
    return this.blogRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.blogRepository.delete(id);
  }
}
