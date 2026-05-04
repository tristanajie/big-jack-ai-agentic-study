from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import summarize
from app.routes import qa
from app.routes import quiz

app = FastAPI(
    title="AI Study Assistant API",
    description="API for PDF-based Q&A, Quiz Generation, and Text Summarization",
    version="1.0.0"
)

app.include_router(quiz.router)
app.include_router(qa.router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(summarize.router, prefix="/api", tags=["summarize"])

@app.get("/")
def root():
    return {"message": "AI Study Assistant API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
