from datetime import date
from sqlalchemy.orm import Session
from app.models.mood import MoodEntry
from app.schemas.mood import MoodCreate


def create_mood(db: Session, mood: MoodCreate, user_id: int):
    db_mood = MoodEntry(date=mood.date, mood = mood.mood, note=mood.note, user_id=user_id)
    db.add(db_mood)
    db.commit()
    db.refresh(db_mood)
    return db_mood

def get_mood_by_date(db: Session, user_id: int, mood_date: date):
    return db.query(MoodEntry).filter(
        user_id == MoodEntry.user_id,
        mood_date == MoodEntry.date
    ).first()

def get_all_moods(db: Session, user_id: int):
    return db.query(MoodEntry).filter(user_id == MoodEntry.user_id).all()