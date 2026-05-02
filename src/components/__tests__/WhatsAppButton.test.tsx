import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { WhatsAppButton } from '@/components/WhatsAppButton';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    a: ({ children, className, href, ...props }: any) => (
      <a className={className} href={href} aria-label={props['aria-label']} target={props.target} rel={props.rel}>
        {children}
      </a>
    ),
  },
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
}

describe('WhatsAppButton Component', () => {
  it('renders the floating button', () => {
    renderWithProviders(<WhatsAppButton />);

    const button = screen.getByLabelText('Book via WhatsApp');
    expect(button).toBeInTheDocument();
  });

  it('links to the correct WhatsApp URL', () => {
    renderWithProviders(<WhatsAppButton />);

    const button = screen.getByLabelText('Book via WhatsApp');
    expect(button.getAttribute('href')).toContain('wa.me/918287655133');
  });

  it('opens in a new tab', () => {
    renderWithProviders(<WhatsAppButton />);

    const button = screen.getByLabelText('Book via WhatsApp');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('contains the WhatsApp SVG icon', () => {
    renderWithProviders(<WhatsAppButton />);

    const button = screen.getByLabelText('Book via WhatsApp');
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows tooltip text on hover (in DOM)', () => {
    renderWithProviders(<WhatsAppButton />);

    // The tooltip text is rendered but hidden by CSS (opacity-0)
    expect(screen.getByText('Book via WhatsApp')).toBeInTheDocument();
  });
});
