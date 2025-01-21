import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ESIndexList } from 'src/config/db.config';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async pingHealth() {
    try {
      await this.elasticsearchService.ping();
    } catch (error) {
      console.log(error);
    }
  }
  public async insertDoc<T>(indexName: ESIndexList, doc: T): Promise<void> {
    await this.elasticsearchService.index({
      index: indexName,
      body: doc,
    });
  }
  public async searchDocs(indexName: ESIndexList, query: any): Promise<void> {
    await this.elasticsearchService.search({
      index: indexName,
      body: {
        query: {
          multi_match: {
            query: query,
          },
        },
      },
    });
  }
}
