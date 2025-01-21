import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongoService } from 'src/database/mongodb';

@Module({
  controllers: [FaqController],
  providers: [FaqService, MongoService],
})
export class FaqModule {}
