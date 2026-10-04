import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Download, Mail, Bot, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const { personal } = PORTFOLIO_DATA;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = personal.roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && displayedText === currentRole) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % personal.roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? currentRole.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, personal.roles]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '4.5rem'
      }}
    >
      {/* Target anchor for #about navigation */}
      <span id="about" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div className="container" style={{ maxWidth: 1240 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.08fr 0.92fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-about-grid"
        >
          {/* ================= LEFT: HERO / LANDING ================= */}
          <div>
            {/* Engineering Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.35)',
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
                color: '#c4b5fd'
              }}
            >
              <span className="neural-pulse-dot" />
              <span>Healthcare AI &amp; Machine Learning Engineer</span>
              <Sparkles size={14} color="var(--accent-cyan)" />
            </div>

            <p
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.4rem',
                fontWeight: 500
              }}
            >
              {personal.greeting}
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '1rem',
                letterSpacing: '-0.03em',
                color: '#ffffff'
              }}
            >
              Mohammed Ajmal <span className="gradient-text">N</span>
            </h1>

            {/* Typewriter Animated Role */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '1.25rem',
                minHeight: '2.4rem'
              }}
            >
              <span style={{ color: '#cbd5e1' }}>I am a</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                {displayedText}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.4em',
                  background: 'var(--accent-cyan)',
                  animation: 'blink 1s infinite'
                }}
              />
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: '1.05rem',
                color: '#cbd5e1',
                lineHeight: 1.75,
                marginBottom: '2.25rem'
              }}
            >
              Crafting intelligent solutions at the intersection of{' '}
              <strong style={{ color: '#ffffff' }}>Artificial Intelligence</strong>,{' '}
              <strong style={{ color: 'var(--accent-cyan)' }}>Healthcare Systems</strong>, and{' '}
              <strong style={{ color: 'var(--accent-magenta)' }}>Cloud Architecture</strong>.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '2.75rem'
              }}
            >
              <a
                href={personal.cvPath}
                download="Mohammed_Ajmal_N_CV.pdf"
                className="btn btn-primary"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>

              <a href="#contact" className="btn btn-outline">
                <Mail size={18} />
                <span>Get In Touch</span>
              </a>

              <button
                onClick={onOpenChat}
                className="btn btn-outline"
                style={{
                  borderColor: 'rgba(0, 206, 201, 0.5)',
                  background: 'rgba(0, 206, 201, 0.12)',
                  color: 'var(--accent-cyan)'
                }}
              >
                <Bot size={18} color="var(--accent-cyan)" />
                <span>Ask AI</span>
              </button>
            </div>

            {/* Stats Counter */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
              }}
            >
              {personal.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card"
                  style={{
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.9rem',
                      fontWeight: 700,
                      lineHeight: 1
                    }}
                  >
                    <span className="gradient-text">{stat.number}</span>
                  </span>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT: ABOUT ME CARD ================= */}
          <div>
            <div
              className="glass-card"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                position: 'relative'
              }}
            >
              {/* 1st Div: ONLY Profile Photo, positioned downwards so full face & hair are visible */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: 145,
                    height: 145
                  }}
                >
                  {/* Glowing halo */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      filter: 'blur(8px)',
                      opacity: 0.8
                    }}
                  />
                  {/* Avatar image shifted downwards via objectPosition to reveal full head, hair, and face */}
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center 12%',
                      border: '3px solid rgba(255, 255, 255, 0.35)',
                      display: 'block'
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/profile.jpg';
                    }}
                  />
                </div>
              </div>

              {/* 2nd Div: "About Me" heading (no numbering) + Bio Text + Tech Stack */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1.25rem'
                }}
              >
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  About Me
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75
                  }}
                >
                  <p>
                    I'm an <strong style={{ color: '#fff' }}>AI Engineer</strong> and B.Tech graduate in Artificial Intelligence &amp; Data Science, passionate about developing production-ready healthcare solutions.
                  </p>
                  <p>
                    Currently at <strong style={{ color: 'var(--accent-cyan)' }}>Curanova.AI</strong>, I engineer healthcare AI pipelines—preprocessing sensitive medical datasets and utilizing Google Health models on GCP with strict security.
                  </p>
                </div>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.25rem' }}>
                  {[
                    'Python',
                    'PyTorch',
                    'TensorFlow',
                    'FastAPI',
                    'GCP',
                    'Google Health',
                    'Computer Vision',
                    'Docker',
                    'PostgreSQL'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="tag tag-cyan"
                      style={{ fontSize: '0.74rem' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Note: 3rd Div ("Connect with Ajmal") removed as requested */}
            </div>
          </div>
        </div>
      </div>

      {/* Explore indicator */}
      <a
        href="#experience"
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.78rem',
          textDecoration: 'none',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <span>Explore Career &amp; Projects</span>
        <ArrowDown size={15} />
      </a>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 1024px) {
          .hero-about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};
