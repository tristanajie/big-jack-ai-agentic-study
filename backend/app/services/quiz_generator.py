from app.services.llm_service import call_llm

def generate_quiz(text: str) -> str:
    prompt = f"""
    Buat 3 soal pilihan ganda dari materi berikut.
    Sertakan jawaban yang benar.

    {text}
    """

    return call_llm(prompt)