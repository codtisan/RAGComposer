import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import ServerConfig from 'src/config/server.config';

@Injectable()
export class RedisService {
  private client: Redis;
  constructor() {
    this.client = new Redis({
      port: ServerConfig().memoryDb.port,
      host: ServerConfig().memoryDb.host,
      username: '',
    });
  }
  public async set<T>(key: string, value: T): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`Error setting key ${key}: ${error}`);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return !value ? null : JSON.parse(value);
    } catch (error) {
      throw new Error(`Error getting key ${key}: ${error}`);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new Error(`Error deleting key ${key}: ${error}`);
    }
  }
}
