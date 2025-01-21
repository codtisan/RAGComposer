import { Injectable } from '@nestjs/common';
import { MongoClient, WithId } from 'mongodb';
import { Databaselist, SystemCollection } from 'src/config/db.config';
import ServerConfig from 'src/config/server.config';

@Injectable()
export class MongoService {
  client: MongoClient;
  constructor() {
    this.client = new MongoClient(ServerConfig().db.url);
  }
  public async connectAndSetup(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      throw new Error(`Error connecting to MongoDB: ${error}`);
    }
  }

  public async insert<T>(dbName: Databaselist, col: SystemCollection, doc: T): Promise<void> {
    try {
      await this.client.db(dbName).collection(col).insertOne(doc);
    } catch (error) {
      throw new Error(`Error inserting document: ${error}`);
    }
  }

  public async batchInsert<T>(dbName: Databaselist, col: SystemCollection, docs: T[]): Promise<void> {
    try {
      await this.client.db(dbName).collection(col).insertMany(docs);
    } catch (error) {
      throw new Error(`Error batch inserting documents: ${error}`);
    }
  }

  public async find<T>(dbName: Databaselist, col: SystemCollection, query: any): Promise<WithId<T> | null> {
    try {
      const result = await this.client.db(dbName).collection<T>(col).findOne(query);
      return !result ? null : result;
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }
}
