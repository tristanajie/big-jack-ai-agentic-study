from fastapi import APIRouter
from pydantic import BaseModel
from app.services.summarizer import summarize_text

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/summarize")
def summarize(req: TextRequest):
    result = summarize_text(req.text)
    return {"summary": result}