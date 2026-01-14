import { renderHook, act } from '@testing-library/react'
import { useTheme } from './use-theme'
import { useTheme as useNextTheme } from 'next-themes'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('useTheme', () => {
  const setThemeMock = jest.fn()

  beforeEach(() => {
    ;(useNextTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
      resolvedTheme: 'light',
    })
  })

  it('returns theme information', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(result.current.isDark).toBe(false)
  })

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(setThemeMock).toHaveBeenCalledWith('dark')
  })

  it('toggles theme from dark to light', () => {
    ;(useNextTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
      resolvedTheme: 'dark',
    })

    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(setThemeMock).toHaveBeenCalledWith('light')
  })
})
