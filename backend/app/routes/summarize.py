from fastapi import APIRouter
from pydantic import BaseModel
from app.services.summarizer import summarize_text
from app.routes.upload import document_store

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/summarize")
def summarize():
    text = document_store.get("content", "")

    if not text:
        return {"error": "No document uploaded"}

    try:
        result = summarize_text(text)
        return {"summary": result}
    except Exception as e:
        print(f"❌ Summarize Error: {str(e)}")
        return {"error": f"Failed to summarize: {str(e)}", "summary": None}