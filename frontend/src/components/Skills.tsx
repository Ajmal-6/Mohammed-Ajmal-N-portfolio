import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code, Cpu, Cloud, Globe, Wrench, Users } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Programming':
        return <Code size={22} color="var(--accent-cyan)" />;
      case 'AI / Machine Learning':
        return <Cpu size={22} color="var(--accent-purple)" />;
      case 'Cloud & DevOps':
        return <Cloud size={22} color="var(--accent-blue)" />;
      case 'Web & API Frameworks':
        return <Globe size={22} color="var(--accent-magenta)" />;
      case 'Hardware & IoT':
        return <Wrench size={22} color="var(--accent-cyan)" />;
      default:
        return <Users size={22} color="#10b981" />;
    }
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-num">03.</span>
          <h2 className="section-title">Technical Expertise</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.75rem'
          }}
        >
          {skills.map((category) => (
            <div
              key={category.title}
              className="glass-card skill-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    padding: '0.65rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getCategoryIcon(category.title)}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#fff'
                  }}
                >
                  {category.title}
                </h3>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.55rem'
                }}
              >
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.background = 'rgba(0, 206, 201, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .skill-card {
            padding: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  );
};
