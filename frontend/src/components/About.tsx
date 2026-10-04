import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MapPin, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export const About: React.FC = () => {
  const { personal, about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-num">01.</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Visual Profile Card */}
          <div>
            <div
              className="glass-card"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Profile Image with Cyber Glow */}
              <div
                style={{
                  position: 'relative',
                  width: 170,
                  height: 170,
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    filter: 'blur(8px)',
                    opacity: 0.75
                  }}
                />
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onError={(e) => {
                    // Fallback to profile.jpg or colored avatar
                    (e.currentTarget as HTMLImageElement).src = '/images/profile.jpg';
                  }}
                />
              </div>

              {/* Chips */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                {about.chips.map((chip, i) => (
                  <span
                    key={chip}
                    className={`tag ${i === 0 ? 'tag-cyan' : ''}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="var(--accent-cyan)" />
                  <span>{personal.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="#10b981" />
                  <span style={{ color: '#10b981', fontWeight: 500 }}>{personal.status}</span>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.5rem', borderRadius: '50%' }}
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.5rem', borderRadius: '50%' }}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={personal.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.5rem', borderRadius: '50%' }}
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.8
                }}
              >
                {p}
              </p>
            ))}

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                marginTop: '1rem'
              }}
            >
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
                <span key={tech} className="tag tag-cyan">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
