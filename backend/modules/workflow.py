# modules/workflow.py
from modules.document_loader import load_document
from modules.text_processor import chunk_text
from modules.vector_db import create_vector_store, get_retriever

def process_document(file_path=None, url=None):
    docs = load_document(file_path, url)
    chunks = chunk_text(docs)
    vector_store = create_vector_store(chunks)
    return get_retriever(vector_store)
