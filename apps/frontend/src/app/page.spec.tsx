import { render, screen } from '@testing-library/react'
import HomePage from './page'

// Mock ThemeToggle to avoid dealing with its dependencies in the page test
jest.mock('@/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle</button>,
}))

// Mock LazyHeavyComponent to avoid act() warnings from next/dynamic
jest.mock('@/components/ui/lazy-heavy-component', () => ({
  LazyHeavyComponent: () => <div data-testid="lazy-heavy-component">Lazy Component</div>,
}))

describe('HomePage', () => {
  it('renders the title and welcome message', () => {
    render(<HomePage />)

    expect(screen.getByText(/🚀 DevAtlas/i)).toBeInTheDocument()
    expect(screen.getByText(/Welcome to the future of portfolio engineering/i)).toBeInTheDocument()
  })

  it('renders the ThemeToggle', () => {
    render(<HomePage />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
