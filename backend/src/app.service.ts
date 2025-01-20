import { Injectable } from '@nestjs/common';
import { MongoService } from './database/mongodb';
import { HealthResponseDto } from './dto/health.dto';

@Injectable()
export class AppService {
  constructor(private readonly mongoService: MongoService) {}
  async checkHealth(): Promise<HealthResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
      timestamp: new Date(),
    };
  }
}
