import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.db.models import Base

logger = logging.getLogger(__name__)

def get_engine():
    db_url = settings.DATABASE_URL
    # For neon / supabase pooled connections with 'postgres://', fix to 'postgresql://'
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
        
    try:
        if "sqlite" in db_url:
            engine = create_engine(db_url, connect_args={"check_same_thread": False})
        else:
            engine = create_engine(db_url, pool_pre_ping=True)
            # Test quick connection
            with engine.connect() as conn:
                pass
        return engine
    except Exception as e:
        logger.warning(f"Could not connect to target database at {db_url}: {e}. Falling back to SQLite.")
        fallback_url = "sqlite:///./portfolio.db"
        return create_engine(fallback_url, connect_args={"check_same_thread": False})

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.error(f"Error initializing database tables: {e}")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
