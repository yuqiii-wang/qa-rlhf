import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.elasticsearch import ElasticsearchStore
from llama_index.core import StorageContext
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import Settings
from utils.utils import find_project_root


embed_model = HuggingFaceEmbedding(model_name=os.path.join(find_project_root(), 'models','sentence-transformers','all-MiniLM-L6-v2'),
                                   parallel_process=False)
