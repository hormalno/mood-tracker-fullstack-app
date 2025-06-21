from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mood Tracker API"
    API_V1_STR: str = "/api"
    ALLOWED_ORIGINS: Union[str, List[str]] = ""
    DATABASE_URL: str
    SECRET_KEY: str = "dev-secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DEBUG: bool = False

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def split_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",")]
        return value

settings = Settings()
print("DATABASE_URL from config:", settings.DATABASE_URL)