from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.auth.auth import get_current_user
from app.core.db import SessionLocal
from app.schemas import mood as mood_schemas
from app.crud import mood as mood_crud
from app.models.user import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=mood_schemas.MoodRead)
def add_mood(mood: mood_schemas.MoodCreate, db: Session = Depends(get_db),
             current_user: User = Depends(get_current_user)):
    existing = mood_crud.get_mood_by_date(db, current_user.id, mood.date)
    if existing:
        raise HTTPException(status_code=400, detail="Mood for this date already exists")
    return mood_crud.create_mood(db, mood, current_user.id)

@router.get("/{mood_date}", response_model=mood_schemas.MoodRead)
def read_mood(mood_date: date, db: Session = Depends(get_db),
              current_user: User = Depends(get_current_user)):
    db_mood = mood_crud.get_mood_by_date(db, current_user.id, mood_date)
    if not db_mood:
        raise HTTPException(status_code=404, detail="Mood not found for this date")
    return db_mood

@router.get("/", response_model=List[mood_schemas.MoodRead])
def read_all_moods(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return mood_crud.get_all_moods(db, current_user.id)
