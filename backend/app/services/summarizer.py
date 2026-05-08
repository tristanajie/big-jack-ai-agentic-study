from app.services.llm_service import call_llm

def summarize_text(text: str) -> str:
    # Truncate text jika terlalu panjang untuk menghindari token overflow
    max_chars = 10000
    truncated_text = text[:max_chars] if len(text) > max_chars else text
    
    prompt = f"""Summarize the following text into key points in English:

{truncated_text}

Provide a clear, concise summary with 5-10 main points."""

    return call_llm(prompt)