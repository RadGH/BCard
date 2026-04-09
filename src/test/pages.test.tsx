import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  it('renders the hero heading', () => {
    renderAt('/');
    expect(screen.getByText('Professional Business Cards')).toBeInTheDocument();
  });

  it('renders the Start Designing button', () => {
    renderAt('/');
    expect(screen.getByText('Start Designing')).toBeInTheDocument();
  });

  it('shows template count in hero description', () => {
    renderAt('/');
    expect(screen.getByText(/Choose from.*templates/i)).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    renderAt('/');
    expect(screen.getByText(/^All/)).toBeInTheDocument();
  });

  it('renders showcase cards', () => {
    renderAt('/');
    const labels = screen.getAllByText('corporate');
    expect(labels.length).toBeGreaterThan(0);
  });
});

describe('EditorPage', () => {
  it('renders the editor with tabs', () => {
    renderAt('/editor');
    expect(screen.getByText('Fields')).toBeInTheDocument();
    expect(screen.getByText('Images')).toBeInTheDocument();
    expect(screen.getByText('Style')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders the person selector', () => {
    renderAt('/editor');
    expect(screen.getByText('Person')).toBeInTheDocument();
    expect(screen.getByText('Use Demo Data')).toBeInTheDocument();
  });

  it('renders field inputs by default', () => {
    renderAt('/editor');
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('renders the Show Back button for card preview', () => {
    renderAt('/editor');
    expect(screen.getByText('Show Back')).toBeInTheDocument();
  });

  it('renders Browse Templates link in header', () => {
    renderAt('/editor');
    const links = screen.getAllByText('Browse Templates');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('renders related templates section', () => {
    renderAt('/editor');
    expect(screen.getByText('Related Templates')).toBeInTheDocument();
  });

  it('renders more templates section', () => {
    renderAt('/editor');
    expect(screen.getByText('More Templates')).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('renders 404', () => {
    renderAt('/some-nonexistent-page');
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found.')).toBeInTheDocument();
  });

  it('has a link back home', () => {
    renderAt('/some-nonexistent-page');
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});

describe('Policy Pages', () => {
  it('renders privacy policy page', () => {
    renderAt('/privacy');
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByText(/Data Storage/)).toBeInTheDocument();
  });

  it('renders terms of service page', () => {
    renderAt('/terms');
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeInTheDocument();
    expect(screen.getByText(/Your Content/)).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renders footer on homepage', () => {
    renderAt('/');
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it('has privacy and terms links', () => {
    renderAt('/');
    const privacyLinks = screen.getAllByText('Privacy Policy');
    const termsLinks = screen.getAllByText('Terms of Service');
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
    expect(termsLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('shows data privacy note', () => {
    renderAt('/');
    expect(screen.getByText(/data never leaves your device/i)).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('header shows BCard logo on all pages', () => {
    renderAt('/');
    const logos = screen.getAllByText('BCard');
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it('homepage shows Create Card button', () => {
    renderAt('/');
    expect(screen.getByText('Create Card')).toBeInTheDocument();
  });
});
