from sqlalchemy import Column, Integer, Date, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.db import Base

class MoodEntry(Base):
    __tablename__ = "mood_entries"
    __table_args__ = (
        UniqueConstraint("user_id", "date", name="unique_user_date")
    )

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    mood = Column(String, nullable=False)
    note = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="mood_entries")