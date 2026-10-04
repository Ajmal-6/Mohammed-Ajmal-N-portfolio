import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  const { education, achievements } = PORTFOLIO_DATA;

  return (
    <section id="education" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-num">05.</span>
          <h2 className="section-title">Education & Achievements</h2>
        </div>

        {/* Education Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          {education.map((edu, idx) => (
            <div
              key={edu.degree}
              className="glass-card education-card"
              style={{
                padding: '2.25rem',
                display: 'flex',
                gap: '1.5rem',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '14px',
                  background: idx === 0 ? 'rgba(108, 92, 231, 0.15)' : 'rgba(0, 206, 201, 0.15)',
                  border: `1px solid ${idx === 0 ? 'rgba(108, 92, 231, 0.3)' : 'rgba(0, 206, 201, 0.3)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {idx === 0 ? (
                  <GraduationCap size={26} color="var(--accent-purple)" />
                ) : (
                  <BookOpen size={26} color="var(--accent-cyan)" />
                )}
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600
                  }}
                >
                  {edu.period}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0.4rem 0'
                  }}
                >
                  {edu.degree}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                  {edu.institution}
                </p>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div style={{ marginTop: '2rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Award size={22} color="var(--accent-magenta)" />
            <span>Notable Honors & Achievements</span>
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem'
            }}
          >
            {achievements.map((item) => (
              <div
                key={item.title}
                className="glass-card achievement-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  {item.year}
                </span>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600 }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .education-card {
            padding: 1.35rem !important;
            gap: 1.1rem !important;
          }
          .achievement-card {
            padding: 1.15rem !important;
          }
        }
        @media (max-width: 480px) {
          .education-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
