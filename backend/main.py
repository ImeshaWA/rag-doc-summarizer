# main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil

from modules.llm_integration import get_llm, get_summarization_prompt, get_qa_prompt
from modules.processing import create_summarization_chain, create_qa_chain
from modules.workflow import process_document

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

retriever = None

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    global retriever

    try:
        file_path = f"./temp/{file.filename}"
        os.makedirs("./temp", exist_ok=True)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        retriever = process_document(file_path=file_path)
        
        return {"filename": file.filename}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/summarize")
async def summarize():
    global retriever

    if not retriever:
        return JSONResponse(content={"error": "No document uploaded yet."}, status_code=400)

    try:
        docs = retriever.vectorstore._collection.get()["documents"]

        llm = get_llm()
        prompt = get_summarization_prompt()

        final_summary = ""  # Initialize empty summary

        for chunk in docs:
            context = f"Previous summary:\n{final_summary}\n\nNew chunk:\n{chunk}"
            chain = create_summarization_chain(llm, prompt)
            result = chain.invoke({"context": context})
            final_summary = result.content

        return {"summary": final_summary}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/ask")
async def ask_question(question: str = Form(...)):
    global retriever

    if not retriever:
        return JSONResponse(content={"error": "No document uploaded yet."}, status_code=400)

    try:
        llm = get_llm()
        prompt = get_qa_prompt()
        chain = create_qa_chain(llm, prompt, retriever)

        result = chain.invoke(question)
        return {"answer": result.content}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
