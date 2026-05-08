from app.services.llm_service import call_llm

def generate_quiz(text: str) -> str:
    # Truncate text untuk avoid token overflow
    max_chars = 8000
    truncated_text = text[:max_chars] if len(text) > max_chars else text
    
    prompt = f"""Generate 3 multiple-choice questions from the following material. Include correct answers in English:

{truncated_text}"""

    return call_llm(prompt)