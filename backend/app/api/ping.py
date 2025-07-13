from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def ping():
    return {"message": "The connection is healthy!!!"}