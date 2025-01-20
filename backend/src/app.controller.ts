import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponseDto } from './dto/health.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(): Promise<HealthResponseDto> {
    return this.appService.checkHealth();
  }
}
