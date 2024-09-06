from time import sleep
from llama_index.core import QueryBundle, VectorStoreIndex
from llama_index.core.schema import NodeWithScore
from llama_index.core.retrievers import (
    BaseRetriever,
    VectorIndexRetriever,
    KeywordTableSimpleRetriever,
)
from models.custom_embeds import CustomHuggingFaceEmbeddings

from typing import List
class CustomRetriever(BaseRetriever):
    """Custom retriever that performs both semantic search and hybrid search."""

    def __init__(
        self,
        vector_store: VectorStoreIndex,
        # keyword_retriever: KeywordTableSimpleRetriever,
        mode: str = "AND",
    ) -> None:
        """Init params."""

        vector_retriever = VectorIndexRetriever(index=vector_store, similarity_top_k=2)

        sleep(12)
        self.embeds = CustomHuggingFaceEmbeddings()

        self._vector_retriever = vector_retriever
        # self._keyword_retriever = keyword_retriever
        if mode not in ("AND", "OR"):
            raise ValueError("Invalid mode.")
        self._mode = mode
        super().__init__()

    def _retrieve(self, query_bundle: QueryBundle) -> List[NodeWithScore]:
        """Retrieve nodes given query."""

        query_bundle.embedding = self.embeds.get_query_embedding(query_bundle.query_str)

        vector_nodes = self._vector_retriever.retrieve(query_bundle)
        # keyword_nodes = self._keyword_retriever.retrieve(query_bundle)

        vector_ids = {n.node.node_id for n in vector_nodes}
        # keyword_ids = {n.node.node_id for n in keyword_nodes}

        combined_dict = {n.node.node_id: n for n in vector_nodes}
        # combined_dict.update({n.node.node_id: n for n in keyword_nodes})

        # if self._mode == "AND":
        #     retrieve_ids = vector_ids.intersection(keyword_ids)
        # else:
        #     retrieve_ids = vector_ids.union(keyword_ids)
        retrieve_ids = vector_ids.union({})

        retrieve_nodes = [combined_dict[rid] for rid in retrieve_ids]
        return retrieve_nodes