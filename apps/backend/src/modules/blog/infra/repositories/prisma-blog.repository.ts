import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { IBlogRepository } from '../../domain/repositories/blog.repository.interface';
import { BlogPost } from '../../domain/entities/blog-post.entity';

@Injectable()
export class PrismaBlogRepository implements IBlogRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Promise<BlogPost[]> {
    const posts = await this.prisma.blogPost.findMany(params);
    return posts.map((p) => this.mapToEntity(p));
  }

  async findById(id: string): Promise<BlogPost | null> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
    });
    return post ? this.mapToEntity(post) : null;
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });
    return post ? this.mapToEntity(post) : null;
  }

  async create(data: any): Promise<BlogPost> {
    const post = await this.prisma.blogPost.create({
      data,
    });
    return this.mapToEntity(post);
  }

  async update(id: string, data: any): Promise<BlogPost> {
    const post = await this.prisma.blogPost.update({
      where: { id },
      data,
    });
    return this.mapToEntity(post);
  }

  async delete(id: string): Promise<BlogPost> {
    const post = await this.prisma.blogPost.delete({
      where: { id },
    });
    return this.mapToEntity(post);
  }

  async count(where?: any): Promise<number> {
    return this.prisma.blogPost.count({ where });
  }

  private mapToEntity(post: any): BlogPost {
    return new BlogPost({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  }
}
