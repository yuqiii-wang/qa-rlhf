from elasticsearch import Elasticsearch, AsyncElasticsearch

ES_QUESTION_SETTINGS = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "question": {"type": "text"},
            "content": {"type": "text"},
            "solution_ids": {"type": "keyword"},
            "is_executed": {"type": "boolean"},
            "sender": {"type": "text"},
            "created_at": {"type": "date", "format": "yyyy-MM-dd HH:mm:ss"}, 
            "tags": {"type": "keyword"},
        }
    }
}

ES_SOLUTION_SETTINGS = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "question": {"type": "text"},
            "solution_summary": {"type": "text"},
            "solution_detail": {"type": "nested",
                "properties" : {
                    "solution_code": {"type": "text"},
                    "image_base64_data": {"type": "text"},  # Base64-encoded image data
                }},
            "question_ids": {"type": "keyword"},
            "solution_run_results": {"type": "nested",
                "properties": {
                    "created_at": {"type": "date", "format": "yyyy-MM-dd HH:mm:ss"}, 
                    "code": {"type": "nested",
                        "properties" : {
                            "code": {"type": "text"},
                            "result": {"type": "text"},
                        }},
                    "image": {"type": "nested",
                        "properties" : {
                            "image_base64_data": {"type": "text"},
                            "json": {"type": "text"},
                        }},
                }},
            "executions": {"type": "integer"},
            "sender": {"type": "text"},
            "created_at": {"type": "date", "format": "yyyy-MM-dd HH:mm:ss"}, 
            "tags": {"type": "keyword"},
        }
    }
}

class ElasticSearchClient:

    def __init__(self, es_url="http://localhost:9200") -> None:
        self.es_url = es_url
        self.es_conn = AsyncElasticsearch(hosts=es_url)
        # Create the index with specified settings and mappings
        if not self.es_conn.indices.exists(index="question"):
            self.es_conn.indices.create(index="question", body=ES_QUESTION_SETTINGS)

    