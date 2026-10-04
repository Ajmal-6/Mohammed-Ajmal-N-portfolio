# Mohammed Ajmal N — Full-Stack AI Engineer Portfolio

A modern, full-stack AI and Data Science portfolio web application built with a **React + Vite + TypeScript** frontend, a live interactive **Neural Network Canvas Background**, a **FastAPI** personalized AI chatbot backend, and a **PostgreSQL** database (Supabase & Neon ready).

---

## 🏛️ System Architecture

- **Frontend**:
  - React + Vite + TypeScript
  - **Live Interactive Neural Network Theme**: 2D/3D canvas with nodes, synaptic connections, axon action potential signal pulses, and real-time mouse interaction.
  - Glassmorphism dark UI with neon cyber styling (`#6c5ce7`, `#00cec9`, `#a855f7`).
  - Interactive project detail modals, live typing hero role rotator, and floating AI assistant widget.
  - Deployable to **Firebase Hosting** (`https://mohammedajmal-n.web.app/`) and **Cloudflare Pages**.
- **Backend & Model**:
  - FastAPI Python backend exposing `/api/chat`, `/api/contact`, and `/api/health`.
  - **Personalized AI Engine**: Grounded on Mohammed Ajmal's verified profile (Healthcare AI at Curanova.AI, Google Health models on GCP, SSK Fellowship, KTU B.Tech in AI & Data Science, and autonomous vehicle/deep learning projects).
  - Secure server-side AI integration (Google Gemini / Hugging Face models) with an intelligent zero-cost offline semantic fallback engine.
  - Ready to deploy directly to **Hugging Face Spaces** (Free 16 GB RAM tier with Docker SDK) or any cloud container.
- **Database**:
  - PostgreSQL 16 for conversation history, session persistence, and contact inquiries.
  - Compatible with free cloud PostgreSQL providers (**Supabase** / **Neon**) via `DATABASE_URL`.
  - Automatic fallback to SQLite (`portfolio.db`) for standalone local development.
- **Docker Development**:
  - 3-container `docker-compose.yml` (`frontend`, `backend`, `db`) with hot reloading and healthchecks.

---

## 🚀 Quick Start with Docker (3 Containers)

Ensure Docker Desktop is running on your machine, then run:

```bash
# 1. Copy the environment template
cp .env.example .env

# 2. Build and launch all 3 containers
docker compose up --build
```

### Active Services:
- **Frontend App**: [http://localhost:5173](http://localhost:5173) (Vite HMR with Neural Background)
- **FastAPI Backend & Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **PostgreSQL Database**: `localhost:5432` (`portfolio_db`)

---

## 💻 Standalone Development (Without Docker)

You can also run both frontend and backend directly on your host machine:

### 1. Run the Backend:
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
> *Note: If a PostgreSQL server is not detected on port 5432, the backend automatically creates and uses `portfolio.db` (SQLite) so you can develop immediately without database friction.*

### 2. Run the Frontend:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173).

---

## 🌐 Production Deployment Guide

### 1. Frontend Deployment

#### Firebase Hosting (`https://mohammedajmal-n.web.app/`):
```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```
*`firebase.json` is already configured to deploy the optimized static bundle from `frontend/dist` with SPA routing.*

#### Cloudflare Pages:
- Connect your GitHub repository to Cloudflare Pages.
- **Build command**: `npm run build`
- **Build output directory**: `frontend/dist`
- **Environment variables**: `VITE_API_BASE_URL=https://<your-hf-space-or-api>.hf.space`

---

### 2. Backend Deployment on Hugging Face Spaces (Free 16 GB RAM Tier)

1. Create a new Space on [Hugging Face](https://huggingface.co/new-space).
2. Choose **Docker** as the Space SDK and set it to **Public**.
3. Push the contents of the `backend/` directory or link your repository to the space.
4. In your Space's **Settings > Variables and secrets**, add:
   - `DATABASE_URL`: Your Supabase or Neon PostgreSQL connection string.
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key.
   - `CORS_ORIGINS`: `https://mohammedajmal-n.web.app,https://mohammed.ajmaln.workers.dev,*`
5. Hugging Face will build the container and provide a free HTTPS URL: `https://<user>-<space-name>.hf.space`.

---

### 3. Database Setup (Supabase / Neon)

1. Create a free PostgreSQL database on [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
2. Copy the pooled or standard `DATABASE_URL` string (e.g., `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require`).
3. Set `DATABASE_URL` in your Hugging Face Space secrets or your local `.env`.
4. Tables (`chat_sessions`, `chat_messages`, `contact_inquiries`) are created automatically on first run.

---

## 🔒 Security Enhancements
- **No Client Keys**: All API keys and inference logic have been moved completely to the secure server backend.
- **CORS Protection**: Configurable allowed origins preventing unauthorized cross-origin requests.
- **Non-Root Docker User**: Backend container runs with UID 1000 for strict container isolation and Hugging Face compatibility.

---

## 👤 Author
**Mohammed Ajmal N**
- 💼 LinkedIn: [mohammed-ajmal-n-725649321](http://linkedin.com/in/mohammed-ajmal-n-725649321)
- 🐙 GitHub: [Ajmal-6](https://github.com/Ajmal-6)
- 📧 Email: [mohammedajmal727@gmail.com](mailto:mohammedajmal727@gmail.com)
