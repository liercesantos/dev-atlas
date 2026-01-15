import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectForm } from './project-form';

const mockOnSubmit = jest.fn();

describe('ProjectForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ProjectForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repository url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/live url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/published/i)).toBeInTheDocument();
  });

  it('submits form with data', async () => {
    render(<ProjectForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Project' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'New Content' } });

    fireEvent.click(screen.getByRole('button', { name: /create project/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Project',
        description: 'New Description',
        content: 'New Content',
      }));
    });
  });

  it('populates form with initialData', () => {
    const initialData = {
      id: '1',
      title: 'Existing Project',
      description: 'Existing Description',
      content: 'Existing Content',
      tags: ['tag1', 'tag2'],
      published: true,
      authorId: 'user1',
      createdAt: '',
      updatedAt: '',
    };

    render(<ProjectForm onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing Project');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Existing Description');
    expect(screen.getByLabelText(/content/i)).toHaveValue('Existing Content');
    expect(screen.getByLabelText(/tags/i)).toHaveValue('tag1, tag2');
    expect(screen.getByLabelText(/published/i)).toBeChecked();
  });
});
