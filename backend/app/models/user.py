from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True,  index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    mood_entries = relationship("MoodEntry", back_populates="user")