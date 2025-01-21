import { Injectable } from '@nestjs/common';

@Injectable()
export class ElasticsearchService {
  constructor() {}
  public async insertDoc(): Promise<void> {}
  public async batchInsertDoc(): Promise<void> {}
  public async searchDocs(): Promise<void> {}
  public async deleteDoc(): Promise<void> {}
}
