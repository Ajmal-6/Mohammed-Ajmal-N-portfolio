import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-num">02.</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div
          className="experience-timeline"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(108, 92, 231, 0.25)'
          }}
        >
          {experience.map((item) => (
            <div
              key={item.id}
              className="glass-card experience-card"
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {/* Timeline Glowing Node Dot */}
              <div
                className="experience-node-dot"
                style={{
                  position: 'absolute',
                  top: '2.2rem',
                  left: '-2.15rem',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '3px solid var(--accent-cyan)',
                  boxShadow: '0 0 12px var(--accent-cyan)'
                }}
              />

              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Briefcase size={18} color="var(--accent-purple)" />
                    <span>{item.role}</span>
                  </h3>
                  <p
                    style={{
                      color: 'var(--accent-cyan)',
                      fontWeight: 500,
                      fontSize: '1.05rem',
                      marginTop: '0.2rem'
                    }}
                  >
                    {item.company}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Points */}
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.98rem'
                }}
              >
                {item.points.map((pt, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--accent-cyan)',
                        fontSize: '1.2rem',
                        lineHeight: 1
                      }}
                    >
                      ▹
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {item.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .experience-timeline {
            padding-left: 1.1rem !important;
          }
          .experience-node-dot {
            left: -1.65rem !important;
            width: 14px !important;
            height: 14px !important;
            top: 1.85rem !important;
          }
          .experience-card {
            padding: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  );
};
