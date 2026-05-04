from fastapi import APIRouter
from pydantic import BaseModel
from app.services.qa_engine import answer_question

router = APIRouter()

class QARequest(BaseModel):
    context: str
    question: str

@router.post("/qa")
def qa(req: QARequest):
    answer = answer_question(req.context, req.question)
    return {"answer": answer}