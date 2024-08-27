from llama_index.core import Document, VectorStoreIndex

from models.embeddings import embed_model

def make_embs(msg:str="Hello World!"):
    embeddings = embed_model.get_text_embedding("Hello World!")
    return embeddings

if __name__=="__main__":
    print(make_embs())