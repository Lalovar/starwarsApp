import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppBar } from '../AppBar'

describe('AppBar', () => {
  it('renders the app title', () => {
    render(<AppBar />)
    
    expect(screen.getByText('SWStarter')).toBeInTheDocument()
  })

  it('has the correct CSS classes', () => {
    render(<AppBar />)
    
    const appBar = screen.getByText('SWStarter').closest('div')
    expect(appBar).toHaveClass('w-screen', 'h-[40px]', 'flex', 'items-center', 'justify-center', 'bg-white')
  })

  it('renders with the correct text content', () => {
    render(<AppBar />)
    
    const titleElement = screen.getByText('SWStarter')
    expect(titleElement).toHaveTextContent('SWStarter')
  })
})
