# modules/processing.py
from langchain.schema.runnable import RunnablePassthrough

def create_summarization_chain(llm, prompt):
    return {"context": RunnablePassthrough()} | prompt | llm

def create_qa_chain(llm, prompt, retriever):
    return (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
    )
