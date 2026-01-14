export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBlogPosts {
  items: BlogPost[];
  total: number;
  skip: number;
  take: number;
}

export interface BlogPostFilter {
  skip?: number;
  take?: number;
  search?: string;
  published?: boolean;
}

export interface CreateBlogPostDto {
  title: string;
  slug: string;
  content: string;
  published?: boolean;
}

export type UpdateBlogPostDto = Partial<CreateBlogPostDto>;
