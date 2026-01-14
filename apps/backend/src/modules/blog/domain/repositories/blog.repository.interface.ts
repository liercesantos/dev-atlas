/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPost } from '../entities/blog-post.entity';

export interface IBlogRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Promise<BlogPost[]>;
  findById(id: string): Promise<BlogPost | null>;
  findBySlug(slug: string): Promise<BlogPost | null>;
  create(data: Partial<BlogPost>): Promise<BlogPost>;
  update(id: string, data: Partial<BlogPost>): Promise<BlogPost>;
  delete(id: string): Promise<BlogPost>;
  count(where?: any): Promise<number>;
}
