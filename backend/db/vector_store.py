import asyncio
from time import sleep
from typing import Sequence
from llama_index.core import VectorStoreIndex, Document
from llama_index.vector_stores.elasticsearch import ElasticsearchStore
from llama_index.core import StorageContext, load_index_from_storage
from llama_index.core.schema import TextNode
from llama_index.vector_stores.elasticsearch import AsyncDenseVectorStrategy
from llama_index.core.node_parser import SentenceSplitter
from llama_index.storage.index_store.elasticsearch import ElasticsearchIndexStore
from llama_index.storage.kvstore.elasticsearch import ElasticsearchKVStore
import os

from models.custom_embeds import CustomHuggingFaceEmbeddings
from db.es_client import ElasticSearchClient

class ElasticsearchVectorStore:

    def __init__(self, index_name:str="default-health-check") -> None:
        # define index
        self.embeds = CustomHuggingFaceEmbeddings()
        self.es_client = ElasticSearchClient()
        dense_vector_store = ElasticsearchStore(
            es_url=self.es_client.es_url,  # for Elastic Cloud authentication see above
            index_name=f"{index_name}",
        )
        kv_store = ElasticsearchKVStore(
            es_client=self.es_client.es_conn,
            index_name=f"{index_name}"
        )
        index_store = ElasticsearchIndexStore(elasticsearch_kvstore=kv_store,
                                collection_index=f"{index_name}",
                                collection_suffix="-index")
        self.storage_context = StorageContext.from_defaults(
            vector_store=dense_vector_store,
            index_store=index_store)
        self.index_name = index_name

        sleep(10) # wait for the main proc properly started, should be improved
        self.index = VectorStoreIndex.from_documents(
            [Document(text="Health check test")],
            storage_context=self.storage_context,
            embed_model=self.embeds,
            show_progress=True
        )

    async def test_add_doc(self):

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
            questions,
            storage_context=self.storage_context,
            embed_model=self.embeds,
            show_progress=True
        )
        self.index.storage_context.persist()


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