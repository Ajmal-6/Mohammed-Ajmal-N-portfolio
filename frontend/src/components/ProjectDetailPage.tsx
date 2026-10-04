import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Cpu, 
  Layers, 
  Code2, 
  Sparkles, 
  BrainCircuit, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
  onOpenChatWithQuery?: (query: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBack,
  onOpenChatWithQuery
}) => {
  const { projects } = PORTFOLIO_DATA;
  const project = projects.find((p) => p.id === projectId) || projects[0];
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Scroll to top on mount or project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 'calc(var(--nav-height) + 1.5rem)', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 1180 }}>
        {/* Navigation Bar / Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <button
            onClick={onBack}
            className="btn btn-outline"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ cursor: 'pointer', color: 'var(--accent-cyan)' }} onClick={onBack}>
              Portfolio
            </span>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
            <span style={{ color: '#fff', fontWeight: 500 }}>{project.title}</span>
          </div>
        </div>

        {/* Project Header Banner */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <span className="tag tag-cyan">{project.year}</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}
            >
              <Sparkles size={14} color="var(--accent-cyan)" />
              <span>Engineering Case Study &amp; Architecture Deep Dive</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '0.75rem',
              color: '#ffffff'
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--accent-cyan)',
              fontWeight: 500,
              marginBottom: '1.75rem',
              maxWidth: 820
            }}
          >
            {project.subtitle}
          </p>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2rem' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                <GithubIcon size={18} />
                <span>View Source Code</span>
                <ExternalLink size={14} style={{ marginLeft: 2 }} />
              </a>
            )}

            {onOpenChatWithQuery && (
              <button
                onClick={() => onOpenChatWithQuery(`Tell me about your project "${project.title}" and the technical architecture`)}
                className="btn btn-outline"
                style={{
                  padding: '0.65rem 1.4rem',
                  borderColor: 'rgba(0, 206, 201, 0.4)',
                  background: 'rgba(0, 206, 201, 0.08)',
                  color: 'var(--accent-cyan)'
                }}
              >
                <BrainCircuit size={18} color="var(--accent-cyan)" />
                <span>Ask AI About This Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Featured Main Image */}
        <div
          className="glass-card"
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '3.5rem',
            maxHeight: 520,
            background: '#090912',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 520,
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Two Column Layout: Main Case Study + Sidebar Specs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="project-grid"
        >
          {/* ================= LEFT / MAIN CONTENT ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Overview */}
            <div>
              <h2
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <Layers size={22} color="var(--accent-cyan)" />
                <span>Project Overview</span>
              </h2>
              <div
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <p>{project.fullDetails?.overview || project.description}</p>
                <p>{project.description}</p>
              </div>
            </div>

            {/* Key Technical Highlights */}
            {project.fullDetails?.highlights && (
              <div>
                <h2
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <Cpu size={22} color="var(--accent-purple)" />
                  <span>Key Technical Highlights</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {project.fullDetails.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="glass-card"
                      style={{
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem'
                      }}
                    >
                      <CheckCircle
                        size={20}
                        color="var(--accent-cyan)"
                        style={{ marginTop: '0.2rem', flexShrink: 0 }}
                      />
                      <span style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.7 }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development & Design Process */}
            {project.fullDetails?.process && (
              <div>
                <h2
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <Code2 size={22} color="var(--accent-cyan)" />
                  <span>Engineering Workflow &amp; Process</span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {project.fullDetails.process.map((step, i) => (
                    <div
                      key={step.title}
                      className="glass-card"
                      style={{
                        padding: '1.5rem',
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'var(--gradient-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#fff',
                          flexShrink: 0
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>
                          {step.title}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hardware & Prototype Visual Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <Sparkles size={22} color="var(--accent-cyan)" />
                  <span>Hardware &amp; Implementation Gallery</span>
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem'
                  }}
                >
                  {project.galleryImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="glass-card"
                      style={{
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        height: 190,
                        background: '#0a0a14'
                      }}
                      onClick={() => setSelectedGalleryImg(imgSrc)}
                    >
                      <img
                        src={imgSrc}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.08)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0.5rem',
                          right: '0.5rem',
                          background: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '6px',
                          padding: '0.3rem',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT / SIDEBAR SPECS ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Project Metadata Card */}
            <div
              className="glass-card project-spec-card"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fff',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.85rem'
                }}
              >
                Project Specification
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Timeline / Year
                  </span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{project.year}</span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Role
                  </span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    AI Engineer &amp; Developer
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Domain
                  </span>
                  <span style={{ color: '#fff' }}>
                    {project.id === 'av' ? 'Embedded AI & Computer Vision' : 'Deep Learning & Neural Networks'}
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Status
                  </span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>Completed &amp; Open Source</span>
                </div>
              </div>

              {/* Technologies */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.25rem' }}>
                <span
                  style={{
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem'
                  }}
                >
                  Technologies &amp; Tools
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {(project.fullDetails?.techStack || project.tags).map((tech) => (
                    <span key={tech} className="tag tag-cyan" style={{ fontSize: '0.76rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Button */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.92rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Quick Project Switcher */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
                Explore Other Projects
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {projects.map((p) => (
                  <a
                    key={p.id}
                    href={`#project/${p.id}`}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: p.id === project.id ? 'rgba(0, 206, 201, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: p.id === project.id ? '1px solid var(--border-cyan)' : '1px solid transparent',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ color: p.id === project.id ? 'var(--accent-cyan)' : '#fff', fontWeight: 600, fontSize: '0.92rem' }}>
                        {p.title}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {p.year} • {p.tags.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    <ArrowRight size={16} color={p.id === project.id ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination / Back Footer */}
        <div
          style={{
            marginTop: '4.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          {prevProject ? (
            <a
              href={`#project/${prevProject.id}`}
              className="btn btn-outline"
              style={{ gap: '0.5rem', fontSize: '0.88rem' }}
            >
              <ArrowLeft size={16} />
              <span>Previous: {prevProject.title}</span>
            </a>
          ) : (
            <div />
          )}

          <button onClick={onBack} className="btn btn-primary" style={{ padding: '0.65rem 1.75rem' }}>
            <span>Back to All Projects</span>
          </button>

          {nextProject ? (
            <a
              href={`#project/${nextProject.id}`}
              className="btn btn-outline"
              style={{ gap: '0.5rem', fontSize: '0.88rem' }}
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight size={16} />
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Lightbox / Image Zoom Modal for Gallery */}
      {selectedGalleryImg && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setSelectedGalleryImg(null)}
        >
          <img
            src={selectedGalleryImg}
            alt="Expanded view"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.9)',
              objectFit: 'contain'
            }}
          />
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .project-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .project-spec-card {
            padding: 1.35rem !important;
          }
        }
      `}</style>
    </div>
  );
};
