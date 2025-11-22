# Import the Modules
import streamlit as st
import tempfile
from modules.workflow import process_document
from modules.llm_integration import get_llm, get_summarization_prompt, get_qa_prompt
from modules.processing import create_summarization_chain, create_qa_chain

# Streamlit Title
st.title("📄 Document AI Assistant")

# Upload Interface
uploaded_file = st.file_uploader("📤 Upload document", type=["pdf", "docx"])
url = st.text_input("🔗 Or enter URL")

retriever = None

# Process the Document
if uploaded_file or url:
    with st.spinner("⚙️ Processing document..."):

        file_path = None

        if uploaded_file:
            # Save the uploaded file to a temporary location
            with tempfile.NamedTemporaryFile(delete=False, suffix=f".{uploaded_file.name.split('.')[-1]}") as tmp:
                tmp.write(uploaded_file.read())
                file_path = tmp.name

        retriever = process_document(
            file_path=file_path,
            url=url if url else None
        )

    st.success("✅ Document processed!")

# Setup LLM
llm = get_llm()

# Summarization Button
if retriever and st.button("📝 Generate Summary"):
    summary_chain = create_summarization_chain(llm, get_summarization_prompt())

    docs = retriever.get_relevant_documents("")
    summary = summary_chain.invoke(docs)

    st.subheader("📚 Summary")

    # Try to safely display the content
    if isinstance(summary, str):
        st.write(summary)
    elif isinstance(summary, dict):
        st.write(summary.get("content", summary))
    elif hasattr(summary, 'content'):
        st.write(summary.content)
    else:
        st.write(summary)  # Fallback


    #summary = summary_chain.invoke(retriever.get_relevant_documents(""))
    #st.subheader("📚 Summary")
    #st.write(summary.content)

# Q&A Input Box
if retriever:
    question = st.text_input("❓ Ask a question about the document")
    if question:
        qa_chain = create_qa_chain(llm, get_qa_prompt(), retriever)
        answer = qa_chain.invoke(question)
        st.subheader("💬 Answer")
        st.write(answer.content)
