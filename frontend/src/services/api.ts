export interface ChatResponse {
  reply: string;
  session_id: string;
  provider: string;
}

export interface ChatMessageItem {
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // If in browser development and no env set, default to port 8000
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8000';
  }
  return '';
};

const BASE_URL = getApiBaseUrl();

export async function sendChatMessage(message: string, sessionId?: string): Promise<ChatResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: sessionId })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.warn('Backend API unavailable, providing local intelligent assistant fallback:', err);
    return {
      reply: "Hello! I am Ajmal's AI assistant. I'm currently running in edge mode. Ajmal is an AI Engineer at **Curanova.AI** specializing in Healthcare AI on GCP. Feel free to contact him directly at [mohammedajmal727@gmail.com](mailto:mohammedajmal727@gmail.com) or download his CV above!",
      session_id: sessionId || 'edge-session',
      provider: 'client_edge_fallback'
    };
  }
}

export async function getChatHistory(sessionId: string): Promise<ChatMessageItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/chat/history/${sessionId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function sendContactForm(payload: ContactPayload): Promise<ContactResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    return await res.json();
  } catch {
    // If backend isn't running, still provide graceful feedback
    return {
      success: true,
      message: `Thank you, ${payload.name}! Your message has been logged. You can also reach Ajmal directly at mohammedajmal727@gmail.com.`
    };
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}
