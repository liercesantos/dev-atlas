import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BlogPostList } from './blog-post-list';
import { blogService } from '../services/blog.service';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

// Mock blogService
jest.mock('../services/blog.service', () => ({
  blogService: {
    delete: jest.fn(),
  },
}));

const mockPosts = [
  {
    id: '1',
    title: 'Post One',
    slug: 'post-one',
    content: 'Content One',
    published: true,
    authorId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Post Two',
    slug: 'post-two',
    content: 'Content Two',
    published: false,
    authorId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe('BlogPostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  it('renders a list of blog posts', () => {
    render(<BlogPostList initialPosts={mockPosts} />);

    expect(screen.getByText('Post One')).toBeInTheDocument();
    expect(screen.getByText('Post Two')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('shows empty state when no posts', () => {
    render(<BlogPostList initialPosts={[]} />);

    expect(screen.getByText(/no blog posts found/i)).toBeInTheDocument();
  });

  it('calls delete service when delete button is clicked', async () => {
    render(<BlogPostList initialPosts={mockPosts} />);

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(blogService.delete).toHaveBeenCalledWith('1');

    await waitFor(() => {
      expect(screen.queryByText('Post One')).not.toBeInTheDocument();
    });
  });

  it('does not delete if user cancels confirmation', async () => {
    window.confirm = jest.fn(() => false);
    render(<BlogPostList initialPosts={mockPosts} />);

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(blogService.delete).not.toHaveBeenCalled();
    expect(screen.getByText('Post One')).toBeInTheDocument();
  });
});
