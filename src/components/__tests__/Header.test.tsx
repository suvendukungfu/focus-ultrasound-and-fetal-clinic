import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LanguageProvider>
          {ui}
        </LanguageProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('Header Component', () => {
  it('renders the clinic name', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('Focus Ultrasound')).toBeInTheDocument();
    expect(screen.getByText('& Fetal Clinic')).toBeInTheDocument();
  });

  it('renders the Book Appointment button', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('Book Appointment')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Header />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the language toggle buttons', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('हि')).toBeInTheDocument();
  });

  it('renders the WhatsApp contact link', () => {
    renderWithProviders(<Header />);

    const whatsappLink = screen.getByLabelText('Contact via WhatsApp');
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/918287655133');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
  });

  it('renders the mobile menu toggle', () => {
    renderWithProviders(<Header />);

    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderWithProviders(<Header />);

    const themeButton = screen.getByLabelText('Toggle dark mode');
    expect(themeButton).toBeInTheDocument();
  });
});
