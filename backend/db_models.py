from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    video_name = Column(String, nullable=False)
    location = Column(String, nullable=False)   # ✅ ADD THIS
    violence_type = Column(String)
    confidence = Column(Float)
    motion_score = Column(Float)
    pose_score = Column(Float)
    audio_alert = Column(Boolean)
    person_count = Column(Integer)
    evidence_clip = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
