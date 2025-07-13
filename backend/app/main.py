from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import mood, user, ping
from app.core.db import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    debug=settings.DEBUG
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mood.router, prefix=f"{settings.API_V1_STR}/mood", tags=["Mood"])
app.include_router(user.router, prefix=f"{settings.API_V1_STR}/user", tags=["User"])
app.include_router(ping.router, prefix=f"{settings.API_V1_STR}/health", tags=["Ping"])