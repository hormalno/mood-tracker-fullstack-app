from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def ping():
    return {"message": "The connection is healthy!!!"}