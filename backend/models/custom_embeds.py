import multiprocessing
from typing import Any, List, Union
import os, subprocess
from multiprocessing import Pool, Array, Manager
import logging
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from flask import json
from llama_index.core.embeddings import BaseEmbedding
import requests
from utils.utils import find_project_root


embed_model = HuggingFaceEmbedding(
                    model_name=os.path.join(
                                    find_project_root(), 
                                    "models",
                                    'sentence-transformers',
                                    'all-MiniLM-L6-v2'),
                    parallel_process=False)

def get_emb_wrapper(texts:Union[List[str], str], shared_list):
    if isinstance(texts, List):
        for idx, text in enumerate(texts):
            shared_list.append(embed_model.get_text_embedding(text))
    else:
        text = texts
        shared_list = embed_model.get_text_embedding(text)

class CustomHuggingFaceEmbeddings(BaseEmbedding):
    def __init__(
        self,
        **kwargs: Any,
    ) -> None:
        super().__init__(**kwargs)

    @classmethod
    def class_name(cls) -> str:
        return 'all-MiniLM-L6-v2'

    async def _aget_query_embedding(self, query: str) -> List[float]:
        return self._get_query_embedding(query)

    async def _aget_text_embedding(self, text: str) -> List[float]:
        return self._get_text_embedding(text)

    def _get_query_embedding(self, query: str) -> List[float]:
        with Manager() as manager:
            shared_list = manager.list()
            proc = multiprocessing.Process(target=get_emb_wrapper,
                                        args=(query, shared_list))
            proc.start()
            proc.join()
            emb_list = list(shared_list)
            return emb_list

    def _get_text_embedding(self, text: str) -> List[float]:
        with Manager() as manager:
            shared_list = manager.list()
            proc = multiprocessing.Process(target=get_emb_wrapper,
                                        args=(text, shared_list))
            proc.start()
            proc.join()
            emb_list = list(shared_list)
            return emb_list

    def _get_text_embeddings(self, texts: List[str]) -> List[List[float]]:
        with Manager() as manager:
            shared_list = manager.list()
            proc = multiprocessing.Process(target=get_emb_wrapper,
                                        args=(texts, shared_list))
            proc.start()
            proc.join()
            emb_list = list(shared_list)
            return emb_list