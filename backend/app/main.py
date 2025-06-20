from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import ping

app = FastAPI()

app.include_router(ping.router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)