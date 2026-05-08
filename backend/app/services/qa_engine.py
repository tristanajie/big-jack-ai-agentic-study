from app.services.llm_service import call_llm

def answer_question(context: str, question: str) -> str:
    # Truncate context untuk avoid token overflow
    max_chars = 8000
    truncated_context = context[:max_chars] if len(context) > max_chars else context
    
    prompt = f"""Based on the following material, answer this question clearly in English:

Material:
{truncated_context}

Question: {question}"""

    return call_llm(prompt)