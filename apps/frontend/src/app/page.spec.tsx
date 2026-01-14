import { render, screen } from '@testing-library/react'
import HomePage from './page'

// Mock ThemeToggle to avoid dealing with its dependencies in the page test
jest.mock('@/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle</button>,
}))

describe('HomePage', () => {
  it('renders the title and welcome message', () => {
    render(<HomePage />)

    // @ts-expect-error must be fixed
    expect(screen.getByText(/🚀 DevAtlas/i)).toBeInTheDocument()
    // @ts-expect-error must be fixed
    expect(screen.getByText(/Welcome to the future of portfolio engineering/i)).toBeInTheDocument()
  })

  it('renders the ThemeToggle', () => {
    render(<HomePage />)
    // @ts-expect-error must be fixed
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
