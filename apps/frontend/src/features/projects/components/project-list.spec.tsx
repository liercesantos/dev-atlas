import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectList } from './project-list';
import { projectsService } from '../services/projects.service';

jest.mock('../services/projects.service');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

const mockProjects = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Desc 1',
    content: 'Content 1',
    published: true,
    tags: ['tag1'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: 'auth1',
  },
];

describe('ProjectList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders projects correctly', () => {
    render(<ProjectList initialProjects={mockProjects} />);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('calls delete service when delete button is clicked', async () => {
    window.confirm = jest.fn(() => true);
    (projectsService.delete as jest.Mock).mockResolvedValueOnce({});

    render(<ProjectList initialProjects={mockProjects} />);

    const deleteButton = screen.getByLabelText(/delete project 1/i);
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(projectsService.delete).toHaveBeenCalledWith('1');

    await waitFor(() => {
      expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    });
  });

  it('does not call delete service if not confirmed', async () => {
    window.confirm = jest.fn(() => false);

    render(<ProjectList initialProjects={mockProjects} />);

    const deleteButton = screen.getByLabelText(/delete project 1/i);
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(projectsService.delete).not.toHaveBeenCalled();
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });
});
