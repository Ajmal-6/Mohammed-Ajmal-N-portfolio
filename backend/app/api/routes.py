import uuid
import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import ChatSession, ChatMessage, ContactInquiry
from app.core.bot_engine import bot_engine
from app.core.config import settings

router = APIRouter(prefix="/api", tags=["API"])

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    session_id: str
    provider: str

class MessageHistoryItem(BaseModel):
    role: str
    content: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

@router.post("/chat", response_model=ChatResponse)
def handle_chat(req: ChatRequest, db: Session = Depends(get_db)):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    session_id = req.session_id or str(uuid.uuid4())

    # Ensure session exists
    session_obj = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
    if not session_obj:
        session_obj = ChatSession(session_id=session_id)
        db.add(session_obj)
        db.commit()
        db.refresh(session_obj)

    # Fetch recent history
    recent_msgs = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.desc())
        .limit(6)
        .all()
    )
    history_list = [{"role": m.role, "content": m.content} for m in reversed(recent_msgs)]

    # Store user query
    user_msg_record = ChatMessage(session_id=session_id, role="user", content=req.message)
    db.add(user_msg_record)

    # Generate response
    reply_text = bot_engine.query(req.message, chat_history=history_list)

    # Store assistant reply
    bot_msg_record = ChatMessage(session_id=session_id, role="assistant", content=reply_text)
    db.add(bot_msg_record)
    db.commit()

    provider_name = "gemini" if bot_engine.gemini_model else "offline_knowledge_engine"
    return ChatResponse(reply=reply_text, session_id=session_id, provider=provider_name)

@router.get("/chat/history/{session_id}", response_model=List[MessageHistoryItem])
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
    return messages

@router.post("/contact", response_model=ContactResponse)
def submit_contact(req: ContactRequest, db: Session = Depends(get_db)):
    inquiry = ContactInquiry(
        name=req.name,
        email=req.email,
        subject=req.subject,
        message=req.message
    )
    db.add(inquiry)
    db.commit()
    return ContactResponse(
        success=True,
        message=f"Thank you, {req.name}! Your message has been sent successfully to Mohammed Ajmal."
    )

@router.get("/health")
def health_check():
    provider = "gemini" if bot_engine.gemini_model else "offline_knowledge_engine"
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "ai_provider": provider,
        "environment": settings.ENVIRONMENT
    }
