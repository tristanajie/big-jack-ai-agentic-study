from fastapi import APIRouter, UploadFile, File
from app.services.pdf_parser import extract_text_from_pdf

router = APIRouter()

# temporary in-memory storage
document_store = {
    "content": ""
}

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # validasi sederhana
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are allowed"}

    # extract text
    extracted_text = extract_text_from_pdf(file.file)

    # simpan sementara
    document_store["content"] = extracted_text

    return {
        "message": "PDF uploaded successfully",
        "characters": len(extracted_text),
        "preview": extracted_text[:500]
    }