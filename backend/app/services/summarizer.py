from app.services.llm_service import call_llm

def summarize_text(text: str) -> str:
    prompt = f"""
    Ringkas materi berikut menjadi poin-poin penting yang mudah dipahami:

    {text}
    """

    return call_llm(prompt)