from datetime import date
from typing import Optional

from pydantic import BaseModel


class MoodCreate(BaseModel):
    date: date
    mood: str
    note: Optional[str] = None

class MoodRead(BaseModel):
    id: int
    user_id: int

    class Config:
        orm_mode = True