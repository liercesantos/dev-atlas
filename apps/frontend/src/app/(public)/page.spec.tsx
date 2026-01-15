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

// Mock a Feature component to avoid dealing with feature flag state in page tests
jest.mock('@/features/feature-flags/components/feature', () => ({
  Feature: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('HomePage', () => {
  it('renders the title and welcome message', () => {
    render(<HomePage />)

    // @ts-expect-error must be resolved in the future
    expect(screen.getByText(/🚀 DevAtlas/i)).toBeInTheDocument()
    // @ts-expect-error must be resolved in the future
    expect(screen.getByText(/The ultimate production-grade portfolio engineering showcase/i)).toBeInTheDocument()
  })

  it('renders the ThemeToggle', () => {
    render(<HomePage />)
    // @ts-expect-error must be resolved in the future
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<HomePage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
