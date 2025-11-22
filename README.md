# AI Document Summarizer & Chatbot (100% Local & Private)

A beautiful, offline AI that can summarize and chat with your PDF/DOCX files using Ollama.

## Features
- Upload PDF/DOCX
- Instant AI summary
- Chat with your document
- 100% private – runs on your laptop
- No API keys, no internet needed

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI + LangChain + Ollama + ChromaDB

## How to Run

### 1. Start Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload