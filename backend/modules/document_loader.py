# modules/document_loader.py
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, WebBaseLoader
from typing import Union

def load_document(file_path: str = None, url: str = None) -> Union[str, None]:
    if file_path:
        if file_path.endswith('.pdf'):
            loader = PyPDFLoader(file_path)
        elif file_path.endswith('.docx'):
            loader = Docx2txtLoader(file_path)
        else:
            raise ValueError("Unsupported file format")
        return loader.load()
    elif url:
        loader = WebBaseLoader(url)
        return loader.load()

    return None
