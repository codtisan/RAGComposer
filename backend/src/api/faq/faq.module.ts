import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongoService } from 'src/database/mongodb';
import { RedisService } from 'src/database/redis';

@Module({
  controllers: [FaqController],
  providers: [FaqService, MongoService, RedisService],
})
export class FaqModule {}
