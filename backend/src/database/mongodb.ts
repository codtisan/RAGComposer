import { Injectable } from '@nestjs/common';
import { Filter, MongoClient, WithId } from 'mongodb';
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

  public async transactionStart(transactionOperations: (() => Promise<void>)[]): Promise<void> {
    const session = this.client.startSession();
    try {
      session.startTransaction();
      transactionOperations.forEach(async (tran) => {
        await tran();
      });
      session.commitTransaction();
    } catch (error) {
      console.log('An error occurred during the transaction:' + error);
      await session.abortTransaction();
    } finally {
      await session.endSession();
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

  public async find<T>(dbName: Databaselist, col: SystemCollection, query: Filter<T>): Promise<WithId<T> | null> {
    try {
      const result = await this.client.db(dbName).collection<T>(col).findOne(query);
      return !result ? null : result;
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }

  public async batchFind<T>(dbName: Databaselist, col: SystemCollection, query: Filter<T>): Promise<WithId<T>[]> {
    try {
      const result = await this.client.db(dbName).collection<T>(col).find(query).toArray();
      return !result ? [] : result;
    } catch (error) {
      throw new Error(`Error batch finding documents: ${error}`);
    }
  }

  public async delete<T>(dbName: Databaselist, col: SystemCollection, query: Filter<T>): Promise<void> {
    try {
      await this.client.db(dbName).collection<T>(col).deleteOne(query);
    } catch (error) {
      throw new Error(`Error deleting documents: ${error}`);
    }
  }

  public async update<T>(
    dbName: Databaselist,
    col: SystemCollection,
    query: Filter<T>,
    updatedDoc: Partial<T>,
  ): Promise<void> {
    try {
      await this.client.db(dbName).collection<T>(col).updateOne(query, { $set: updatedDoc });
    } catch (error) {
      throw new Error(`Error updating documents: ${error}`);
    }
  }
}
