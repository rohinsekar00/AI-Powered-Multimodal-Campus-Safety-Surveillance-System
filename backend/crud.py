from sqlalchemy.orm import Session
from db_models import Incident


def create_incident(
    db: Session,
    video_name: str,
    location: str,          # ✅ ADDED
    violence_type: str,
    confidence: float,
    motion_score: float,
    pose_score: float,
    audio_alert: bool,
    person_count: int,
    evidence_clip: str
):
    incident = Incident(
        video_name=video_name,
        location=location,   # ✅ ADDED
        violence_type=violence_type,
        confidence=confidence,
        motion_score=motion_score,
        pose_score=pose_score,
        audio_alert=audio_alert,
        person_count=person_count,
        evidence_clip=evidence_clip
    )
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return incident


# ✅ GET ALL INCIDENTS (LATEST FIRST)
def get_all_incidents(db: Session):
    return db.query(Incident).order_by(Incident.id.desc()).all()
