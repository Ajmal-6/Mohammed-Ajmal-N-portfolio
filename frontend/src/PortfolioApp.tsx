import React, { useState, useEffect } from 'react';
import './portfolio.css';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { ProjectDetailPage } from './components/ProjectDetailPage';

export const PortfolioApp: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Determine current view from hash: #project/:id -> 'project', else 'home'
  const getProjectIdFromHash = (): string | null => {
    const hash = window.location.hash;
    if (hash.startsWith('#project/')) {
      return hash.replace('#project/', '');
    }
    return null;
  };

  const [activeProjectId, setActiveProjectId] = useState<string | null>(getProjectIdFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const pId = getProjectIdFromHash();
      setActiveProjectId(pId);
      if (pId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (projectId: string) => {
    window.location.hash = `#project/${projectId}`;
    setActiveProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    window.location.hash = '#projects';
    setActiveProjectId(null);
    setTimeout(() => {
      const projEl = document.getElementById('projects');
      if (projEl) {
        projEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenChatWithQuery = () => {
    setIsChatOpen(true);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden', background: '#07070e', color: '#f8f8fc' }}>
      {/* 1. Live Interactive Neural Network Canvas Background (zIndex: 0) */}
      <NeuralBackground />

      {/* 2. Content Layer (zIndex: 1) with pointer-events auto */}
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto' }}>
        <Navbar onOpenChat={() => setIsChatOpen(true)} />

        <main>
          {activeProjectId ? (
            /* Dedicated Project Detail Page View */
            <ProjectDetailPage
              projectId={activeProjectId}
              onBack={handleBackToProjects}
              onOpenChatWithQuery={handleOpenChatWithQuery}
            />
          ) : (
            /* Full Portfolio View with Merged Landing & About */
            <>
              <LandingHero onOpenChat={() => setIsChatOpen(true)} />
              <Experience />
              <Skills />
              <Projects onSelectProject={handleSelectProject} />
              <Education />
              <Contact />
            </>
          )}
        </main>

        <Footer />
      </div>

      {/* 3. Floating Personalized AI Chatbot Widget (zIndex: 90+) */}
      <Chatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default PortfolioApp;
