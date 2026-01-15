import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BlogPostForm } from './blog-post-form';

const mockOnSubmit = jest.fn();

describe('BlogPostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<BlogPostForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/slug/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/published/i)).toBeInTheDocument();
  });

  it('submits form with data', async () => {
    render(<BlogPostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'New Content' } });

    fireEvent.click(screen.getByRole('button', { name: /create post/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Post',
        slug: 'new-post',
        content: 'New Content',
      }));
    });
  });

  it('auto-generates slug from title', () => {
    render(<BlogPostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'My New Post!' } });

    expect(screen.getByLabelText(/slug/i)).toHaveValue('my-new-post');
  });

  it('does not auto-generate slug if manually edited', () => {
    render(<BlogPostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/slug/i), { target: { value: 'manual-slug' } });
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });

    expect(screen.getByLabelText(/slug/i)).toHaveValue('manual-slug');
  });

  it('populates form with initialData', () => {
    const initialData = {
      id: '1',
      title: 'Existing Post',
      slug: 'existing-post',
      content: 'Existing Content',
      published: true,
      authorId: 'user1',
      createdAt: '',
      updatedAt: '',
    };

    render(<BlogPostForm onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing Post');
    expect(screen.getByLabelText(/slug/i)).toHaveValue('existing-post');
    expect(screen.getByLabelText(/content/i)).toHaveValue('Existing Content');
    expect(screen.getByLabelText(/published/i)).toBeChecked();
  });
});
