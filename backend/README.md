---
title: Mohammed Ajmal N Portfolio AI Backend
emoji: 🧠
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
---

# Mohammed Ajmal N — AI Portfolio Backend & Personalized Assistant

FastAPI powered backend with personalized AI chatbot, PostgreSQL database integration (Supabase/Neon ready), and containerized for deployment on Hugging Face Spaces or Docker.

## Endpoints:
- `POST /api/chat` - Chat with personalized AI model about Ajmal's skills, experience & projects
- `GET /api/chat/history/{session_id}` - Retrieve past session messages
- `POST /api/contact` - Submit contact inquiry (stored in PostgreSQL)
- `GET /api/health` - Health status and active AI provider info
