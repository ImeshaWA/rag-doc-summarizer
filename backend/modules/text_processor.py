# modules/text_processor.py
from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunk_text(docs, chunk_size=1000, chunk_overlap=200):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    return text_splitter.split_documents(docs)
