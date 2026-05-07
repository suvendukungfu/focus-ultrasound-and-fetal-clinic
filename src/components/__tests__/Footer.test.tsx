import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe('Footer Component', () => {
  it('renders the clinic brand name', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Focus Ultrasound')).toBeInTheDocument();
    expect(screen.getByText('& Fetal Clinic')).toBeInTheDocument();
  });

  it('renders the correct phone number', () => {
    renderWithProviders(<Footer />);

    const phoneLink = screen.getByText('+91 98704 75400');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+919870475400');
  });

  it('renders the clinic email', () => {
    renderWithProviders(<Footer />);

    const emailLink = screen.getByText('info.fufc@gmail.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:info.fufc@gmail.com');
  });

  it('renders the clinic address', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(/Nirala Estate/)).toBeInTheDocument();
    expect(screen.getByText(/Greater Noida West/)).toBeInTheDocument();
  });

  it('renders clinic hours including Sunday', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Mon - Sat: 9:00 AM - 8:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday: 9:00 AM - 2:00 PM')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Footer />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(5);
  });

  it('renders service listings', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('3D/4D Ultrasound')).toBeInTheDocument();
    expect(screen.getByText('Fetal Echo')).toBeInTheDocument();
    expect(screen.getByText('Digital X-Ray')).toBeInTheDocument();
  });

  it('renders copyright notice with current year', () => {
    renderWithProviders(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
