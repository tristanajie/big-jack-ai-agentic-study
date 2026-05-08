import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    raise ValueError(
        "OPENROUTER_API_KEY tidak dikonfigurasi!\n"
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
        print(f"Using model: {model}")
        print(f"API Key set: {bool(api_key)}")
        
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful study assistant. Respond concisely."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=4000
        )
        
        print(f"Response received")
        print(f"   - finish_reason: {response.choices[0].finish_reason}")
        
        content = response.choices[0].message.content
        if content is None:
            print("LLM returned None content!")
            # Fallback ke reasoning jika ada
            if hasattr(response.choices[0].message, 'reasoning') and response.choices[0].message.reasoning:
                print("Using reasoning as fallback content")
                content = response.choices[0].message.reasoning[:1000]  # Return first 1000 chars of reasoning
            else:
                raise ValueError("LLM response content is None and no reasoning available")
        
        return content
    except Exception as e:
        print(f"LLM Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise RuntimeError(f"Gagal memproses permintaan ke LLM: {str(e)}")