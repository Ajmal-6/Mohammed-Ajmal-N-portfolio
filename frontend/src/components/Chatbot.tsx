import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getChatHistory } from '../services/api';
import { BrainCircuit, X, Send, User, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Suggested prompts
  const suggestedQuestions = [
    'What do you do at Curanova.AI?',
    'Tell me about your Autonomous Vehicle project',
    'What are your top machine learning skills?',
    'How can I get in touch to collaborate?'
  ];

  // Initialize session ID
  useEffect(() => {
    let sid = localStorage.getItem('ajmal_portfolio_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('ajmal_portfolio_session_id', sid);
    }
    setSessionId(sid);

    // Initial message
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Hello! 👋 I am **Mohammed Ajmal N's AI Assistant**.\n\nAsk me anything about Ajmal's work in **Healthcare AI at Curanova.AI**, his **deep learning & autonomous vehicle projects**, education at KTU, or how to collaborate with him!"
      }
    ]);

    // Attempt to load past session messages from backend if any
    getChatHistory(sid).then((history) => {
      if (history && history.length > 0) {
        const mapped = history.map((h, i) => ({
          id: `hist_${i}`,
          role: h.role,
          content: h.content
        }));
        setMessages(mapped);
      }
    });
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsgId = 'msg_' + Date.now();
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: 'user', content: text }
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage(text, sessionId);
      setMessages([
        ...newMessages,
        { id: 'bot_' + Date.now(), role: 'assistant', content: res.reply }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: "Sorry, I couldn't reach the model right now. You can email Ajmal directly at mohammedajmal727@gmail.com."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    const newSid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('ajmal_portfolio_session_id', newSid);
    setSessionId(newSid);
    setMessages([
      {
        id: 'welcome_' + Date.now(),
        role: 'assistant',
        content: "Chat session refreshed! How can I help you learn more about Ajmal's AI engineering work?"
      }
    ]);
  };

  const renderFormattedText = (text: string) => {
    // Basic Markdown formatting helper for bold, bullet points, and links
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold replace
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Link replace
      formatted = formatted.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #00cec9; text-decoration: underline;">$1</a>'
      );

      return (
        <span
          key={idx}
          style={{ display: 'block', minHeight: line.trim() === '' ? '0.6rem' : 'auto' }}
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button with Professional AI Emblem */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className="chatbot-trigger-btn"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 90,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.45), 0 0 20px rgba(6, 182, 212, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(6, 182, 212, 0.6), 0 0 25px rgba(139, 92, 246, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.45), 0 0 20px rgba(6, 182, 212, 0.3)';
        }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrainCircuit size={26} strokeWidth={2.2} />
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }}
            />
          </div>
        )}
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className="chatbot-modal"
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '2rem',
            zIndex: 95,
            width: 'min(420px, calc(100vw - 2rem))',
            height: 'min(580px, calc(100vh - 7rem))',
            background: 'rgba(12, 12, 22, 0.96)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(124, 58, 237, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.25s ease-out'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'rgba(18, 18, 32, 0.9)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)'
                }}
              >
                <BrainCircuit size={18} color="#fff" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', margin: 0 }}>
                  Ajmal's AI Assistant
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="neural-pulse-dot" style={{ width: 6, height: 6 }}></span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                    Personalized Knowledge Base
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close chat"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    gap: '0.65rem',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isUser ? 'rgba(0, 206, 201, 0.2)' : 'rgba(108, 92, 231, 0.2)',
                      border: `1px solid ${isUser ? 'var(--accent-cyan)' : 'var(--accent-purple)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {isUser ? <User size={14} color="var(--accent-cyan)" /> : <BrainCircuit size={14} color="var(--accent-purple)" />}
                  </div>

                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '0.75rem 1rem',
                      borderRadius: '14px',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      background: isUser ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      border: isUser ? 'none' : '1px solid var(--border-color)',
                      boxShadow: isUser ? '0 4px 15px rgba(108, 92, 231, 0.25)' : 'none'
                    }}
                  >
                    {renderFormattedText(m.content)}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(108, 92, 231, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <BrainCircuit size={14} color="var(--accent-purple)" />
                </div>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Analyzing query...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: '0 1rem 0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem'
              }}
            >
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(108, 92, 231, 0.3)',
                    color: '#c4b5fd',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(108, 92, 231, 0.3)';
                    e.currentTarget.style.color = '#c4b5fd';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'rgba(16, 16, 28, 0.95)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about Mohammed Ajmal N..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem 1rem',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.6 : 1,
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .chatbot-trigger-btn {
            bottom: 1.25rem !important;
            right: 1.25rem !important;
            width: 52px !important;
            height: 52px !important;
          }
          .chatbot-modal {
            bottom: 1rem !important;
            right: 0.75rem !important;
            left: 0.75rem !important;
            width: auto !important;
            max-width: calc(100vw - 1.5rem) !important;
            height: calc(100vh - 2rem) !important;
            max-height: 94vh !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </>
  );
};
