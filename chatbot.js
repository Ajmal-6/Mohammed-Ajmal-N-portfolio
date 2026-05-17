import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyA4qMfHqT8nijq-9EeiRfZlPWIgawr50rY";
const genAI = new GoogleGenerativeAI(API_KEY);

const systemInstruction = `You are the AI assistant for Mohammed Ajmal N's portfolio website. Answer questions concisely, politely, and professionally. Use Markdown for formatting if needed.
Here is the information you know about Mohammed Ajmal N:
- Role: AI Engineer specializing in Healthcare AI and Full Stack development.
- Location: Malappuram, Kerala. Available for projects.
- Education: B.Tech in Artificial Intelligence and Data Science from APJ Kalam Technological University (2021-2025). Also has a Higher Secondary Education in Computer Science (2019-2021).
- Skills: Python, Java, C, HTML, CSS, JavaScript, TensorFlow, PyTorch, Scikit-learn, Keras, Computer Vision, Deep Learning, CNN, GCP (Google Cloud Platform), Django, Flask, REST APIs, Embedded Systems, Raspberry Pi, Data Pipelines.
- Experience:
  1. AI Engineer at Curanova.AI (Feb 2026 - Present): Working on healthcare AI solutions, data preprocessing, and Google Health models on GCP.
  2. SSK Fellow at Kerala Startup Mission (Jun 2025 - Jan 2026): Spearheaded STEM education initiatives in Palakkad, taught AI/IoT/Robotics.
  3. Full Stack Developer Intern at Full Stack Developer Academy (Jan 2025).
  4. Machine Learning Intern at ATHARVO (Sep 2024).
- Projects:
  1. Self-Driving Vehicle Prototype (2025): Autonomous navigation using Raspberry Pi, computer vision, obstacle detection, and lane following.
  2. Image Colorization with Deep Learning (2024): Built CNN architecture to automatically colorize black and white images.
- Contact Info: Email: mohammmedajmal727@gmail.com, Phone: +91 7034689012.
- Links: GitHub: https://github.com/Ajmal-6, LinkedIn: http://linkedin.com/in/mohammed-ajmal-n-725649321
If a user asks a question, answer it based ONLY on this information. If you don't know, say you don't have that information but they can contact him at mohammmedajmal727@gmail.com. Always encourage the user to hire or collaborate with Ajmal.`;

// Initialize the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Fast and capable model
  systemInstruction: systemInstruction,
});

let chatSession = null;

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const inputEl = document.getElementById('chatbot-text');
  const messagesEl = document.getElementById('chatbot-messages');
  const typingIndicator = document.getElementById('chatbot-typing');

  // Start chat session
  chatSession = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    }
  });

  // Toggle chatbot
  toggleBtn.addEventListener('click', () => {
    windowEl.classList.toggle('d-none');
    if (!windowEl.classList.contains('d-none')) {
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.add('d-none');
  });

  function addMessage(text, isBot) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chatbot-message');
    msgDiv.classList.add(isBot ? 'bot-message' : 'user-message');
    // Basic markdown bold parsing for better formatting
    msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messagesEl.insertBefore(msgDiv, typingIndicator);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, false);
    inputEl.value = '';
    
    // Show typing
    typingIndicator.style.display = 'block';
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const result = await chatSession.sendMessage(text);
      const response = await result.response;
      const responseText = response.text();
      
      typingIndicator.style.display = 'none';
      addMessage(responseText, true);
    } catch (error) {
      console.error("Chatbot error:", error);
      typingIndicator.style.display = 'none';
      addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", true);
    }
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});
