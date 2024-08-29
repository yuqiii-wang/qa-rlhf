from db.vector_store import ElasticsearchVectorStore
from process.process_ocr import OCREngine

ocr_engine = OCREngine()

es_vec_store = ElasticsearchVectorStore(index_name="questions")
