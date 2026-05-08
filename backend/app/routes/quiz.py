from fastapi import APIRouter
from pydantic import BaseModel
from app.services.quiz_generator import generate_quiz

router = APIRouter()

class QuizRequest(BaseModel):
    text: str

@router.post("/quiz")
def quiz(req: QuizRequest):
    if not req.text:
        return {"error": "Text cannot be empty"}
    
    try:
        result = generate_quiz(req.text)
        return {"quiz": result}
    except Exception as e:
        print(f"❌ Quiz Error: {str(e)}")
        return {"error": f"Failed to generate quiz: {str(e)}", "quiz": None}