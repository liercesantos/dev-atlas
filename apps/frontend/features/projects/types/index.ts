export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  tags: string[];
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProjects {
  items: Project[];
  total: number;
  skip: number;
  take: number;
}

export interface ProjectFilter {
  skip?: number;
  take?: number;
  search?: string;
  tag?: string;
  published?: boolean;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  tags?: string[];
  published?: boolean;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;
