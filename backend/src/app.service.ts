import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/health.dto';

@Injectable()
export class AppService {
  constructor() {}
  async checkHealth(): Promise<HealthResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
      timestamp: new Date(),
    };
  }
}
