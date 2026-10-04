import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(5, 5, 10, 0.95)',
        padding: '3rem 0',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center'
        }}
      >
        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.6rem', borderRadius: '50%' }}
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.6rem', borderRadius: '50%' }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={personal.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.6rem', borderRadius: '50%' }}
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>

        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Designed & Engineered with{' '}
            <Heart size={14} color="#f43f5e" style={{ display: 'inline', verticalAlign: 'middle' }} /> by{' '}
            <strong style={{ color: '#fff' }}>{personal.name}</strong>
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          style={{
            position: 'absolute',
            right: '2rem',
            top: '2.5rem',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            e.currentTarget.style.background = 'rgba(0, 206, 201, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};
