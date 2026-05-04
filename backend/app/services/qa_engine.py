from app.services.llm_service import call_llm

def answer_question(context: str, question: str) -> str:
    prompt = f"""
    Berdasarkan materi berikut:
    {context}

    Jawab pertanyaan ini dengan jelas:
    {question}
    """

    return call_llm(prompt)