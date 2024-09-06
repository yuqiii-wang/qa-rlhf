import asyncio
from time import sleep
from typing import Sequence
from llama_index.core import VectorStoreIndex, SimpleKeywordTableIndex, Document
from llama_index.vector_stores.elasticsearch import ElasticsearchStore
from llama_index.core import StorageContext, load_index_from_storage
from llama_index.core.schema import TextNode
from llama_index.vector_stores.elasticsearch import AsyncDenseVectorStrategy
from llama_index.core.node_parser import SentenceSplitter
from llama_index.storage.index_store.elasticsearch import ElasticsearchIndexStore
from llama_index.storage.kvstore.elasticsearch import ElasticsearchKVStore
from datetime import datetime
import os

from models.custom_embeds import CustomHuggingFaceEmbeddings
from db.es_client import ElasticSearchClient
from db.retriever import CustomRetriever

class ElasticsearchVectorStore:

    def __init__(self, index_name:str="default-health-check") -> None:
        # define vec_index
        self.embeds = CustomHuggingFaceEmbeddings()
        self.es_client = ElasticSearchClient()
        dense_vector_store = ElasticsearchStore(
            es_url=self.es_client.es_url,
            index_name=f"{index_name}-vectorstore",
        )
        kv_store = ElasticsearchKVStore(
            es_client=self.es_client.es_conn,
            index_name=f"{index_name}"
        )
        index_store = ElasticsearchIndexStore(elasticsearch_kvstore=kv_store,
                                collection_index=f"{index_name}-indexstore")
        self.vec_storage_context = StorageContext.from_defaults(
            vector_store=dense_vector_store,
            index_store=index_store)
        self.index_name = index_name
        self.parser = SentenceSplitter()

        async def test_conn():
            doc = Document(text="Health check test")
            doc.metadata["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            index_exists = await self.es_client.es_conn.indices.exists(index=f"{index_name}-indexstore")
            sleep(5) # wait for the main proc properly started, should be improved
            if index_exists:
                self.vec_index = load_index_from_storage(storage_context=self.vec_storage_context,
                                                     embed_model=self.embeds)
                self.vec_index.insert(doc)
            else:
                self.vec_index = VectorStoreIndex.from_documents(
                    [doc],
                    storage_context=self.vec_storage_context,
                    embed_model=self.embeds,
                    show_progress=True
                )
        asyncio.run(test_conn())
        self.retrieval_engine = CustomRetriever(self.vec_index)


    def search( self,
        query:str
    ):
        results = self.retrieval_engine.retrieve(query)
        return results

if __name__=="__main__":
    es_vec_store = ElasticsearchVectorStore()
    # results = es_vec_store.search("check.")
    # print(results)