import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    raise ValueError(
        "❌ OPENROUTER_API_KEY tidak dikonfigurasi!\n"
        "Langkah:\n"
        "1. Edit file .env di folder backend\n"
        "2. Masukkan API key dari https://openrouter.ai/keys\n"
        "3. Restart server"
    )

# Initialize OpenRouter client (kompatibel dengan OpenAI SDK)
client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1"
)

def call_llm(prompt: str) -> str:
    """Call OpenRouter LLM with the given prompt"""
    try:
        model = os.getenv("LLM_MODEL", "openai/gpt-3.5-turbo")
        
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful study assistant. Always respond in English."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"⚠️ LLM Error: {str(e)}")
        raise RuntimeError("Gagal memproses permintaan ke LLM. Coba lagi nanti.")