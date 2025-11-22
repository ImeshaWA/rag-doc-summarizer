# modules/llm_integration.py
from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate

def get_llm(model="mistral", temperature=0):
    # No need for API keys with Ollama
    return ChatOllama(model=model, temperature=temperature)

def get_summarization_prompt():
    return ChatPromptTemplate.from_template(
        "Summarize this document:\n\n{context}\n\nSummary:"
    )

def get_qa_prompt():
    return ChatPromptTemplate.from_template(
        "Answer the question based only on the following context:\n\n{context}\n\nQuestion: {question}\n\nAnswer:"
    )
