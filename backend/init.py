import glob
from db.vector_store import ElasticsearchVectorStore
from process.process_ocr import OCREngine
from llama_index.core import (
    SimpleDirectoryReader,
    load_index_from_storage,
    VectorStoreIndex,
    StorageContext,
    Document
)
from llama_index.vector_stores.faiss import FaissVectorStore
import faiss
import os, asyncio
from llama_index.core import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from utils.utils import find_project_root
from db.es_client import ElasticSearchClient

os.environ["TOKENIZERS_PARALLELISM"] = "false"

# faiss_db_dir = os.path.join(find_project_root(), "db", "faiss", "storage")
# if not os.path.exists(faiss_db_dir):
#     os.makedirs(faiss_db_dir) 

es_client = ElasticSearchClient()

es_vec_store = ElasticsearchVectorStore()
# asyncio.run(es_vec_store.test_add_doc())

ocr_engine = OCREngine()

# dimensions of sentence-transformers/all-MiniLM-L6-v2
# d = 384
# faiss_index = faiss.IndexFlatL2(d)
# faiss_vector_store = FaissVectorStore(faiss_index=faiss_index)
# storage_context = StorageContext.from_defaults(vector_store=faiss_vector_store)
