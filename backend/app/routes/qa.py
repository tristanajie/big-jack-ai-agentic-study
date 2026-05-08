from fastapi import APIRouter
from pydantic import BaseModel
from app.services.qa_engine import answer_question
from app.routes.upload import document_store

router = APIRouter()

class QARequest(BaseModel):
    context: str
    question: str

@router.post("/qa")
def qa(req: QARequest):
    context = document_store.get("content", "")

    if not context:
        return {"error": "No document uploaded"}
    
    if not req.question:
        return {"error": "Question cannot be empty"}

    try:
        answer = answer_question(context, req.question)
        return {"answer": answer}
    except Exception as e:
        print(f"❌ QA Error: {str(e)}")
        return {"error": f"Failed to generate answer: {str(e)}", "answer": None}