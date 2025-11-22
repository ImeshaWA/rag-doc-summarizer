# modules/vector_db.py
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings  
def create_vector_store(chunks, persist_directory="./chroma_db"):
    embeddings = OllamaEmbeddings(model="nomic-embed-text")  
    return Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=persist_directory
    )

def get_retriever(vector_store, k=4):
    return vector_store.as_retriever(search_kwargs={"k": k})
