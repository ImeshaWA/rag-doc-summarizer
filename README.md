# AI Document Summarizer & Chatbot  
**100% Local • Fully Private • Offline • No API Keys Needed**

A beautiful, modern web application that lets you:
- Upload PDF or DOCX files
- Get instant, high-quality AI summaries
- Chat with your document (ask any question — the AI answers only from your file)

Everything runs locally using **Ollama** — your documents never leave your computer!

## Live Preview (Screenshots)
<img src="https://raw.githubusercontent.com/ImeshaWA/rag-doc-summarizer/main/screenshot.png" alt="App Preview" width="100%"/>

*(Drag a screenshot of your app here later — GitHub will auto-upload it)*

## Features
- Instant AI-powered summaries (even for 100+ page documents)
- Interactive chat with your document (RAG)
- Beautiful modern UI with animations, typing indicator, drag & drop
- Supports PDF & DOCX
- Works with free local models (Mistral, Llama3, Phi3, Gemma2, etc.)
- 100% private & offline — no data sent to the cloud
- Progressive (iterative) summarization technique

## Tech Stack
**Frontend**
- React 19 + Vite
- Tailwind CSS
- React Icons

**Backend**
- FastAPI (Python)
- LangChain
- Ollama (local LLMs)
- ChromaDB (local vector database)
- nomic-embed-text (embedding model)

## How to Run (Less than 5 Minutes)

### 1. Install Prerequisites
- [Ollama](https://ollama.com) → Download & install
- Node.js (v20 or higher)
- Python 3.10+

### 2. Download Required Models (one time only)

ollama pull mistral          # or llama3, phi3, gemma2
ollama pull nomic-embed-text
