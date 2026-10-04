import re
import logging
from typing import Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are the personal AI assistant for Mohammed Ajmal N's portfolio website. 
Answer questions concisely, politely, and professionally in markdown format.

Here is the verified knowledge base about Mohammed Ajmal N:
- **Role**: AI Engineer specializing in Healthcare AI, Machine Learning, and Full Stack development.
- **Location**: Malappuram, Kerala, India (Available for projects, freelance, and full-time opportunities).
- **Current Role**: AI Engineer at **Curanova.AI** (Feb 2026 - Present):
  * Working on healthcare AI solutions, preprocessing medical datasets.
  * Utilizing Google Health models on Google Cloud Platform (GCP).
  * Ensuring high standards of patient data security, HIPAA compliance considerations, and scalable model optimization.
- **Previous Experience**:
  * **SSK Fellow — STEM Education Initiative** at **Kerala Startup Mission** (Jun 2025 - Jan 2026): Spearheaded Palakkad maker ecosystem, managed 3D printers and electronics lab, trained teachers & students in AI, IoT, and Robotics.
  * **Full Stack Developer Intern** at **Full Stack Developer Academy** (Jan 2025): Developed modern responsive websites.
  * **Machine Learning Intern** at **ATHARVO** (Sep 2024): Built machine learning NLP models for spam detection and classification.
- **Education**:
  * **B.Tech in Artificial Intelligence and Data Science** from Royal College of Engineering, Thrissur (APJ Abdul Kalam Technological University - KTU, 2021 - 2025).
  * **Higher Secondary (Computer Science)** (2019 - 2021).
  * **Achievements**: KTU-funded academic project (2025), International conference paper participant.
- **Key Projects**:
  1. **Self-Driving Vehicle Prototype (2025)**: Autonomous vehicle using Raspberry Pi, computer vision (OpenCV), CNN, obstacle detection, and lane following. GitHub: https://github.com/Ajmal-6/Automatic-vehicle-using-Raspberry-pi-
  2. **Image Colorization with Deep Learning (2024)**: Black & white to color restoration using CNN & Transfer Learning (TensorFlow). Achieved 25% improvement in realism over baseline.
- **Technical Skills**:
  * *Languages*: Python, Java, C, JavaScript, TypeScript, SQL, HTML, CSS.
  * *AI/ML*: PyTorch, TensorFlow, Scikit-learn, Keras, CNN, OpenCV, Deep Learning, NLP, Data Preprocessing.
  * *Cloud & Tools*: Google Cloud Platform (GCP), Google Health Models, Docker, Git, GitHub, Jupyter, Power BI.
  * *Web & Backend*: FastAPI, Django, Flask, React, RESTful APIs.
  * *Hardware/IoT*: Raspberry Pi, Embedded Systems, IoT.
- **Contact & Socials**:
  * Email: mohammmedajmal727@gmail.com
  * Phone: +91 7034689012
  * LinkedIn: http://linkedin.com/in/mohammed-ajmal-n-725649321
  * GitHub: https://github.com/Ajmal-6
  * Portfolio: https://mohammedajmal-n.web.app/

Always represent Ajmal in a positive, professional light and encourage collaboration or reaching out for opportunities!"""

class PersonalizedBotEngine:
    def __init__(self):
        self.gemini_model = None
        self._init_gemini()

    def _init_gemini(self):
        if settings.GEMINI_API_KEY:
            try:
                import google.generativeai as genai
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.gemini_model = genai.GenerativeModel(
                    model_name=settings.MODEL_NAME or "gemini-1.5-flash",
                    system_instruction=SYSTEM_PROMPT
                )
                logger.info("Initialized Google Gemini AI Engine successfully.")
            except Exception as e:
                logger.warning(f"Failed to initialize Gemini engine: {e}")
                self.gemini_model = None

    def query(self, message: str, chat_history: Optional[list] = None) -> str:
        # 1. Try Gemini API if key is configured
        if self.gemini_model:
            try:
                history_formatted = []
                if chat_history:
                    for h in chat_history[-6:]:
                        role = "user" if h.get("role") == "user" else "model"
                        history_formatted.append({"role": role, "parts": [h.get("content", "")]})
                
                chat = self.gemini_model.start_chat(history=history_formatted)
                resp = chat.send_message(message)
                if resp and resp.text:
                    return resp.text.strip()
            except Exception as e:
                logger.warning(f"Gemini API inference error: {e}. Falling back to offline engine.")

        # 2. Intelligent Offline Fallback Engine (Semantic Rule / Knowledge matching)
        return self._offline_response(message)

    def _offline_response(self, text: str) -> str:
        q = text.lower().strip()

        # Greetings
        if re.search(r"\b(hi|hello|hey|greetings|howdy|sup)\b", q):
            return (
                "Hello! 👋 I am **Mohammed Ajmal N's AI Assistant**.\n\n"
                "I can tell you about Ajmal's experience as an **AI Engineer at Curanova.AI**, his projects "
                "(such as the *Autonomous Vehicle Prototype* or *Deep Learning Image Colorizer*), skills in Python/PyTorch/GCP, or how to contact him for collaborations. What would you like to know?"
            )

        # Experience & Curanova.AI
        if re.search(r"\b(experience|work|curanova|job|career|ksum|kerala startup mission|fellow|intern)\b", q):
            return (
                "### Mohammed Ajmal N's Experience:\n\n"
                "1. **AI Engineer at Curanova.AI** *(Feb 2026 – Present)*\n"
                "   - Developing real-world **Healthcare AI** solutions.\n"
                "   - Processing medical datasets with custom AI pipelines.\n"
                "   - Deploying and utilizing **Google Health models on GCP** with secure patient data handling.\n\n"
                "2. **SSK Fellow — STEM Education** *(Jun 2025 – Jan 2026)* at Kerala Startup Mission\n"
                "   - Led maker space innovation, managed 3D printers, and trained educators and students in AI, IoT & Robotics.\n\n"
                "3. **Full Stack Developer Intern** at Full Stack Developer Academy *(Jan 2025)*\n"
                "4. **Machine Learning Intern** at ATHARVO *(Sep 2024)* — NLP & spam classification models."
            )

        # Healthcare AI / Curanova specific
        if re.search(r"\b(healthcare|medical|curanova\.ai|gcp|google health)\b", q):
            return (
                "At **Curanova.AI**, Ajmal works at the forefront of **Healthcare AI**.\n\n"
                "His focus includes:\n"
                "- Preprocessing and cleaning complex medical datasets using custom AI tools.\n"
                "- Integrating and fine-tuning **Google Health models** on Google Cloud Platform (GCP).\n"
                "- Adhering to strict patient data security standards for high-reliability medical workflows."
            )

        # Projects
        if re.search(r"\b(project|projects|vehicle|autonomous|self-driving|colorization|car|prototype)\b", q):
            return (
                "### Featured Projects:\n\n"
                "1. 🚗 **Self-Driving Vehicle Prototype (2025)**\n"
                "   - Built using **Raspberry Pi**, OpenCV, and CNNs.\n"
                "   - Features computer vision obstacle detection, real-time lane following, and path planning.\n"
                "   - [View on GitHub](https://github.com/Ajmal-6/Automatic-vehicle-using-Raspberry-pi-)\n\n"
                "2. 🎨 **Image Colorization with Deep Learning (2024)**\n"
                "   - CNN and Transfer Learning architecture built in TensorFlow to restore color to black-and-white photos.\n"
                "   - Achieved a **25% accuracy improvement** over baseline historical restoration models."
            )

        # Skills & Tech Stack
        if re.search(r"\b(skill|skills|tech|technologies|languages|frameworks|tools|stack|python|pytorch|tensorflow)\b", q):
            return (
                "### Technical Skill Highlights:\n\n"
                "- **Core AI & ML**: PyTorch, TensorFlow, Scikit-learn, Keras, CNN, Computer Vision (OpenCV), NLP, Deep Learning.\n"
                "- **Programming Languages**: Python, Java, C, JavaScript, TypeScript, SQL, HTML/CSS.\n"
                "- **Cloud & Deployment**: Google Cloud Platform (GCP), Google Health Models, Docker, Git, GitHub.\n"
                "- **Web Frameworks**: FastAPI, Django, Flask, React.\n"
                "- **Embedded Systems / IoT**: Raspberry Pi, Sensors, Robotics."
            )

        # Education
        if re.search(r"\b(education|degree|college|university|ktu|study|school|btech|b\.tech)\b", q):
            return (
                "### Education:\n\n"
                "🎓 **B.Tech in Artificial Intelligence & Data Science** (2021 – 2025)\n"
                "- Royal College of Engineering, Thrissur (APJ Abdul Kalam Technological University - KTU).\n"
                "- Academic project funded by KTU (2025) and participated in international technical conferences.\n\n"
                "🏫 **Higher Secondary — Computer Science** (2019 – 2021)"
            )

        # Contact & Hire
        if re.search(r"\b(contact|hire|email|phone|call|reach|linkedin|github|touch|location|message)\b", q):
            return (
                "### Get In Touch with Mohammed Ajmal N:\n\n"
                "- 📧 **Email**: [mohammedajmal727@gmail.com](mailto:mohammedajmal727@gmail.com)\n"
                "- 📞 **Phone**: [+91 7034689012](tel:+917034689012)\n"
                "- 💼 **LinkedIn**: [mohammed-ajmal-n-725649321](http://linkedin.com/in/mohammed-ajmal-n-725649321)\n"
                "- 🐙 **GitHub**: [github.com/Ajmal-6](https://github.com/Ajmal-6)\n"
                "- 📍 **Location**: Malappuram, Kerala, India\n\n"
                "You can also use the contact form right on this website to send a direct message!"
            )

        # Resume / CV
        if re.search(r"\b(resume|cv|download|document)\b", q):
            return (
                "You can download Mohammed Ajmal's updated CV directly using the **Download CV** button in the hero section or by accessing `/files/AjmalN.pdf` on the portfolio!"
            )

        # Default catch-all
        return (
            "Mohammed Ajmal N is an **AI Engineer** specializing in Healthcare AI at **Curanova.AI**, with a B.Tech in AI & Data Science from KTU. "
            "His expertise spans deep learning (CNNs, PyTorch, TensorFlow), GCP, autonomous systems, and full-stack solutions.\n\n"
            "Would you like details on his **experience**, **projects**, **skills**, or **contact info**?"
        )

bot_engine = PersonalizedBotEngine()
