import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../../src/components/ui/button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies standard button styles', () => {
    const { container } = render(<Button variant="default">Click Me</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('text-primary-foreground');
  });
});
