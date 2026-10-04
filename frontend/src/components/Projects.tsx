import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

interface ProjectsProps {
  onSelectProject?: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { projects } = PORTFOLIO_DATA;

  const handleProjectClick = (projectId: string) => {
    if (onSelectProject) {
      onSelectProject(projectId);
    } else {
      window.location.hash = `#project/${projectId}`;
    }
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-num">04.</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2.5rem'
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              {/* Project Image Preview (Clickable to open project page) */}
              <a
                href={`#project/${proj.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleProjectClick(proj.id);
                }}
                style={{
                  position: 'relative',
                  height: 230,
                  overflow: 'hidden',
                  background: '#090912',
                  display: 'block',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem'
                  }}
                >
                  <span className="tag tag-cyan">{proj.year}</span>
                </div>
              </a>

              {/* Content */}
              <div
                className="project-card-body"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <a
                    href={`#project/${proj.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleProjectClick(proj.id);
                    }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '0.35rem',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                    >
                      {proj.title}
                    </h3>
                  </a>

                  <p
                    style={{
                      color: 'var(--accent-cyan)',
                      fontSize: '0.92rem',
                      fontWeight: 500,
                      marginBottom: '1rem'
                    }}
                  >
                    {proj.subtitle}
                  </p>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {proj.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    {/* Primary Button: Open dedicated project page in current view */}
                    <a
                      href={`#project/${proj.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick(proj.id);
                      }}
                      className="btn btn-primary"
                      style={{
                        padding: '0.55rem 1.25rem',
                        fontSize: '0.88rem'
                      }}
                    >
                      <Sparkles size={16} />
                      <span>View Details</span>
                    </a>

                    {/* Open in New Tab Button */}
                    <a
                      href={`#project/${proj.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      title="Open detailed case study in new page / tab"
                      style={{
                        padding: '0.55rem 0.85rem',
                        fontSize: '0.88rem'
                      }}
                    >
                      <ExternalLink size={15} />
                    </a>

                    {/* GitHub Code link if available */}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{
                          padding: '0.55rem 1.1rem',
                          fontSize: '0.88rem'
                        }}
                      >
                        <GithubIcon size={16} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-card-body {
            padding: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  );
};
