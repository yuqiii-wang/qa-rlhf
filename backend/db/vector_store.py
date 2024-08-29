import asyncio
from time import sleep
from typing import Sequence
from llama_index.core import VectorStoreIndex, Document
from llama_index.vector_stores.elasticsearch import ElasticsearchStore
from llama_index.core import StorageContext, load_index_from_storage
from llama_index.core.schema import TextNode
from llama_index.vector_stores.elasticsearch import AsyncDenseVectorStrategy
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.storage.index_store.elasticsearch import ElasticsearchIndexStore
from llama_index.storage.kvstore.elasticsearch import ElasticsearchKVStore
from elasticsearch import Elasticsearch, AsyncElasticsearch
import os

from models.embeddings import embed_model
from utils.utils import find_project_root

os.environ["TOKENIZERS_PARALLELISM"] = "false"

Settings.embed_model = HuggingFaceEmbedding(
    model_name=os.path.join(find_project_root(), 'models','sentence-transformers','all-MiniLM-L6-v2')
)


class ElasticsearchVectorStore:

    def __init__(self, index_name:str) -> None:
        return
        # define index
        # see Elasticsearch Vector Store for more authentication options
        es_url="http://localhost:9200"
        self.es_client = Elasticsearch(hosts=es_url)
        self.dense_vector_store = ElasticsearchStore(
            es_url=es_url,  # for Elastic Cloud authentication see above
            index_name=index_name,
        )
        kv_store = ElasticsearchKVStore(
            es_client=self.es_client,
            index_name=f"{index_name}-index"
        )
        index_store = ElasticsearchIndexStore(elasticsearch_kvstore=kv_store,
                                collection_index=f"{index_name}-index")
        self.storage_context = StorageContext.from_defaults(
            vector_store=self.dense_vector_store,
            index_store=index_store)
        self.index_name = index_name

        questions = [
                Document(
                    text="Pls confirm this trade 123456789.",
                    metadata={"tags": ["confirm"]},
                ),
                Document(
                    text="Could you help confirm this trade 123456789.",
                    metadata={"tags": ["confirm"]},
                ),
                Document(
                    text="This trade 123456789 not yet confirm, could you check.",
                    metadata={"tags": ["confirm"]},
                ),
                Document(
                    text="Pls replay this trade 123456789.",
                    metadata={"tags": ["replay"]},
                ),
                Document(
                    text="Still not seen trade flown in, pls replay this trade 123456789.",
                    metadata={"tags": ["replay"]},
                ),
            ]
        self.index = VectorStoreIndex.from_documents(
            questions, storage_context=self.storage_context,
            embed_model=embed_model, show_progress=True
        )
        print("hhh")

    def add_doc_index(self, docs:list[Document]):
        # new_nodes = [self.index.doc_to_node(doc) for doc in docs]
        parser = SentenceSplitter()
        nodes = parser.get_nodes_from_documents(docs)
        self.index.insert(nodes)

    def search( self,
        vector_store: ElasticsearchStore, nodes: list[TextNode], query: str
    ):
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        index = VectorStoreIndex(nodes, storage_context=storage_context)

        print(">>> Documents:")
        retriever = index.as_retriever()
        results = retriever.retrieve(query)

        print("\n>>> Answer:")
        query_engine = index.as_query_engine()
        response = query_engine.query(query)
        print(response)