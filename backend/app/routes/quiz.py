from fastapi import APIRouter
from pydantic import BaseModel
from app.services.quiz_generator import generate_quiz

router = APIRouter()

class QuizRequest(BaseModel):
    text: str

@router.post("/quiz")
def quiz(req: QuizRequest):
    result = generate_quiz(req.text)
    return {"quiz": result}